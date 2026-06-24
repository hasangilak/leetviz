# Non-overlapping Intervals · #435 · Medium · *Greedy*

🔗 https://leetcode.com/problems/non-overlapping-intervals/

## Problem
Return the **minimum** number of intervals to remove so the remainder don't
overlap.

```
[[1,2],[2,3],[3,4],[1,3]] -> 1   (remove [1,3])
[[1,2],[1,2],[1,2]]       -> 2   (keep one, drop two)
```

## 🧐 In plain English
An **interval** is a range `[start, end]`. Two intervals **overlap** if their ranges cross (sharing only an endpoint, like `[1,2]` and `[2,3]`, does *not* count here). You want what's left to have zero overlaps — so figure out the *smallest* number of intervals you'd have to throw away to make that happen, and return just that count.

- **You're given:** an array `intervals`, each element a pair `[start, end]`.
- **Return:** a single number — the minimum count of intervals to remove.
- **Rules / guarantees:** intervals that merely touch at an endpoint are **not** considered overlapping; you return a count, not the intervals themselves.
- **Watch out for:** "remove the fewest" is the same as "keep the most non-overlapping" — and sorting by **end** time (not start) is what makes the greedy choice work.

## Reframe it
"Remove the fewest" = **"keep the most"** non-overlapping intervals — the textbook
**activity selection** problem.

## The idea 💡 — greedy by earliest finish
Sort by **end time**, then greedily keep whatever **finishes earliest**: it eats
the least of the timeline, leaving the most room for what comes next.

```
   why end-time? an interval that ends sooner can NEVER block more
   future intervals than one that ends later — so it's always ≥ as good to keep.

   keep if  start ≥ lastKeptEnd   else   remove (count++)
```

## 📏 See it on a number line — `[[1,2],[2,3],[3,4],[1,3]]`
Sort by end → `[1,2] [1,3] [2,3] [3,4]`:

```
   1    2    3    4
   ·····|····|····|····
   ▓▓▓▓▓                  [1,2]  keep   (prevEnd → 2)
   ▒▒▒▒▒▒▒▒▒▒             [1,3]  start 1 < 2  → OVERLAP → ✂ remove (count 1)
        ▓▓▓▓▓             [2,3]  start 2 ≥ 2  → keep   (prevEnd → 3)
             ▓▓▓▓▓        [3,4]  start 3 ≥ 3  → keep   (prevEnd → 4)

   kept: [1,2] [2,3] [3,4]   (3 non-overlapping)   removed: 1 ✅
```

## 🎬 Frame-by-frame
```
prevEnd = -∞   removals = 0
[1,2]  1 ≥ -∞  → keep, prevEnd = 2
[1,3]  1 <  2  → overlap, removals = 1
[2,3]  2 ≥  2  → keep, prevEnd = 3
[3,4]  3 ≥  3  → keep, prevEnd = 4
                                      → removals = 1 ✅
```

## Why greedy-by-earliest-finish is optimal 🧠
**Exchange argument:** take any optimal solution. Its first interval can be
swapped for the globally earliest-finishing one without creating new overlaps
(the swapped-in one ends no later, so it blocks no more than the original).
Repeat → the greedy choice is always part of *some* optimal solution. ∎

## Complexity
| | |
|---|---|
| **Time**  | `O(n log n)` — sort by end time |
| **Space** | `O(1)` extra |
