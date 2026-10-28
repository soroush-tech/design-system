#!/usr/bin/env bash
# Prepares a docs snapshot worktree for a release tag that predates the docs app.
#
#   scripts/legacy-docs-snapshot.sh <tag> <dir>
#
# Releases up to design-system 1.3.3 / styled-system 5.8.3 / markdown 1.2.2 were cut in
# soroush-tech/core and reach this repo through the subtree split: their trees hold only
# `packages/`, no docs app. Their snapshot is built from the docs app as of LEGACY_SETUP, so
# it has the current layout, with the release's own prose (every `.md` under its packages -
# READMEs, docs, release notes) laid over the setup's. Code, demos and props tables are the
# setup's: the new layout needs components the old packages do not have. A component the
# release did not have yet loses its page and its registry entry.
set -euo pipefail

# The docs app with the rail, tree and TOC layout (the merge of #58).
LEGACY_SETUP=e2a9d9f9f04e446304c5f3d4811d29d3b09025a8

tag=$1
dir=$2

git worktree add --detach "$dir" "$LEGACY_SETUP"
cd "$dir"

for pkg in $(git ls-tree --name-only "$tag:packages"); do
  # Only the packages this setup has (core's bench and the like stay out), and packages.md
  # is a file.
  [[ -d "packages/$pkg" ]] && git ls-tree -d "$tag:packages/$pkg" >/dev/null 2>&1 || continue
  # A package with no prose in the release (grep finds nothing) is not an error.
  git ls-tree -r --name-only "$tag" -- "packages/$pkg" | { grep -E '\.md$' || true; } | while read -r file; do
    mkdir -p "$(dirname "$file")"
    git show "$tag:$file" > "$file"
  done
done

registry=packages/docs-content/src/registry.ts
for entry in $(grep -oE "(markdownComponent|component)\('[A-Za-z]+'" "$registry" | tr -d "'" | tr '(' ':'); do
  kind=${entry%%:*}
  name=${entry##*:}
  pkg=design-system
  [[ "$kind" == markdownComponent ]] && pkg=markdown
  # grep reads the whole listing: -q would close the pipe on the first match, and pipefail would
  # count git's SIGPIPE as "not found".
  if git ls-tree -r --name-only "$tag" -- "packages/$pkg/src" | grep "/$name/README.md$" > /dev/null; then
    continue
  fi
  echo "Not in $tag: $name - page and registry entry dropped."
  find "packages/$pkg/src" -name "$name.mdx" -delete
  sed -i -E "/$kind\('$name'/d" "$registry"
  # The family's members go with it, whether listed on one line or several.
  sed -i -E "/^  $name: \[.*\],$/d; /^  $name: \[$/,/^  \],$/d" "$registry"
done
