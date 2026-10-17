#!/usr/bin/env bash
# Prepares a docs snapshot worktree for a release tag that predates the docs app.
#
#   scripts/legacy-docs-snapshot.sh <tag> <dir>
#
# Releases up to design-system 1.3.3 / styled-system 5.8.3 / markdown 1.2.2 were cut in
# soroush-tech/core and reach this repo through the subtree split: their trees hold only
# `packages/`, no docs app. Their snapshot is built from the last 1.x setup of this repo
# (LEGACY_SETUP - main just before design-system 2.0.0) with the tag's packages in place of
# the setup's, so the README text, docs and components are the release's own. The setup
# keeps its `.mdx` pages, which those trees never had; a component the release did not have
# yet loses its page and its registry entry.
set -euo pipefail

# Merge of #4: design-system 1.3.4, styled-system 5.8.3, markdown 1.2.2 - the 1.x API.
LEGACY_SETUP=a527a34ab858a7d9978b3c6fc8c114601e9d075c

tag=$1
dir=$2

git worktree add --detach "$dir" "$LEGACY_SETUP"
cd "$dir"

for pkg in $(git ls-tree --name-only "$tag:packages"); do
  # Only the packages this setup has (core's bench and the like stay out), and packages.md
  # is a file.
  [ -d "packages/$pkg" ] && git ls-tree -d "$tag:packages/$pkg" >/dev/null 2>&1 || continue
  pages=$(git ls-files "packages/$pkg/*.mdx")
  git rm -r -q "packages/$pkg"
  git checkout "$tag" -- "packages/$pkg"
  [ -z "$pages" ] || git checkout "$LEGACY_SETUP" -- $pages
done

# A workspace devDependency on core's benchmark package, which never moved here.
sed -i '/"@soroush.tech\/bench": "workspace:\*",/d' packages/*/package.json

registry=packages/docs-content/src/registry.ts
for entry in $(grep -oE "(markdownComponent|component)\('[A-Za-z]+'" "$registry" | tr -d "'" | tr '(' ':'); do
  kind=${entry%%:*}
  name=${entry##*:}
  pkg=design-system
  [ "$kind" = markdownComponent ] && pkg=markdown
  [ -n "$(find "packages/$pkg/src" -path "*/$name/README.md")" ] && continue
  echo "Not in $tag: $name - page and registry entry dropped."
  find "packages/$pkg/src" -name "$name.mdx" -delete
  sed -i -E "/$kind\('$name'/d" "$registry"
done
