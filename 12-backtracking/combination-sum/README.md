# Combination Sum · #39 · Medium

🔗 https://leetcode.com/problems/combination-sum/

## Problem
Return all unique combinations of `candidates` (distinct) that sum to `target`.
Each candidate may be **reused any number of times**.

```
candidates=[2,3,6,7], target=7  ->  [[2,2,3], [7]]
candidates=[2,3,5],   target=8  ->  [[2,2,2,2], [2,3,3], [3,5]]
```

## 🧐 In plain English
Pick numbers from `candidates` so they add up exactly to `target`. A **combination** is just a group of chosen numbers where *order doesn't matter* — `[2,2,3]` and `[3,2,2]` are the same combination, so list it only once. The twist: you may pick the same number as many times as you like.

- **You're given:** an array `candidates` of distinct positive integers and an integer `target`.
- **Return:** every unique combination whose numbers sum to `target`.
- **Rules / guarantees:** each candidate may be **reused** any number of times; candidates are distinct; two combinations differing only in order count as the same.
- **Watch out for:** unlimited reuse means a combination can be longer than the input (e.g. `[2,2,2,2]`); make sure you don't emit reordered duplicates.

## The idea 💡
Backtracking — choose → recurse → un-choose — with two specifics:

```
   ① REUSE allowed
      after picking candidates[i], recurse with the SAME index i (not i+1)
                                    └──────────────┬──────────────┘
                                       so i can be chosen again

   ② NO duplicate combinations
      never go back to an earlier index — only move forward (start)
      → [2,2,3] is found once, never as [2,3,2] or [3,2,2]
```

Track `remaining = target − (chosen so far)`:
- hits **0** → record the combination ✅
- goes **negative** → prune this branch ✂️

## 🌳 The recursion tree — `[2,3,6,7]`, target 7
Each node shows `remaining`. `i↻` = recursing with the same index (reuse).

```
                              rem 7
        ┌──────────┬──────────┬──────────┐
      +2│        +3│        +6│        +7│
        ▼          ▼          ▼          ▼
      rem 5      rem 4      rem 1      rem 0 ✅ [7]
   ┌────┼────┐    │          │
 +2│  +3│  +6│  +3│        ✂ rem 1<smallest reuse
   ▼    ▼    ▼    ▼          (6 only → 6 > 1 → prune)
 rem3  rem2 ✂   rem1
 ┌─┐    │   rem-1  ✂
+2│+3│ +3│   prune
 ▼  ▼   ▼
rem1 rem0  rem-1 ✂
 ✂   ✅      prune
    [2,2,3]

   results: [2,2,3]  and  [7] ✅
```

> The `+3` branch under `rem 4` leads to `rem 1` (then only `≥3` reuse → prune),
> so `-4-` produces nothing. Only the two green ✅ leaves survive.

## ① vs ② in one line
```
  reuse        → recurse(i,   rem − c)     // same index
  no dup combo → loop starts at `start`, never below it
```

## Complexity
Let `T = target`, `m = min(candidates)`:

| | |
|---|---|
| **Time**  | exponential — `O(n^(T/m))` branches worst case |
| **Space** | `O(T/m)` recursion depth (+ output) |

> **#40 Combination Sum II** (use each number once, input has duplicates) switches
> to `i+1` and adds a "skip equal sibling" check to dedupe.
