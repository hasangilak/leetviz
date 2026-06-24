# Permutations · #46 · Medium

🔗 https://leetcode.com/problems/permutations/

## Problem
All orderings of a distinct-integer array.

```
[1,2,3] -> [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]   (3! = 6)
```

## 🧐 In plain English
A **permutation** is one specific *ordering* of all the numbers — here order *does* matter, so `[1,2,3]` and `[2,1,3]` are different answers. (That's the opposite of a subset/combination, where order is ignored.) Your job: list every possible way to arrange all the numbers.

- **You're given:** an array `nums` of distinct integers.
- **Return:** a list of all permutations (each uses *every* number exactly once).
- **Rules / guarantees:** numbers are distinct, so there are exactly `n!` arrangements; every number must appear in every output ordering.
- **Watch out for:** unlike subsets, you can't skip elements — each permutation has the full length `n`; the outer list of permutations can be in any order.

## Subsets vs. Permutations — the key difference
| | Subsets / Combinations | Permutations |
|--|------------------------|--------------|
| Order matters? | No (`[1,2]==[2,1]`) | **Yes** |
| Every element used? | No | **Yes** |
| Tool to control choices | a forward-only `start` index | a `used[]` flag |

Permutations need *every* element in *every* order, so we can't restrict to
"elements after start." Instead each position picks **any unused** element.

## 🌳 The recursion tree — `[1,2,3]`
Branch on every **unused** number. Leaves (depth 3) are complete permutations.
Greyed numbers `(·)` are already used on that path.

```
                              [ ]
              ┌────────────────┼────────────────┐
            1 │              2 │              3 │
              ▼                ▼                ▼
            [1]              [2]              [3]
          ┌──┴──┐          ┌──┴──┐          ┌──┴──┐
        2 │   3 │        1 │   3 │        1 │   2 │
          ▼     ▼          ▼     ▼          ▼     ▼
        [1,2] [1,3]      [2,1] [2,3]      [3,1] [3,2]
          │     │          │     │          │     │
        3 │   2 │        3 │   1 │        2 │   1 │
          ▼     ▼          ▼     ▼          ▼     ▼
       [1,2,3][1,3,2]   [2,1,3][2,3,1]   [3,1,2][3,2,1]   ← 6 leaves = 3! ✅
```

## 🎬 `used[]` and `current` in lockstep (leftmost path)
```
used      current     action
────────  ──────────  ───────────────────────────
[F F F]   []          pick index0 (1)
[T F F]   [1]         pick index1 (2)
[T T F]   [1,2]       pick index2 (3)
[T T T]   [1,2,3]     full → RECORD ✅
[T T F]   [1,2]       undo 3
[T F F]   [1]         undo 2 → next try index2 (3)
[T F T]   [1,3]       pick index1 (2)
[T T T]   [1,3,2]     full → RECORD ✅
...
```

`used[]` blocks placing the same element twice on one path; the choose/undo pair
explores every arrangement exactly once.

## Complexity
| | |
|---|---|
| **Time**  | `O(n · n!)` — `n!` permutations, each `O(n)` to copy |
| **Space** | `O(n)` — recursion depth + `used[]` |

> With duplicate inputs (**#47**), sort first and skip a value equal to its
> previous sibling when that sibling is unused — avoids repeated permutations.
