# Product of Array Except Self · #238 · Medium

🔗 https://leetcode.com/problems/product-of-array-except-self/

## Problem
Return `answer` where `answer[i]` is the product of every element **except**
`nums[i]`. Constraints: **O(n)** time and **no division**.

```
nums = [1, 2, 3, 4]  ->  [24, 12, 8, 6]
```

## 🧐 In plain English
For each position in the array, multiply together *all the other* numbers — every number except the one sitting at that position — and put that running total in the matching slot of a new array. For position 0 in `[1,2,3,4]` that's `2×3×4 = 24`; for position 1 it's `1×3×4 = 12`, and so on.

- **You're given:** an array `nums` of integers.
- **Return:** an array `answer` of the same length, where `answer[i]` is the product of every element except `nums[i]`.
- **Rules / guarantees:** must run in `O(n)` time and you're **not allowed to use division**; values can be negative or zero, and the products are guaranteed to fit in a 32-bit integer.
- **Watch out for:** the obvious "multiply everything, then divide by `nums[i]`" trick is banned and breaks on zeros anyway.

## Why not just divide?
`answer[i] = total_product / nums[i]` is tempting but banned — and it breaks on
zeros anyway (division by zero, and a single zero makes every other slot zero).

## The idea 💡
Split the product around index `i`:

```
answer[i] = (product of items LEFT of i)  ×  (product of items RIGHT of i)
            └────── prefix[i] ──────┘       └────── suffix[i] ──────┘
```

Build both with running accumulators. Reuse the output array for the prefix
pass, then fold the suffix in during a backward pass — so we use **O(1) extra
space** (the answer array itself is not counted).

## Walkthrough
`nums = [1, 2, 3, 4]`

**Pass 1 — prefix (left products):**
```
i:        0    1    2    3
nums:     1    2    3    4
answer:   1    1    2    6     (answer[i] = product of everything before i)
prefix→   1 →  2 →  6 → 24
```

**Pass 2 — suffix (right products), going backward:**
```
i:        3    2    1    0
suffix:   1    4   12   24
answer:   6×1  2×4  1×12 1×24
        =  6    8   12   24
```

Final: `[24, 12, 8, 6]`.

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` — two passes |
| **Space** | `O(1)` extra — only the output array + two scalars |
