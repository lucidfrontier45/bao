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
```

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
