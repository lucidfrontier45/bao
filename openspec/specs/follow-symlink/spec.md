# follow-symlink Specification

## Purpose
TBD - created by archiving change follow-symbolic-link. Update Purpose after archive.
## Requirements
### Requirement: Symlink detection in file discovery
The system SHALL detect symbolic links when scanning a target directory for script files to fix.

#### Scenario: Discover symlink by default
- **WHEN** the target directory contains a symbolic link that points to a regular file
- **THEN** the system SHALL include the symlink target in the list of files to process by default

#### Scenario: Skip broken symlink
- **WHEN** the target directory contains a broken symbolic link (target does not exist)
- **THEN** the system SHALL skip the broken symlink

### Requirement: Process symlinked file for shebang fix
The system SHALL apply shebang fixes to the actual file behind a symbolic link when processing.

#### Scenario: Fix shebang in symlinked script
- **WHEN** the system discovers a symlink pointing to a file with `#!/usr/bin/env node` shebang
- **THEN** the system SHALL modify the target file to use `#!/usr/bin/env bun`

#### Scenario: Modify symlink target outside directory by default
- **WHEN** the target directory contains a symlink pointing to a path outside the target directory
- **THEN** the system SHALL modify the target file by default

### Requirement: Option to skip outside symlinks
The system SHALL provide an option to skip symlinks that point outside the target directory.

#### Scenario: Skip outside symlinks with flag
- **WHEN** user runs `bao fix --skip-outside /path`
- **THEN** the system SHALL skip symbolic links that point to paths outside the target directory

#### Scenario: Follow all symlinks by default
- **WHEN** user runs `bao fix /path` without any symlink option
- **THEN** the system SHALL follow all valid symbolic links, including those pointing outside the target directory

