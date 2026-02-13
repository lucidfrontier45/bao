#!/usr/bin/env bun
import { Cli, notFoundPlugin } from "clerc";
import { version } from "../package.json";
import { fixShebang } from "../src/index.ts";

Cli()
	.name("bao")
	.scriptName("bao")
	.description("Fix shebang lines in globally installed Bun scripts")
	.version(version)
	.use(notFoundPlugin())
	.command("fix", "Fix shebang lines from node to bun", {
		flags: {
			recursive: {
				type: Boolean,
				short: "r",
				description: "Process files recursively in subdirectories",
			},
			verbose: {
				type: Boolean,
				short: "v",
				description: "Enable verbose output",
			},
			skipOutside: {
				type: Boolean,
				description: "Skip symlinks that point outside the target directory",
			},
		},
		parameters: ["[directory]"],
	})
	.on("fix", async (ctx) => {
		try {
			await fixShebang(ctx.parameters.directory, {
				recursive: ctx.flags.recursive,
				verbose: ctx.flags.verbose,
				skipOutside: ctx.flags.skipOutside,
			});
		} catch (error) {
			if (error instanceof Error) {
				console.error(`Error: ${error.message}`);
				process.exit(1);
			}
			throw error;
		}
	})
	.parse();
