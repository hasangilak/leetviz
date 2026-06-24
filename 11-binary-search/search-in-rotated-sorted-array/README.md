# Search in Rotated Sorted Array · #33 · Medium

🔗 https://leetcode.com/problems/search-in-rotated-sorted-array/

## Problem
A sorted array was rotated at an unknown pivot. Find `target` in **O(log n)**.

```
[4,5,6,7,0,1,2], target 0  ->  4
[4,5,6,7,0,1,2], target 3  -> -1
```

## 🧐 In plain English
Start with an array sorted in ascending order, then "rotate" it: chop it at some hidden point and move the front chunk to the back. So `[0,1,2,4,5,6,7]` becomes something like `[4,5,6,7,0,1,2]` — still two ascending runs, but with one "wrap-around" drop in the middle. You're given this rotated array and a `target` value; find the target's index. The catch is you must do it in `O(log n)` time (binary-search speed), so you can't just scan every element.

- **You're given:** a rotated sorted array `nums` (distinct values) and a `target`.
- **Return:** the index of `target`, or `-1` if it isn't present.
- **Rules / guarantees:** values are distinct; the array was originally sorted ascending and rotated some unknown number of times (possibly zero).
- **Watch out for:** the array isn't fully sorted, so a plain binary search breaks — at each midpoint you must first figure out which half is still in order.

## 🔄 What "rotated" looks like
```
   sorted:   0 1 2 4 5 6 7
                       │ rotate left by 4
                       ▼
   rotated:  4 5 6 7 │ 0 1 2
             └──────┘ └─────┘
             rising    rising      ← two sorted runs with ONE cliff between them
```

## The idea 💡
We still want binary search, but the array isn't globally sorted. The saving
grace: **when you cut at `mid`, at least one half is always still sorted.**

```
            lo            mid            hi
   [ . . . . . . . . . . . | . . . . . . . . ]
     └─ is THIS half sorted? ─┘
       nums[lo] ≤ nums[mid]  → left half is clean
       else                  → right half is clean
```

Each step: identify the sorted half, check if `target` lies **within its value
range**. If yes → search it; if no → search the other half. Either way we throw
away half the array.

## 🎬 Frame-by-frame — find `0` in `[4,5,6,7,0,1,2]`
`S` marks the half that's sorted; `✓` marks the half we keep.

```
idx:   0  4  5  6        7        0  1  2
       4  5  6  7        0        1  2          target = 0
       lo       └─ mid ─┘                 hi

step1  lo=0 mid=3(7) hi=6
       left [4,5,6,7] sorted (4 ≤ 7) ─ S
       is 0 in [4 .. 7)?  NO  → discard left, go right ✓
                                                lo = 4

       0  1  2
       lo └mid┘ hi
step2  lo=4 mid=5(1) hi=6
       left [0,1] sorted (0 ≤ 1) ─ S
       is 0 in [0 .. 1)?  YES → keep left ✓
                                hi = 4

       0
       ▲
step3  lo=hi=mid=4(0) == target  →  return 4 ✅
```

## 🔑 The pivotal comparison
`nums[lo] <= nums[mid]` ⇒ the left side has no "cliff", i.e. it's sorted. The `=`
matters for tiny windows (when `lo == mid`).

## Complexity
| | |
|---|---|
| **Time**  | `O(log n)` — discard half each step |
| **Space** | `O(1)` |

> Variant **#81** allows duplicates, which can blur the "which half is sorted"
> test (`nums[lo] == nums[mid]`) and degrade to `O(n)` worst case.
