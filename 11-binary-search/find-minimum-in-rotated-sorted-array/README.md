# Find Minimum in Rotated Sorted Array · #153 · Medium

🔗 https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/

## Problem
A sorted, distinct array was rotated. Return its minimum in **O(log n)**.

```
[3,4,5,1,2]       -> 1
[4,5,6,7,0,1,2]   -> 0
[11,13,15,17]     -> 11  (rotated zero times)
```

## 🧐 In plain English
Take an ascending sorted array and "rotate" it: cut it somewhere and move the front part to the back, so `[1,2,3,4,5]` might become `[3,4,5,1,2]`. The array now has two rising runs with a single drop between them, and the smallest value sits right at that drop. Find and return that smallest value, in `O(log n)` time (so no scanning everything).

- **You're given:** a rotated sorted array `nums` with all-distinct values.
- **Return:** the *minimum value* in the array (the number, not its index).
- **Rules / guarantees:** values are distinct; "rotated zero times" is allowed, meaning a normal sorted array whose minimum is just the first element.
- **Watch out for:** don't assume `nums[0]` is the minimum — that's only true when the rotation was zero. The minimum is the one spot where a value is smaller than the element before it.

## 📉 The minimum is the "cliff"
The minimum is the single point where a big value drops to a small one — the spot
where the rotation wrapped around:

```
   value
    7 |        ●
    6 |      ●
    5 |    ●
    4 |  ●                        the CLIFF ↓
       └────────────●──●──●────
                    0  1  2
                    ▲
                 minimum (everything left of it is the "high" run)
```

## The idea 💡
Binary-search toward the cliff by comparing `nums[mid]` with the **right end**
`nums[hi]`:

```
   nums[mid] > nums[hi]                  nums[mid] ≤ nums[hi]
   ┌───────────────────────┐            ┌───────────────────────┐
   │ mid is on the HIGH run │            │ mid..hi is sorted      │
   │ cliff is to the RIGHT  │            │ min is mid OR left     │
   │   → lo = mid + 1       │            │   → hi = mid           │
   └───────────────────────┘            └───────────────────────┘
```

Loop until `lo == hi` — that single surviving index is the minimum.

## 🎬 Frame-by-frame — `[4,5,6,7,0,1,2]`
```
idx:   0  1  2  3  4  5  6
       4  5  6  7  0  1  2

       lo       mid       hi
step1  lo0 mid3(7) hi6(2):  7 > 2  → cliff right  → lo = 4
                                    (discard 4 5 6 7)

       0  1  2
       lo mid hi
step2  lo4 mid5(1) hi6(2):  1 ≤ 2  → min is mid or left → hi = 5

       0  1
       lo·hi
       mid
step3  lo4 mid4(0) hi5(1):  0 ≤ 1  → hi = 4

       lo == hi == 4  →  nums[4] = 0 ✅
```

## Why compare to `nums[hi]`, not `nums[lo]`? 🤔
Against the **right** end, a fully-sorted (un-rotated) array always says "min is
to the left" and converges correctly. Comparing to `nums[lo]` would need an extra
"is this already sorted?" special case.

## Complexity
| | |
|---|---|
| **Time**  | `O(log n)` |
| **Space** | `O(1)` |
