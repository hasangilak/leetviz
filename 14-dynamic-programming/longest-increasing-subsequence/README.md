# Longest Increasing Subsequence · #300 · Medium

🔗 https://leetcode.com/problems/longest-increasing-subsequence/

## Problem
Return the **length** of the longest strictly increasing subsequence.

```
[10,9,2,5,3,7,101,18] -> 4    (e.g. [2,3,7,101])
[7,7,7,7]             -> 1    (strictly increasing, so no repeats)
```

## 🧐 In plain English
A **subsequence** keeps the original left-to-right order but is allowed to *skip*
elements — the chosen numbers don't have to be next to each other. Find the
longest such pick where each number is **strictly larger** than the one before
it, and return how long it is.

- **You're given:** an integer array `nums`.
- **Return:** the *length* of the longest strictly-increasing subsequence (not the subsequence itself).
- **Rules / guarantees:** elements keep their order; you may drop any; "increasing" is strict (equal values can't both be used).
- **Watch out for:** subsequence ≠ subarray — `[2,3,7,101]` is valid for the example even though those values aren't adjacent in the array.

## The idea 💡 — anchor the subsequence at each index
Ask, for every position: *"what's the longest increasing run that **ends** here?"*

```
   ┌────────────────────────────────────────────────────────────┐
   │ STATE       dp[i] = length of longest incr. subseq ending at i │
   │ RECURRENCE  dp[i] = 1 + max( dp[j] )                          │
   │                     over all j < i where nums[j] < nums[i]    │
   │             (just 1 if no smaller element precedes it)        │
   │ ANSWER      max of all dp[i]                                  │
   └────────────────────────────────────────────────────────────┘
```

For each `i`, look back at every earlier `j`: if `nums[j] < nums[i]`, we can tack
`nums[i]` onto that run.

## 📊 Fill the table — `[10, 9, 2, 5, 3, 7, 101, 18]`
Each `dp[i]` = 1 + the best `dp[j]` among smaller earlier values (arrows show the
chosen predecessor):

```
 index:   0    1    2    3    4    5    6    7
 value:  10    9    2    5    3    7  101   18
 dp:      1    1    1    2    2    3    4    4
                         ▲    ▲    ▲    ▲
                         │    │    │    └ 18 > 7   → dp= dp[5]+1 = 4
                         │    │    └ 7 > 5,3,2     → dp= 2+1 = 3
                         │    └ 3 > 2              → dp= 1+1 = 2
                         └ 5 > 2                   → dp= 1+1 = 2

   best = max(dp) = 4   →  e.g. 2 → 3 → 7 → 101 ✅
```

## ⚡ The faster O(n log n) version
Keep a `tails` array where `tails[k]` = smallest possible tail of an increasing
subsequence of length `k+1`. For each number, binary-search the first tail `≥` it
and replace it (or append). The length of `tails` is the answer. That trades this
simple `O(n²)` for `O(n log n)`.

## Complexity
| | |
|---|---|
| **Time**  | `O(n²)` here (`O(n log n)` with the patience-sorting trick) |
| **Space** | `O(n)` — the `dp` array |
