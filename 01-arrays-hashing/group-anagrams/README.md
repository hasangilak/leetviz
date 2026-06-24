# Group Anagrams · #49 · Medium

🔗 https://leetcode.com/problems/group-anagrams/

## Problem
Group together strings that are anagrams of each other.

```
["eat","tea","tan","ate","nat","bat"]
  -> [["eat","tea","ate"], ["tan","nat"], ["bat"]]
```

## 🧐 In plain English
An *anagram* is a word made from the exact same letters as another, just rearranged — `"eat"`, `"tea"`, and `"ate"` all use one a, one e, one t. Your job is to look at a list of words and bundle together the ones that are anagrams of each other, so each bundle holds words built from identical letters.

- **You're given:** an array `strs` of lowercase strings.
- **Return:** a list of groups (array of arrays), where each group contains all the words that are anagrams of one another.
- **Rules / guarantees:** every input word lands in exactly one group; a word with no anagram partners forms a group by itself.
- **Watch out for:** the groups can be returned in any order, and the words within a group can be in any order too — only the grouping matters.

## The idea 💡
Anagrams are the *same letters in a different order*. We need a **canonical key**
that is identical for all members of a group, then bucket by that key in a hash
map.

Two keys work:
1. **Sorted string** — `"eat"`, `"tea"`, `"ate"` all sort to `"aet"`. Simple,
   but `O(k log k)` per word.
2. **Letter-count vector** (used here) — count of each of the 26 letters,
   e.g. `eat -> [1,0,0,0,1,...,1(t),...]`. Building it is `O(k)`, so it's
   asymptotically faster.

## Walkthrough
```
"eat" -> counts a=1,e=1,t=1 -> key "1#0#0#0#1#...#1#..."  ┐
"tea" -> same counts ........ -> same key ................. ├─ bucket #1
"ate" -> same counts ........ -> same key ................. ┘
"tan" -> a=1,n=1,t=1 ........ -> different key ............ ┐
"nat" -> same as tan ........ -> same key ................. ┴─ bucket #2
"bat" -> a=1,b=1,t=1 ........ -> unique key ............... bucket #3
```

The `#` separators stop counts from blurring together (so `[1,11]` and `[11,1]`
don't both become `"111"`).

## Complexity
Let `n` = number of words, `k` = max word length.

| | |
|---|---|
| **Time**  | `O(n · k)` — count vector per word (vs `O(n · k log k)` if sorting) |
| **Space** | `O(n · k)` — all characters live once inside the buckets |
