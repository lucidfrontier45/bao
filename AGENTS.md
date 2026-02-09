# 📄 AGENTS.md

This project is optimized for high-performance development using **Bun**, **Biome**, and **typescript-go (tsgo)**. 
All agents and contributors must follow the command structure and coding standards defined below.

## ⚙️ Technical Stack & Tooling

- **Runtime**: [Bun](https://bun.sh/), all scripts must be executed using `bun run <script>`.
- **Lintier and Type Checker**: [Biome](https://biomejs.dev/) and [typescript-go (tsgo)](https://github.com/tsgo/tsgo), invoked by `bun check`.
- **Formatter**: [Biome](https://biomejs.dev/), invoked by `bun format`.
- **Testing**: Built-in Bun test runner, invoked by `bun test`.

## 📂 Architecture Responsibilities

- **Source Code**: All library source files are located in the root directory or `src/` folder.
- **Tests**: All test files are located in the `tests/` folder or alongside source files with `.test.ts` suffix.
- **App Entry Point**: The main application entry point scripts are located in the `bin/` folder.

## 🤖 Instructions for AI Agents

1. **Before completion**: Always run `bun check` to ensure the generated code adheres to project rules.
2. **Type Safety**: Prioritize fixing `tsgo` errors in source logic; avoid using `@ts-ignore`.
3. **Consistency**: Do not manually format code in a way that conflicts with `biome.json`. Rely on `bun fmt`.

## General Typescript Guidelines

- Use strict typing and avoid `any` type.
- Prefer `const` over `let` where variables are not reassigned.
- Use modern ES6+ features and syntax.
- Write modular and reusable code.
- Follow consistent naming conventions (camelCase for variables/functions, PascalCase for classes/interfaces).
