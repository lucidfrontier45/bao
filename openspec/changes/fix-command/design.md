# Design

## Context

Currently, Bun's global installation (`bun i -g`) creates executable scripts with `#!/usr/bin/env node` shebang lines. These scripts fail to run properly with Bun because they reference the wrong runtime. Users must manually fix each script's shebang line.

## Goals / Non-Goals

**Goals:**
- Provide a simple CLI command to fix shebang lines in Bun-installed scripts
- Follow the existing project architecture (logic in `src/`, CLI parsing in `bin/main.ts`)
- Support both single-directory and recursive directory fixing
- Use sensible defaults (`~/.bun/bin` as default target directory)

**Non-Goals:**
- File type filtering (processes ALL files regardless of extension)
- Detecting file encoding (assumes UTF-8)
- Complex file type detection (based on shebang presence only)
- Backup creation (files are modified in-place)

## Decisions

### 1. Command Structure
**Decision**: Use sub-command pattern `bao fix [-r|--recursive] [target_dir]`

**Rationale**:
- Follows common CLI conventions (e.g., `npm install`, `git clone`)
- Clear separation between main command and sub-commands
- Allows for future sub-commands (e.g., `bao check`, `bao list`)
- `-r` flag is standard for recursive operations

**Alternatives considered**:
- Separate binary files (e.g., `bao-fix`) → Rejected: Duplicates build/packaging logic
- Positional flags (e.g., `bao --fix`) → Rejected: Less intuitive for multiple operations

### 2. Architecture Separation
**Decision**: Core logic in `src/`, CLI parsing in `bin/main.ts`, public API re-exported from `src/index.ts`

**Rationale**:
- Follows existing project structure
- Enables testing core logic independently
- Allows potential reuse as a library
- Clean separation of concerns
- Single entry point (`src/index.ts`) simplifies imports and maintains public API surface

**Implementation**:
```
src/fix.ts - Core fixShebang() function
src/index.ts - Re-exports all public functions and types from fix.ts
bin/main.ts - Argument parsing and dispatch (imports only from src/index.ts)
```

**Import Rule**: `bin/main.ts` MUST only import from `src/index.ts`, never directly from other `src/*.ts` files. This ensures:
- Clear public API boundary
- Easier refactoring (internal changes don't affect bin/)
- Consistent import paths
- Better tree-shaking for library usage

### 3. Default Target Directory
**Decision**: Default to `~/.bun/bin` when no target specified

**Rationale**:
- This is Bun's default global bin directory
- Most common use case for fixing global installations
- Aligns with user expectations from `bun i -g`

### 4. File Processing Strategy
**Decision**: Read file, replace shebang, write back in-place

**Rationale**:
- Simple implementation with no temporary files
- Preserves file permissions (no need to re-chmod)
- Atomic operation per file (failure doesn't affect other files)
- Processes ALL files with matching shebang, regardless of extension

**Algorithm**:
1. Recursively find all files in target directory
2. For each file: read first line
3. If line matches `#!/usr/bin/env node`, replace with `#!/usr/bin/env bun`
4. Write modified content back to file

### 5. Recursive Flag Behavior
**Decision**: `-r` flag enables recursive directory traversal

**Rationale**:
- Allows flexible usage (single directory vs. entire tree)
- Common CLI pattern users expect
- Non-recursive is safer default (prevents accidental widespread changes)

## Risks / Trade-offs

**Risk**: Modifying files in-place could corrupt files if operation is interrupted  
**Mitigation**: Each file operation is independent; interruption only affects current file

**Risk**: False positives (changing non-script files with matching shebang)  
**Mitigation**: Shebang pattern is specific (`#!/usr/bin/env node`); unlikely to appear in non-script files. User has control over target directory to avoid unintended modifications.

**Trade-off**: No backup creation simplifies implementation but removes undo capability  
**Acceptable**: Files are easily restored by reinstalling packages (`bun i -g <package>`)

**Trade-off**: In-place modification requires reading entire file  
**Acceptable**: Script files are typically small; memory impact is negligible

## Migration Plan

No migration needed. This is a new feature that:
1. Adds new `src/fix.ts` module
2. Modifies `bin/main.ts` to handle `fix` sub-command
3. Existing functionality remains unchanged

## Open Questions

None identified. The design is straightforward with clear implementation path.
