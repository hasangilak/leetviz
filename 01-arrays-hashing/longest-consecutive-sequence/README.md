# Longest Consecutive Sequence · #128 · Medium

🔗 https://leetcode.com/problems/longest-consecutive-sequence/

## Problem
Length of the longest run of consecutive integers, in **O(n)** (unsorted input).

```
[100,4,200,1,3,2] -> 4   (the run 1,2,3,4)
```

## 🧐 In plain English
*Consecutive* integers are numbers that follow each other by exactly 1, like `1, 2, 3, 4`. Ignoring where they sit in the array, find the longest chain of such back-to-back numbers you can build from the values present, and report how *long* that chain is. In `[100,4,200,1,3,2]` the values `1,2,3,4` form a chain of length 4.

- **You're given:** an unsorted array `nums` of integers.
- **Return:** a single integer — the length of the longest consecutive run, not the run itself.
- **Rules / guarantees:** must run in `O(n)` time, so sorting (`O(n log n)`) is off the table; duplicate values don't lengthen a run, and an empty array gives `0`.
- **Watch out for:** the consecutive numbers can be scattered anywhere in the array — their positions don't matter, only that the values exist.

## The idea 💡
Sorting solves it in `O(n log n)` — but the constraint is `O(n)`, so we use a
**hash set** plus one key rule:

> Only start counting a run from its **smallest** element.

A number `n` begins a run **iff `n − 1` is absent** from the set. From a genuine
start, walk upward (`n+1, n+2, …`) while the set has the next value.

```
   is (n−1) in the set?
        ├── YES → n is in the MIDDLE of some run → skip it
        └── NO  → n is a START → count up n, n+1, n+2, … until it breaks
```

## 📏 See it — `[100, 4, 200, 1, 3, 2]`
```
   set = {1, 2, 3, 4, 100, 200}

   number line (only the values present):
   1  2  3  4 ............. 100 ......... 200
   ●──●──●──●               ●             ●
   └──── run of 4 ────┘    lone          lone
   ▲                       ▲             ▲
   start (0 absent)        start         start
   (99 absent)             (199 absent)
```

## 🎬 Which numbers actually trigger a count?
```
value  (value-1) in set?   action
─────  ─────────────────   ────────────────────────────────
100    99? no               START → 101? no            → len 1
4      3?  yes              skip (mid-run)
200    199? no              START → 201? no            → len 1
1      0?  no               START → 2?yes 3?yes 4?yes 5?no → len 4  ★
3      2?  yes              skip (mid-run)
2      1?  yes              skip (mid-run)
                                                  ANSWER = 4 ✅
```

## 🔑 Why it's O(n), not O(n²)
The inner `while` only runs from **true starts**, and it walks each run's members
once. So across the whole algorithm every value is touched **at most twice** (once
by the outer loop, once as part of one run) → linear.

```
   ✗ counting from EVERY element re-walks runs over and over → O(n²)
   ✓ counting only from starts walks each run exactly once   → O(n)
```

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` — each value visited ≤ 2 times overall |
| **Space** | `O(n)` — the hash set |
