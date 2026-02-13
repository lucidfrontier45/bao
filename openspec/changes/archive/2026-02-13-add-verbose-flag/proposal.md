## Why

Users need visibility into what the fix command is doing. Currently, the command runs silently with no feedback about which files are being processed or what changes are being made.

## What Changes

- Add `-v` and `--verbose` flags to the `bao fix` command
- When verbose mode is enabled, log:
  - When each file is opened
  - Whether the file was modified or skipped
  - The specific change made (shebang replacement)
- Default behavior (no verbose flag) remains silent

## Capabilities

### New Capabilities
- `verbose-logging`: Adds verbose output capability to CLI commands, showing detailed logs of file operations and modifications

### Modified Capabilities
- `fix-command`: Updates requirements to support optional verbose logging flag

## Impact

- `bin/main.ts`: Add verbose flag parsing and pass to fixShebang function
- `src/fix.ts`: Add verbose parameter to FixOptions and log statements throughout
- `src/index.ts`: Export updated FixOptions type
- No new dependencies required
