## 1. Modify file discovery to detect and follow symlinks

- [x] 1.1 Import `stat` from `node:fs/promises` for symlink target verification
- [x] 1.2 Update `discoverFiles` function to check `entry.isSymbolicLink()`
- [x] 1.3 Add logic to verify symlink target exists and is a file using `stat`
- [x] 1.4 Add logic to resolve symlink target path
- [x] 1.5 Default to following all valid symlinks (no option needed)

## 2. Add `--skip-outside` CLI option

- [x] 2.1 Add `skipOutside?: boolean` option to `FixOptions` interface in `src/fix.ts`
- [x] 2.2 Add `--skip-outside` flag to the CLI in `bin/`
- [x] 2.3 Implement logic to skip symlinks pointing outside target directory when flag is set

## 3. Track processed files to avoid duplicates

- [x] 3.1 Add Set to track processed real paths and avoid processing same file twice
- [x] 3.2 Use `realpath` to resolve symlinks and get canonical path

## 4. Test implementation

- [x] 4.1 Test discovering symlinks by default
- [x] 4.2 Test skipping broken symlinks
- [x] 4.3 Test modifying symlink target outside directory by default
- [x] 4.4 Test `--skip-outside` flag skips outside symlinks
- [x] 4.5 Test shebang fix applied to symlink target file
