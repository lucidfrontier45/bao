import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { mkdirSync, rmSync, writeFileSync, readFileSync,  mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { fixShebang } from "../src/index.ts";

describe("fixShebang", () => {
	let testDir: string;

	beforeEach(() => {
		testDir = mkdtempSync(join(tmpdir(), "bao-test-"));
	});

	afterEach(() => {
		rmSync(testDir, { recursive: true, force: true });
	});

	test("should replace node shebang with bun shebang", async () => {
		const testFile = join(testDir, "test.js");
		writeFileSync(testFile, "#!/usr/bin/env node\nconsole.log('test');\n", {
			mode: 0o755,
		});

		await fixShebang(testDir);

		const content = readFileSync(testFile, "utf-8");
		expect(content.startsWith("#!/usr/bin/env bun\n")).toBe(true);
	});

	test("should preserve file permissions", async () => {
		const testFile = join(testDir, "test.js");
		writeFileSync(testFile, "#!/usr/bin/env node\nconsole.log('test');\n", {
			mode: 0o755,
		});

		const statBefore = await Bun.file(testFile).stat();
		const modeBefore = statBefore.mode;

		await fixShebang(testDir);

		const statAfter = await Bun.file(testFile).stat();
		const modeAfter = statAfter.mode;

		expect(modeBefore).toBe(modeAfter);
	});

	test("should skip files without node shebang", async () => {
		const testFile = join(testDir, "test.js");
		const originalContent = "#!/usr/bin/env bash\necho 'test';\n";
		writeFileSync(testFile, originalContent, { mode: 0o755 });

		await fixShebang(testDir);

		const content = readFileSync(testFile, "utf-8");
		expect(content).toBe(originalContent);
	});

	test("should skip files without shebang", async () => {
		const testFile = join(testDir, "test.js");
		const originalContent = "console.log('test');\n";
		writeFileSync(testFile, originalContent);

		await fixShebang(testDir);

		const content = readFileSync(testFile, "utf-8");
		expect(content).toBe(originalContent);
	});

	test("should throw error for non-existent directory", async () => {
		await expect(fixShebang("/nonexistent/path")).rejects.toThrow(
			"Directory not found",
		);
	});

	test("should process files recursively when recursive flag is true", async () => {
		const subDir = join(testDir, "subdir");
		mkdirSync(subDir);
		const testFile = join(subDir, "test.js");
		writeFileSync(testFile, "#!/usr/bin/env node\nconsole.log('test');\n", {
			mode: 0o755,
		});

		await fixShebang(testDir, { recursive: true });

		const content = readFileSync(testFile, "utf-8");
		expect(content.startsWith("#!/usr/bin/env bun\n")).toBe(true);
	});

	test("should not process files recursively when recursive flag is false", async () => {
		const subDir = join(testDir, "subdir");
		mkdirSync(subDir);
		const testFile = join(subDir, "test.js");
		const originalContent = "#!/usr/bin/env node\nconsole.log('test');\n";
		writeFileSync(testFile, originalContent, { mode: 0o755 });

		await fixShebang(testDir, { recursive: false });

		const content = readFileSync(testFile, "utf-8");
		expect(content).toBe(originalContent);
	});
});
