## Why

When running `bun install`, it creates symbolic links pointing to the actual installed package scripts (e.g., in `node_modules/.bin/`). The current `fix` command uses `readdir` with `isFile()` check, which returns `false` for symbolic links. This causes the system to skip these script links as modification targets, leaving node shebangs unfixed in the actual executable files.

## What Changes

- Modify the file discovery logic to detect and follow symbolic links
- Add symlink handling to ensure linked scripts are processed for shebang fixes
- Ensure the fix command can handle both regular files and symlinked files

## Capabilities

### New Capabilities
- **follow-symlink**: Detect and follow symbolic links during file discovery, enabling the fix command to process symlinked scripts in any target directory

### Modified Capabilities
- None - this is a new capability

## Impact

- Code: `src/fix.ts` - modify `discoverFiles` function to handle symlinks
- The fix command will now properly process symlinked scripts in any specified target directory
