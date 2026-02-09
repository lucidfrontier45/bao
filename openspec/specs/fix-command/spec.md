# Spec: Fix Command

## Purpose

Provides functionality to fix shebang lines in script files, replacing `#!/usr/bin/env node` with `#!/usr/bin/env bun` to ensure scripts use the correct Bun runtime.

## Requirements

### Requirement: Fix shebang lines with bun subcommand
The system SHALL provide a `fix` sub-command that replaces `#!/usr/bin/env node` with `#!/usr/bin/env bun` in script files within a specified directory.

#### Scenario: Fix scripts with verbose output
- **WHEN** user runs `bao fix -v` or `bao fix --verbose`
- **THEN** system processes scripts in `~/.bun/bin` directory
- **AND** system replaces `#!/usr/bin/env node` with `#!/usr/bin/env bun`
- **AND** system logs each file operation (opened, modified, or skipped)
- **AND** system preserves file permissions

#### Scenario: Fix scripts in default directory
- **WHEN** user runs `bao fix` without arguments
- **THEN** system processes scripts in `~/.bun/bin` directory
- **AND** system replaces `#!/usr/bin/env node` with `#!/usr/bin/env bun`
- **AND** system preserves file permissions

#### Scenario: Fix scripts in custom directory
- **WHEN** user runs `bao fix /path/to/scripts`
- **THEN** system processes scripts in `/path/to/scripts` directory
- **AND** system replaces `#!/usr/bin/env node` with `#!/usr/bin/env bun`

#### Scenario: Fix scripts recursively
- **WHEN** user runs `bao fix -r /path/to/scripts` or `bao fix --recursive /path/to/scripts`
- **THEN** system processes scripts in `/path/to/scripts` and all subdirectories
- **AND** system replaces `#!/usr/bin/env node` with `#!/usr/bin/env bun`

#### Scenario: Fix scripts recursively with verbose
- **WHEN** user runs `bao fix -v -r /path/to/scripts` or `bao fix --verbose --recursive /path/to/scripts`
- **THEN** system processes scripts in `/path/to/scripts` and all subdirectories
- **AND** system replaces `#!/usr/bin/env node` with `#!/usr/bin/env bun`
- **AND** system logs each file operation

### Requirement: Preserve file attributes
The system SHALL preserve all file attributes (permissions, ownership, timestamps) when modifying script files.

#### Scenario: File permissions unchanged
- **WHEN** system modifies a script file
- **THEN** file execute permission remains unchanged
- **AND** file ownership remains unchanged
- **AND** file modification timestamp is updated
- **AND** other file attributes remain unchanged

### Requirement: Target files with node shebang
The system SHALL modify ALL files that contain the exact shebang line `#!/usr/bin/env node`, regardless of file extension.

#### Scenario: Only modify files with matching shebang
- **WHEN** system processes a directory
- **THEN** only files with first line exactly `#!/usr/bin/env node` are modified
- **AND** files without this shebang are skipped
- **AND** files with different shebang lines are skipped

#### Scenario: Handle files without shebang
- **WHEN** system encounters a file without a shebang line
- **THEN** file is skipped without modification
- **AND** no error is raised

#### Scenario: Process any file type with matching shebang
- **WHEN** system encounters any file (any extension) with shebang `#!/usr/bin/env node`
- **THEN** file is processed and shebang is replaced

### Requirement: Handle missing target directory
The system SHALL validate that the target directory exists before processing.

#### Scenario: Default directory exists
- **WHEN** user runs `bao fix` and `~/.bun/bin` exists
- **THEN** system processes the directory successfully

#### Scenario: Custom directory exists
- **WHEN** user runs `bao fix /existing/path` and directory exists
- **THEN** system processes the directory successfully

#### Scenario: Custom directory does not exist
- **WHEN** user runs `bao fix /nonexistent/path` and directory does not exist
- **THEN** system exits with error message indicating directory not found
- **AND** no files are modified

### Requirement: Export public API from index
The system SHALL re-export all public functions and types from `src/index.ts`.

#### Scenario: Public functions accessible
- **WHEN** code imports from `src/index.ts`
- **THEN** all public functions from `src/fix.ts` are available
- **AND** all public types from `src/fix.ts` are available

#### Scenario: CLI imports from index only
- **WHEN** `bin/main.ts` imports functions
- **THEN** imports only come from `src/index.ts`
- **AND** no direct imports from `src/fix.ts` exist

### Requirement: Separate CLI and core logic
The system SHALL separate command-line parsing in `bin/main.ts` from core logic in `src/fix.ts`.

#### Scenario: Core logic in src
- **WHEN** core shebang replacement logic is needed
- **THEN** logic is implemented in `src/fix.ts`
- **AND** logic is independent of CLI framework

#### Scenario: CLI parsing in bin
- **WHEN** command-line arguments need parsing
- **THEN** parsing happens in `bin/main.ts`
- **AND** parsed arguments are passed to core logic functions
