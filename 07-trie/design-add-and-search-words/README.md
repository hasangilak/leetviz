# Design Add and Search Words · #211 · Medium

🔗 https://leetcode.com/problems/design-add-and-search-words-data-structure/

## Problem
Support `addWord(word)` and `search(word)`, where `search` may contain `.`
wildcards that match **any single character**.

```
addWord("bad"); addWord("dad"); addWord("mad");
search("pad") -> false
search("bad") -> true
search(".ad") -> true   (. matches b, d, or m)
search("b..") -> true   (matches "bad")
```

## 🧐 In plain English
You're building a word dictionary you can add to and then query — but the queries are fancier than usual: a search string may contain `.` characters, where each `.` is a **wildcard** that matches *any one* letter. So `search(".ad")` asks "is there any stored word that is exactly 3 letters and ends in `ad`?"

You implement a class with these operations:
- `addWord(word)` — store a word (plain letters only, no wildcards).
- `search(word)` — return `true` if any stored word matches, treating each `.` in `word` as a single-character wildcard.

- **The hard part:** the `.` wildcard. A `.` doesn't pick one letter — it could match *several* different stored letters at that position, so the search has to branch and explore every possible matching path, succeeding if *any* path leads to a complete stored word of the right length.

## The idea 💡
Start from a normal [trie](../implement-trie-prefix-tree). `addWord` is a plain
insert. The twist is `search`:

- A **normal character** → follow that one child (or fail).
- A **`.`** → it could be *any* character, so try **every child** and succeed if
  any branch matches the remaining pattern.

That "try every child" turns search into a **depth-first search** that branches
at each wildcard.

```
search(node, i):
  if i == len(word):  return node.isEndOfWord
  c = word[i]
  if c == '.':  return ANY child d has search(d, i+1) == true
  else:         return child[c] exists AND search(child[c], i+1)
```

## Walkthrough — `search(".ad")` against {bad, dad, mad}
```
i=0 '.'  -> try every child of root: b, d, m
   try b: i=1 'a' -> b→a ok; i=2 'd' -> a→d ok; i=3 end -> isEnd? yes ✅
   (returns true on the first matching branch — "bad")
```

## Walkthrough — `search("..")` (no 2-letter word)
```
i=0 '.' -> branch into b/d/m
   each: i=1 '.' -> branch into their single child (a)
       i=2 end -> isEndOfWord? these are mid-word 'a' nodes -> false
all branches fail -> false ✅
```

## Complexity
Let `L` = pattern length, `d` = number of `.` wildcards.

| | |
|---|---|
| **`addWord`** | `O(L)` |
| **`search`** | `O(L)` with no wildcards; up to `O(26^d · L)` worst case (each `.` may fan out over all children) |
| **Space** | `O(total characters added)` for the trie + `O(L)` recursion depth |
