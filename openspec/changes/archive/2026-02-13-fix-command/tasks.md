# Implementation Tasks

## 1. Project Setup

- [x] 1.1 Create `src/fix.ts` module for core shebang replacement logic
- [x] 1.2 Update `src/index.ts` to re-export public API from `fix.ts`

## 2. Core Logic Implementation

- [x] 2.1 Implement `FixOptions` type with `recursive` boolean flag
- [x] 2.2 Implement `fixShebang(targetDir: string, options?: FixOptions): Promise<void>` function
- [x] 2.3 Implement file discovery logic (recursive vs. single directory)
- [x] 2.4 Implement shebang detection (exact match for `#!/usr/bin/env node`)
- [x] 2.5 Implement in-place file modification preserving permissions
- [x] 2.6 Add default directory handling (`~/.bun/bin` when target is undefined)

## 3. Error Handling

- [x] 3.1 Add directory existence validation
- [x] 3.2 Add error handling for file read/write failures
- [x] 3.3 Implement graceful skipping of files without matching shebang
- [x] 3.4 Add user-friendly error messages for missing directories

## 4. CLI Integration

- [x] 4.1 Update `bin/main.ts` to parse `fix` sub-command
- [x] 4.2 Add `-r` and `--recursive` flag parsing
- [x] 4.3 Add positional argument parsing for target directory
- [x] 4.4 Import functions only from `src/index.ts` (not directly from `src/fix.ts`)
- [x] 4.5 Connect CLI arguments to core `fixShebang()` function

## 5. Testing

- [x] 5.1 Create test fixtures directory with sample script files
- [x] 5.2 Test default directory behavior (`~/.bun/bin`)
- [x] 5.3 Test custom directory path handling
- [x] 5.4 Test recursive flag behavior
- [x] 5.5 Test shebang replacement accuracy
- [x] 5.6 Test file permissions preservation
- [x] 5.7 Test error handling for non-existent directories
- [x] 5.8 Test files without matching shebang are skipped

## 6. Documentation

- [x] 6.1 Update README with `fix` sub-command usage
- [x] 6.2 Add command examples to documentation
- [x] 6.3 Document public API in code comments
