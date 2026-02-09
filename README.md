# bao

A small tool to fix shebang of scripts added by `bun add -g`.

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
