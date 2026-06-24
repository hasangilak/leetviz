#!/usr/bin/env bash
#
# run.sh — run ONE LeetCode solution by fuzzy name (or list them all).
#
#   ./run.sh                  list every problem (numbered)
#   ./run.sh ls               same as above
#   ./run.sh two-sum          run the problem whose path matches "two-sum"
#   ./run.sh koko             fuzzy, case-insensitive substring match
#   ./run.sh lru              -> 03-linked-list/lru-cache
#   ./run.sh 12               run problem #12 from the list
#   ./run.sh -w koko          WATCH mode: re-runs automatically on every save
#   ./run.sh koko -w          (flag can go before or after the name)
#   ./run.sh -v edit-distance OPEN the interactive HTML visualizer in your browser
#
# Tip: add `console.log(...)` anywhere in a solution.ts — inside the
#      `if (require.main === module)` demo block is the natural spot — then
#      re-run, or use -w to have it re-run on every save.

set -euo pipefail
cd "$(dirname "$0")"

# ---- parse optional flags (before or after the query) ----
watch=0
viz=0
args=()
for a in "$@"; do
  case "$a" in
    -w|--watch) watch=1 ;;
    -v|--viz) viz=1 ;;
    *) args+=("$a") ;;
  esac
done
query="${args[0]:-}"

# ---- collect all solutions, sorted, as relative paths ----
all=()
while IFS= read -r f; do
  all+=("${f#./}")
done < <(find . -path ./node_modules -prune -o -name solution.ts -print | sort)

list_all() {
  echo "Problems (${#all[@]}):"
  local i=1
  for f in "${all[@]}"; do
    printf "  %2d  %s\n" "$i" "${f%/solution.ts}"
    i=$((i + 1))
  done
  echo
  echo "Run:    ./run.sh <name|number>        e.g. ./run.sh koko   ./run.sh 12"
  echo "Watch:  ./run.sh -w <name|number>     re-runs on every save"
}

run_file() {
  local target="$1"
  local dir
  dir="$(dirname "$target")"
  if [[ $viz -eq 1 ]]; then
    local html="$dir/visualize.html"
    if [[ -f "$html" ]]; then
      echo "🌐 opening ${html}"
      open "$html"   # macOS: opens in the default browser (file:// works fine)
      exit 0
    fi
    echo "No visualizer yet for ${target%/solution.ts} (only some problems have one)." >&2
    echo "See ./index.html for the list that do." >&2
    exit 1
  fi
  echo "▶ ${target%/solution.ts}"
  echo "─────────────────────────────────────────────"
  if [[ $watch -eq 1 ]]; then
    exec npx tsx watch "$target"
  else
    exec npx tsx "$target"
  fi
}

# ---- no query (or ls/list) → print the menu ----
if [[ -z "$query" || "$query" == "ls" || "$query" == "list" ]]; then
  list_all
  exit 0
fi

# ---- numeric query → run by index ----
if [[ "$query" =~ ^[0-9]+$ ]]; then
  if (( query < 1 || query > ${#all[@]} )); then
    echo "No problem #$query (have 1..${#all[@]}). Run ./run.sh to list." >&2
    exit 1
  fi
  run_file "${all[$((query - 1))]}"
fi

# ---- fuzzy: case-insensitive literal substring match on the folder path ----
matches=()
for f in "${all[@]}"; do
  name="${f%/solution.ts}"
  if printf '%s' "$name" | grep -iqF -- "$query"; then
    matches+=("$f")
  fi
done

if [[ ${#matches[@]} -eq 0 ]]; then
  echo "No match for '$query'. Run ./run.sh to list all problems." >&2
  exit 1
elif [[ ${#matches[@]} -eq 1 ]]; then
  run_file "${matches[0]}"
else
  # multiple matches — but an exact folder-name match wins outright
  for f in "${matches[@]}"; do
    if [[ "$(basename "$(dirname "$f")")" == "$query" ]]; then
      run_file "$f"
    fi
  done
  echo "'$query' matches ${#matches[@]} problems — be more specific:"
  for f in "${matches[@]}"; do
    printf "    %s\n" "${f%/solution.ts}"
  done
  exit 1
fi
