# Spec: Verbose Logging

## ADDED Requirements

### Requirement: Verbose flag for fix command
The system SHALL accept `-v` or `--verbose` flag to enable detailed logging output.

#### Scenario: Enable verbose with short flag
- **WHEN** user runs `bao fix -v`
- **THEN** system enables verbose mode
- **AND** system processes scripts with detailed logging

#### Scenario: Enable verbose with long flag
- **WHEN** user runs `bao fix --verbose`
- **THEN** system enables verbose mode
- **AND** system processes scripts with detailed logging

#### Scenario: Combine verbose with recursive
- **WHEN** user runs `bao fix -v -r /path` or `bao fix --verbose --recursive /path`
- **THEN** system enables both verbose and recursive modes

#### Scenario: Default behavior without verbose
- **WHEN** user runs `bao fix` without verbose flag
- **THEN** system runs silently with no output

### Requirement: Log file operations
The system SHALL log file operations based on the operation type and verbose mode.

#### Scenario: Log when file is opened
- **WHEN** verbose mode is enabled and system opens a file
- **THEN** system logs "Opening: <file_path>"

#### Scenario: Log when file is skipped
- **WHEN** verbose mode is enabled and system skips a file
- **THEN** system logs "Skipped: <file_path>"
- **AND** system includes reason (e.g., "no matching shebang")

#### Scenario: Log when file is modified (always)
- **WHEN** system modifies a file shebang
- **THEN** system ALWAYS logs "Modified: <file_path>" regardless of verbose mode
- **AND** system logs "Changed shebang from #!/usr/bin/env node to #!/usr/bin/env bun"

#### Scenario: No logs for opening/skipping when verbose disabled
- **WHEN** verbose mode is disabled
- **THEN** system does not log file openings
- **AND** system does not log skipped files
- **AND** modified files are still logged

### Requirement: Pass verbose option through API
The system SHALL support verbose parameter in the FixOptions interface.

#### Scenario: FixOptions includes verbose
- **WHEN** code creates FixOptions object
- **THEN** verbose property is available as optional boolean
- **AND** verbose defaults to undefined (disabled)

#### Scenario: fixShebang accepts verbose option
- **WHEN** code calls fixShebang function
- **THEN** verbose parameter can be passed in options
- **AND** verbose option is propagated to file operations

#### Scenario: Backward compatibility
- **WHEN** existing code calls fixShebang without verbose option
- **THEN** function works without errors
- **AND** default behavior (silent) is maintained
