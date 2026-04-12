#!/usr/bin/env bash
# Compare Jekyll build output between two git refs.
#
# Usage: scripts/compare-builds.sh <ref1> <ref2>
#   ref1, ref2 can be commit hashes, branch names, or tags.
#
# Example:
#   scripts/compare-builds.sh main HEAD
#   scripts/compare-builds.sh abc1234 def5678

set -euo pipefail

REF1=${1:?Usage: $0 <ref1> <ref2>}
REF2=${2:?Usage: $0 <ref1> <ref2>}

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORK_DIR=$(mktemp -d)

cleanup() {
  git -C "$REPO_ROOT" worktree remove --force "$WORK_DIR/wt1" 2>/dev/null || true
  git -C "$REPO_ROOT" worktree remove --force "$WORK_DIR/wt2" 2>/dev/null || true
  rm -rf "$WORK_DIR"
}
trap cleanup EXIT

build_ref() {
  local ref=$1 wt=$2 out=$3
  git -C "$REPO_ROOT" worktree add --detach "$wt" "$ref" --quiet 2>/dev/null
  (
    cd "$wt"
    bundle install --quiet 2>/dev/null
    bundle exec jekyll build --destination "$out" --quiet 2>/dev/null
  )
}

normalize() {
  local dir=$1
  # Strip <lastmod> tags emitted by jekyll-sitemap (vary by build time/mtime)
  find "$dir" -type f \( -name "*.xml" -o -name "*.html" \) | while read -r f; do
    perl -i -pe 's|<lastmod>[^<]*</lastmod>||g' "$f"
  done
}

WT1="$WORK_DIR/wt1"
WT2="$WORK_DIR/wt2"
OUT1="$WORK_DIR/out1"
OUT2="$WORK_DIR/out2"

echo "Building $REF1..." >&2
build_ref "$REF1" "$WT1" "$OUT1"

echo "Building $REF2..." >&2
build_ref "$REF2" "$WT2" "$OUT2"

echo "Normalizing output..." >&2
normalize "$OUT1"
normalize "$OUT2"

DIFF=$(diff -rq "$OUT1" "$OUT2" 2>/dev/null || true)

if [ -z "$DIFF" ]; then
  echo "No changes in built output."
else
  echo "Changed files:"
  echo "$DIFF" | sed "s|$OUT1/|before/|g; s|$OUT2/|after/|g"
fi
