# Maximum Subarray · #53 · Medium · *Kadane's Algorithm*

🔗 https://leetcode.com/problems/maximum-subarray/

## Problem
Find the **contiguous** subarray with the largest sum; return that sum.

```
[-2,1,-3,4,-1,2,1,-5,4] -> 6     (the subarray [4,-1,2,1])
[5,4,-1,7,8]            -> 23     (the whole array)
```

## 🧐 In plain English
From the array, pick a slice of **back-to-back** elements (you can't skip around)
and add them up. Among all possible slices, find the one with the biggest total
and return that total. A slice can be a single element, and if every number is
negative you still must pick one (the "least bad").

- **You're given:** an integer array `nums` (may contain negatives).
- **Return:** the largest sum achievable by any contiguous, non-empty subarray.
- **Rules / guarantees:** the subarray must be contiguous and contain at least one element.
- **Watch out for:** all-negative arrays — the answer is the largest single number (e.g. `[-3,-1,-2] → -1`), not `0`.

## The idea 💡 — Kadane's algorithm
The key question at each index: *"what's the best subarray that ends right here?"*

```
   ┌─────────────────────────────────────────────────────────┐
   │ STATE       endHere = best subarray sum ENDING at index i  │
   │ RECURRENCE  endHere = max( nums[i],  endHere + nums[i] )   │
   │                              │            │               │
   │                          start fresh   extend the run     │
   │ ANSWER      max of endHere over all i                     │
   └─────────────────────────────────────────────────────────┘
```

The insight: if your running sum ever drops **below zero**, carrying it forward
can only hurt — so you abandon it and **restart** at the current number.

## 📊 Walk it — `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`
```
 i  num   endHere = max(num, endHere+num)        best
 ─  ───   ─────────────────────────────────      ────
 0  -2    -2                                      -2
 1   1    max( 1,  -2+1=-1) =  1   ← restart       1
 2  -3    max(-3,   1-3=-2) = -2                    1
 3   4    max( 4,  -2+4= 2) =  4   ← restart       4
 4  -1    max(-1,   4-1= 3) =  3                    4
 5   2    max( 2,   3+2= 5) =  5                    5
 6   1    max( 1,   5+1= 6) =  6                    6   ★ [4,-1,2,1]
 7  -5    max(-5,   6-5= 1) =  1                    6
 8   4    max( 4,   1+4= 5) =  5                    6
                                          ANSWER =  6 ✅
```

Notice the two **restarts** (i=1 and i=3): each time the carried sum was negative,
Kadane throws it away and begins anew.

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` — single pass |
| **Space** | `O(1)` — two running values |

> Want the actual subarray, not just the sum? Track the start index whenever you
> "restart", and the end index whenever you update `best`.
