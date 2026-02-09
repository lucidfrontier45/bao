# bao

A small tool to fix shebang of scripts added by `bun add -g`.

## Usage

### Fix shebang in globally installed scripts

When you install packages globally with Bun (`bun i -g`), the scripts may contain `#!/usr/bin/env node` shebang. Use `bao fix` to replace them with `#!/usr/bin/env bun`:

```bash
# Fix scripts in default directory (~/.bun/bin)
bao fix

# Fix scripts in a custom directory
bao fix /path/to/scripts

# Fix scripts recursively (including subdirectories)
bao fix -r /path/to/scripts
bao fix --recursive /path/to/scripts

# Fix scripts with verbose output (shows file operations)
bao fix -v
bao fix --verbose

# Combine verbose with recursive
bao fix -v -r /path/to/scripts
```

**Verbose Mode**: When using `-v` or `--verbose`, the tool shows:
- "Opening: <file>" - each file being examined
- "Skipped: <file> (reason)" - files that weren't modified
- "Modified: <file>" - files that were changed (always shown, even without verbose)
- "Changed shebang from #!/usr/bin/env node to #!/usr/bin/env bun" - the specific change made

## Environment Setup

- Runtime: [Bun](https://bun.sh/)
- Type Checker: [tsgo](https://github.com/microsoft/typescript-go)
- Formatter/Linter: [Biomae](https://biomejs.dev/)
- No external testing framework (using built-in Bun test runner)

## Development

- Install dependencies:
  ```bash
  bun install
  ```

- Run the app
  ```bash
  bun run bin/main.ts
  ```

- Run tests
  ```bash
  bun test
  ```   

- Lint/Type check code
  ```bash
  bun check
  ```

- Format code
  ```bash
  bun format
  ```
