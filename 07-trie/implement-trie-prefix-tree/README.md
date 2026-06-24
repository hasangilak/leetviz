# Implement Trie (Prefix Tree) · #208 · Medium

🔗 https://leetcode.com/problems/implement-trie-prefix-tree/

## Problem
Implement a **trie** with:
- `insert(word)`
- `search(word)` — is this *exact word* stored?
- `startsWith(prefix)` — is any stored word starting with this prefix?

## 🧐 In plain English
You're building a little dictionary that stores words and can answer two kinds of yes/no questions: "is this *exact* word in here?" and "does any stored word *begin with* this string?" A **prefix** is just the leading part of a word (e.g. `"app"` is a prefix of `"apple"`). The "trie" is the special tree structure you build to do this efficiently.

You implement a class with these operations:
- `insert(word)` — add a word to the dictionary.
- `search(word)` — return `true` only if this *whole word* was inserted earlier (not just present as a prefix of something longer).
- `startsWith(prefix)` — return `true` if at least one stored word starts with this prefix.

- **The hard part:** distinguishing a complete stored word from a string that merely happens to be the prefix of another. `search("app")` must be `false` if you only ever inserted `"apple"`, even though the path `a-p-p` exists.

## What is a trie? 🌲
A **trie** (a.k.a. prefix tree) stores strings as a tree where each **edge is a
character**. Words that share a prefix share the same path near the root.

```
insert "apple", "app", "apply":

        (root)
          │ a
          a
          │ p
          p
          │ p
         (p)•          • = end-of-word marker (here: "app")
        ┌─┴─┐
      l │   │ l
        l   l
      e │   │ y
       (e)• (y)•       "apple"      "apply"
```

The shared `a-p-p` path is stored **once**. The `•` (end-of-word flag) is what
distinguishes a stored word from a mere prefix — without it, `search("app")`
couldn't tell that `app` was actually inserted vs. just a prefix of `apple`.

## Operations (all O(L), L = string length)
| Method | Logic |
|--------|-------|
| `insert` | walk the path, creating missing nodes; flag the last node |
| `search` | walk the path; true **only if** it exists *and* the last node is flagged |
| `startsWith` | walk the path; true if it simply exists |

The difference between `search` and `startsWith` is literally one check of the
end-of-word flag.

## Why a trie over a hash set?
A `Set` answers exact `search` in O(L) too — but it **can't do prefix queries**.
A trie does prefix work in O(prefix length) regardless of dictionary size, which
powers autocomplete, spell-check, and IP routing tables.

## Complexity
| | |
|---|---|
| **Time**  | `O(L)` per operation (`L` = word/prefix length) |
| **Space** | `O(total characters inserted)` in the worst case (shared prefixes save space) |
