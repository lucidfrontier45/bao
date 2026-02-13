import { type Dirent, existsSync } from "node:fs";
import { readdir, realpath, stat } from "node:fs/promises";
import { join, normalize, relative } from "node:path";

export interface FixOptions {
	recursive?: boolean;
	verbose?: boolean;
	skipOutside?: boolean;
}

const NODE_SHEBANG = "#!/usr/bin/env node";
const BUN_SHEBANG = "#!/usr/bin/env bun";

async function resolveSymlink(
	entry: Dirent,
	dir: string,
	options?: FixOptions,
): Promise<string | null> {
	const fullPath = join(dir, entry.name);

	let targetStats: Awaited<ReturnType<typeof stat>> | undefined;
	try {
		targetStats = await stat(fullPath);
	} catch {
		return null;
	}
	if (!targetStats.isFile()) {
		return null;
	}

	const targetPath = await realpath(fullPath);

	if (options?.skipOutside) {
		const relPath = relative(dir, targetPath);
		if (relPath.startsWith("..")) {
			return null;
		}
	}

	return targetPath;
}

async function* discoverFiles(
	dir: string,
	options?: FixOptions,
): AsyncGenerator<string> {
	const entries = await readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = join(dir, entry.name);

		if (entry.isFile()) {
			yield fullPath;
		} else if (entry.isSymbolicLink()) {
			const targetPath = await resolveSymlink(entry, dir, options);
			if (targetPath) {
				yield targetPath;
			}
		} else if (entry.isDirectory() && options?.recursive) {
			yield* discoverFiles(fullPath, options);
		}
	}
}

async function fixFileShebang(
	filePath: string,
	verbose?: boolean,
): Promise<boolean> {
	const file = Bun.file(filePath);
	const content = await file.text();
	const lines = content.split("\n");

	if (verbose) {
		console.log(`Opening: ${filePath}`);
	}

	if (lines[0] !== NODE_SHEBANG) {
		if (verbose) {
			console.log(`Skipped: ${filePath} (no matching shebang)`);
		}
		return false;
	}

	lines[0] = BUN_SHEBANG;
	await Bun.write(filePath, lines.join("\n"));

	console.log(`Modified: ${filePath}`);
	console.log(`Changed shebang from ${NODE_SHEBANG} to ${BUN_SHEBANG}`);

	return true;
}

/**
 * Fixes shebang lines in script files by replacing `#!/usr/bin/env node` with `#!/usr/bin/env bun`.
 *
 * @param targetDir - The target directory to process. If undefined, defaults to `~/.bun/bin`.
 * @param options - Optional configuration for the fix operation.
 * @param options.recursive - If true, processes files recursively in subdirectories.
 * @throws {Error} If the target directory does not exist.
 *
 * @example
 * // Fix scripts in default directory (~/.bun/bin)
 * await fixShebang();
 *
 * @example
 * // Fix scripts in custom directory
 * await fixShebang("/path/to/scripts");
 *
 * @example
 * // Fix scripts recursively
 * await fixShebang("/path/to/scripts", { recursive: true });
 */
export async function fixShebang(
	targetDir?: string,
	options?: FixOptions,
): Promise<void> {
	const dir = targetDir
		? normalize(targetDir)
		: // biome-ignore lint/complexity/useLiteralKeys: <TypeScript cannot infer properly here>
			normalize(join(Bun.env["HOME"] || "", ".bun", "bin"));

	if (!existsSync(dir)) {
		throw new Error(`Directory not found: ${dir}`);
	}

	const processedPaths = new Set<string>();

	for await (const filePath of discoverFiles(dir, options)) {
		const realPath = await realpath(filePath);

		if (processedPaths.has(realPath)) {
			continue;
		}
		processedPaths.add(realPath);

		await fixFileShebang(filePath, options?.verbose);
	}
}
