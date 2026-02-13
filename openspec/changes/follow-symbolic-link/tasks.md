## 1. Modify file discovery to detect and follow symlinks

- [ ] 1.1 Import `lstat` from `node:fs/promises` for symlink detection
- [ ] 1.2 Update `discoverFiles` function to check `entry.isSymbolicLink()`
- [ ] 1.3 Add logic to verify symlink target exists and is a file using `lstat`
- [ ] 1.4 Add logic to resolve symlink target path
- [ ] 1.5 Default to following all valid symlinks (no option needed)

## 2. Add `--skip-outside` CLI option

- [ ] 2.1 Add `skipOutside?: boolean` option to `FixOptions` interface in `src/fix.ts`
- [ ] 2.2 Add `--skip-outside` flag to the CLI in `bin/`
- [ ] 2.3 Implement logic to skip symlinks pointing outside target directory when flag is set

## 3. Track processed files to avoid duplicates

- [ ] 3.1 Add Set to track processed real paths and avoid processing same file twice
- [ ] 3.2 Use `realpath` to resolve symlinks and get canonical path

## 4. Test implementation

- [ ] 4.1 Test discovering symlinks by default
- [ ] 4.2 Test skipping broken symlinks
- [ ] 4.3 Test modifying symlink target outside directory by default
- [ ] 4.4 Test `--skip-outside` flag skips outside symlinks
- [ ] 4.5 Test shebang fix applied to symlink target file
