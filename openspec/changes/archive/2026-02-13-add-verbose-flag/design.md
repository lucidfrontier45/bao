## Context

The bao CLI tool currently runs silently when fixing shebangs. Users have no visibility into:
- Which files are being processed
- Which files are modified vs skipped
- What specific changes are made

The fix command operates on directories of files, and the current implementation provides no feedback during execution. This is a simple, focused change that adds optional logging without changing the core architecture.

## Goals / Non-Goals

**Goals:**
- Add optional verbose logging to show file operations
- Maintain backward compatibility (default behavior remains silent)
- Use console.log for output (no external logging libraries)
- Keep implementation simple and maintainable

**Non-Goals:**
- Adding log levels (debug, info, warn, error)
- Adding log file output
- Adding colored output or formatting
- Refactoring the entire logging system
- Changing the core shebang replacement logic

## Decisions

### Decision 1: Add verbose boolean to FixOptions interface
**Rationale**: The FixOptions interface already exists for the `recursive` flag. Adding a `verbose` boolean keeps the API consistent and simple.

**Alternatives considered:**
- Creating a separate logging configuration object - Rejected as overkill for a simple boolean flag
- Using a log level enum - Rejected as too complex for current needs

### Decision 2: Use console.log for verbose output
**Rationale**: Bun provides console.log out of the box. No external dependencies needed. Simple and sufficient for CLI tool output.

**Alternatives considered:**
- Using a logging library (pino, winston) - Rejected as unnecessary dependency
- Using console.error - Rejected as verbose output is informational, not an error

### Decision 3: Pass verbose flag through the call chain
**Rationale**: The CLI parses the flag and passes it to fixShebang(), which passes it to discoverFiles() and fixFileShebang(). This keeps logging controlled and testable.

**Alternatives considered:**
- Using a global variable - Rejected as it makes testing harder and violates function purity
- Using environment variable - Rejected as it's not CLI-friendly

## Risks / Trade-offs

**Risk**: Verbose output may clutter user's terminal
- **Mitigation**: Default behavior remains silent; users must opt-in with `-v` flag

**Risk**: Logging may slow down file processing
- **Mitigation**: Console.log is fast; overhead is minimal for typical use cases (dozens of files)

**Trade-off**: Simple console.log vs structured logging
- We choose simplicity over features. If advanced logging is needed later, it can be added without breaking changes.

## Migration Plan

1. Update `FixOptions` interface to include `verbose?: boolean`
2. Update `fixShebang()` function to accept and pass verbose option
3. Add console.log statements in `fixFileShebang()` to show file operations
4. Update `bin/main.ts` to parse `-v` and `--verbose` flags
5. Export updated `FixOptions` type from `src/index.ts`
6. Test with verbose flag enabled and disabled

**Rollback**: If issues arise, the verbose parameter is optional and defaults to undefined, maintaining backward compatibility.

## Open Questions

None. This is a straightforward feature addition with clear implementation path.
