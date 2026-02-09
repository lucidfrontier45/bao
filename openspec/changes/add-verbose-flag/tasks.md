## 1. Update Core Logic

- [x] 1.1 Add `verbose?: boolean` property to `FixOptions` interface in `src/fix.ts`
- [x] 1.2 Update `fixFileShebang` function to accept verbose parameter and log file operations
- [x] 1.3 Update `discoverFiles` function to accept and pass verbose parameter
- [x] 1.4 Update `fixShebang` function to accept verbose parameter in options

## 2. Update CLI

- [x] 2.1 Parse `-v` and `--verbose` flags in `bin/main.ts`
- [x] 2.2 Pass verbose flag to `fixShebang` function call

## 3. Update Exports

- [x] 3.1 Verify updated `FixOptions` type is exported from `src/index.ts`

## 4. Testing

- [x] 4.1 Test verbose mode shows opening and skipped files
- [x] 4.2 Test modified files are ALWAYS logged (even without verbose)
- [x] 4.3 Test verbose mode with recursive flag combined
- [x] 4.4 Test with custom directory path
- [x] 4.5 Run `bun check` to ensure type checking passes
- [x] 4.6 Run `bun test` to ensure existing tests pass
