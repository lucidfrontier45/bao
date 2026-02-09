#!/usr/bin/env bun
import { fixShebang } from "../src/index.ts";

const args = process.argv.slice(2);

if (args[0] === "fix") {
	const recursiveFlag = args.includes("-r") || args.includes("--recursive");
	const targetDir = args.find(
		(arg) => !arg.startsWith("-") && arg !== "fix",
	);

	try {
		await fixShebang(targetDir, { recursive: recursiveFlag });
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Error: ${error.message}`);
			process.exit(1);
		}
		throw error;
	}
}
