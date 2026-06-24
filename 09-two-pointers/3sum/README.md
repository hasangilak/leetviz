# 3Sum · #15 · Medium

🔗 https://leetcode.com/problems/3sum/

## Problem
Find **all unique triplets** that sum to zero.

```
[-1, 0, 1, 2, -1, -4]  ->  [[-1, -1, 2], [-1, 0, 1]]
```

## 🧐 In plain English
You have a list of numbers. A **triplet** is just any group of three of them. Find every group of three whose values add up to `0`, and return the *numbers themselves* (not their positions). "Unique" means don't list the same trio of values twice — e.g. `[-1, 0, 1]` should appear only once even if there are several ways to pick it.

- **You're given:** an array `nums` of integers (can include negatives, zeros, and duplicates).
- **Return:** a list of triplets `[a, b, c]` where `a + b + c == 0`, with no duplicate triplets.
- **Rules / guarantees:** the three picks must be at *different* positions; the order of the triplets (and of numbers inside a triplet) doesn't matter.
- **Watch out for:** "unique" is by *value*, not by position — duplicate input numbers can otherwise produce the same triplet many times.

## The idea 💡
Brute force is three nested loops, `O(n³)`. The unlock is **sort first**, then
reduce 3Sum to many *2Sum-on-a-sorted-array* problems:

1. **Sort** the array.
2. **Fix** each `nums[i]` as an anchor. You now need two more numbers summing to
   `-nums[i]`.
3. **Two pointers** `lo`/`hi` close in from both ends. Sorted order tells you
   which way to move:

```
        sum too SMALL                     sum too BIG
   ┌───────────────────────┐       ┌───────────────────────┐
   │  need a bigger number  │       │  need a smaller number │
   │  → move lo RIGHT  ▶     │       │      ◀ move hi LEFT     │
   └───────────────────────┘       └───────────────────────┘
                       exact match → record, then move BOTH inward
```

## 🎬 Frame-by-frame — `[-4, -1, -1, 0, 1, 2]` (sorted)

```
index:    0    1    2    3    4    5
value:  -4   -1   -1    0    1    2
```

**Anchor `i = 0` (value −4)** → need `lo + hi = 4`
```
  -4   -1   -1    0    1    2
   i    lo                  hi      (-4)+(-1)+(2) = -3  < 0  ▶ lo++
   i         lo             hi      (-4)+(-1)+(2) = -3  < 0  ▶ lo++
   i              lo        hi      (-4)+( 0)+(2) = -2  < 0  ▶ lo++
   i                   lo   hi      (-4)+( 1)+(2) = -1  < 0  ▶ lo++  → lo==hi, stop
   no triplet with -4
```

**Anchor `i = 1` (value −1)** → need `lo + hi = 1`
```
  -1   -1    0    1    2
   i   lo              hi    (-1)+(-1)+(2) = 0  ✅  record [-1,-1,2]
                             move both inward ↓
   i        lo    hi         (-1)+( 0)+(1) = 0  ✅  record [-1, 0,1]
                             move both inward ↓  → lo==hi, stop
```

**Anchor `i = 2` (value −1)** → duplicate of previous anchor → **skip** ⏭️
**Anchor `i = 3` (value 0)** → need `0` from `[1,2]` → `0+1+2=3 > 0` → none

```
RESULT = [[-1, -1, 2], [-1, 0, 1]] ✅
```

## Killing duplicates without a hash set 🚫
Sorting groups equal values together, so duplicates are O(1) to skip:

```
anchors:  -4  [-1] [-1]  0   1   2
                ▲    ▲
                └────┴── second -1 == first -1  →  skip the anchor

after a hit:  ... 0  1 [1] [1] 2 ...   →  while nums[lo]==nums[lo-1] lo++
```

Two early exits help: once `nums[i] > 0`, every remaining number is positive — no
zero-sum possible — so **break**.

## Complexity
| | |
|---|---|
| **Time**  | `O(n²)` — `n` anchors × `O(n)` two-pointer sweep (sort: `O(n log n)`) |
| **Space** | `O(1)` extra beyond the output (sort may use `O(log n)` stack) |

> Same blueprint scales: **4Sum** = fix two anchors, two-pointer the rest → `O(n³)`.
