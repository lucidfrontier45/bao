# Spec: Fix Command (Delta)

## MODIFIED Requirements

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
