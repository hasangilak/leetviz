# Subsets · #78 · Medium

🔗 https://leetcode.com/problems/subsets/

## Problem
Return the **power set** — every subset of a distinct-integer array.

```
[1,2,3] -> [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]   (2³ = 8 subsets)
```

## 🧐 In plain English
A **subset** is any selection of items from the array, including picking none of them or all of them — order doesn't matter, so `[1,2]` and `[2,1]` count as the same subset. The **power set** is the collection of *every* possible subset. Your job: given a list of distinct numbers, produce that full collection.

- **You're given:** an array `nums` of distinct integers.
- **Return:** a list of all subsets (each subset is itself a list).
- **Rules / guarantees:** include the empty subset `[]` and the full set; numbers are distinct, so no duplicate subsets arise; `n` numbers yield exactly `2ⁿ` subsets.
- **Watch out for:** the subsets and the numbers inside them can be in any order — there's no required ordering.

## What is backtracking? 🌳
**Backtracking** = build a candidate incrementally, and at each step
**choose → recurse → un-choose**. It's a DFS over a tree of partial solutions; the
"un-choose" (undo) lets one shared `current` array serve the entire search.

```
   push(x)           pop(x)
   ───────▶  recurse  ◀───────
   choose             un-choose
```

## The idea 💡
Each decision is "include the next element or skip it." A `start` index means we
only ever extend with elements to the **right** — so `[1,2]` is generated but
never its rearrangement `[2,1]`. And since **every node of the recursion tree is
itself a valid subset**, we record `current` on entry, before the loop.

## 🌳 The recursion tree — `[1,2,3]`
Every node is a recorded subset. Edges = "add this element". `start` rises as we
go right, which prunes the duplicates.

```
                         [ ]                      ← record []
          ┌───────────────┼───────────────┐
        +1│             +2│             +3│
          ▼               ▼               ▼
        [1]              [2]              [3]      ← record [1] [2] [3]
     ┌────┴────┐          │
   +2│       +3│        +3│
     ▼         ▼          ▼
   [1,2]     [1,3]      [2,3]                      ← record [1,2] [1,3] [2,3]
     │
   +3│
     ▼
  [1,2,3]                                          ← record [1,2,3]

  visiting order (pre-order DFS):
  [] → [1] → [1,2] → [1,2,3] → [1,3] → [2] → [2,3] → [3]
```

## 🎬 The `current` array over time
Watch one array mutate via push/pop as the DFS walks the tree:

```
[]            record
 push 1 → [1]            record
   push 2 → [1,2]        record
     push 3 → [1,2,3]    record
     pop 3  → [1,2]
   pop 2  → [1]
   push 3 → [1,3]        record
   pop 3  → [1]
 pop 1  → []
 push 2 → [2]            record   ... and so on
```

## Complexity
| | |
|---|---|
| **Time**  | `O(n · 2ⁿ)` — 2ⁿ subsets, each `O(n)` to copy into the result |
| **Space** | `O(n)` recursion depth (output not counted) |
