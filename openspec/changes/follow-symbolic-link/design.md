## Context

The `fix` command currently uses `readdir` with `isFile()` to discover files. This returns `false` for symbolic links, so when bun creates symlinks in target directories (e.g., `node_modules/.bin/`), they are skipped. The actual executable files behind the symlinks are never processed for shebang fixes.

## Goals / Non-Goals

**Goals:**
- Detect symbolic links during file discovery
- Follow symlinks to process the actual target files for shebang fixes
- Maintain backward compatibility with regular files

**Non-Goals:**
- Create new symlinks (only follow existing ones)
- Handle circular symlink references (rely on OS to handle this)

## Decisions

1. **Use `entry.isSymbolicLink()` + `isFile()` on lstat result**: Check if entry is a symlink, then use `lstat` to check if the link target is a file. This allows us to detect symlinks while avoiding directories.

   Alternative considered: Use `followLinkSymlinks` option in `readdir` (available in Node 20+), but Bun's implementation may differ.

2. **Process symlinks before regular files**: Yield symlinks that point to files so they can be fixed. The actual fix happens on the resolved file path.

3. **Default to following symlinks**: By default, the system will follow symlinks and modify the target files. Add `--skip-outside` option to skip symlinks that point outside the target directory for users who want to restrict modifications to within the target directory.

## Risks / Trade-offs

- **Risk**: Symlinks could point outside the target directory (e.g., `../../outside`)
  - **Mitigation**: Add `--skip-outside` option for users who want to restrict modifications to within the target directory. Default behavior follows all valid symlinks.

- **Risk**: Circular symlink references
  - **Mitigation**: Rely on OS to handle; add detection if needed

- **Trade-off**: Following symlinks may cause the same file to be processed multiple times if multiple symlinks point to it
  - **Mitigation**: Track processed file paths (by resolved real path) to avoid duplicates
