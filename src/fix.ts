import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, normalize } from "node:path";

export interface FixOptions {
	recursive?: boolean;
}

const NODE_SHEBANG = "#!/usr/bin/env node";
const BUN_SHEBANG = "#!/usr/bin/env bun";

async function* discoverFiles(
	dir: string,
	options?: FixOptions,
): AsyncGenerator<string> {
	const entries = await readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = join(dir, entry.name);

		if (entry.isFile()) {
			yield fullPath;
		} else if (entry.isDirectory() && options?.recursive) {
			yield* discoverFiles(fullPath, options);
		}
	}
}

async function fixFileShebang(filePath: string): Promise<boolean> {
	const file = Bun.file(filePath);
	const content = await file.text();
	const lines = content.split("\n");

	if (lines[0] !== NODE_SHEBANG) {
		return false;
	}

	lines[0] = BUN_SHEBANG;
	await Bun.write(filePath, lines.join("\n"));
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
		: normalize(join(process.env["HOME"] || "", ".bun", "bin"));

	if (!existsSync(dir)) {
		throw new Error(`Directory not found: ${dir}`);
	}

	for await (const filePath of discoverFiles(dir, options)) {
		await fixFileShebang(filePath);
	}
}
