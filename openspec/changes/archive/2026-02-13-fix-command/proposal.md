# Why

`bun i -g` installed scripts still contain `#!/usr/bin/env node` shebang.
This command fixes `node` to `bun` in the shebang line.

## What Changes

- Add a new `fix` sub-command to the CLI
- The command processes scripts in a target directory
- Replaces `node` with `bun` in shebang lines (modifies ALL files with `#!/usr/bin/env node` shebang)
- Preserves file permissions and other file attributes

## Capabilities

### New Capabilities
- `fix-command`: CLI sub-command that fixes shebang lines in globally installed Bun scripts, replacing `node` with `bun` in the shebang line

### Modified Capabilities
- None

## Impact

- **CLI**: Adds new `fix` sub-command to the main CLI interface
- **Dependencies**: No new dependencies required (uses existing file system utilities)
- **User Experience**: Simplifies post-installation fix for globally installed Bun packages
