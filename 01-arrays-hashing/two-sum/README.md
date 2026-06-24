# Two Sum · #1 · Easy

🔗 https://leetcode.com/problems/two-sum/

## Problem
Given an array `nums` and an integer `target`, return the **indices** of the two
numbers that add up to `target`. Exactly one answer exists; you can't use the
same element twice.

```
nums = [2, 7, 11, 15], target = 9   ->  [0, 1]   (because 2 + 7 = 9)
```

## 🧐 In plain English
You have a list of numbers and one target total. Exactly two numbers in the list add up to that target — find *where* they are and return their two positions (indexes), not the numbers themselves.

- **You're given:** an array `nums` and a number `target`.
- **Return:** the two indices `[i, j]` with `nums[i] + nums[j] == target`.
- **Rules / guarantees:** exactly one valid pair exists; you can't use the same element twice.
- **Watch out for:** the array isn't sorted, and the two indices can be returned in any order.

## The idea 💡
The brute force is to try every pair — `O(n²)`. But notice that for a fixed `x`
the partner you need is fully determined: it's `target - x`. So instead of
*searching* for the partner, **remember everything you've seen** in a hash map
and ask one O(1) question per element: "did the partner already go by?"

This is the canonical "**hash map turns O(n²) search into O(n)**" pattern.

## Walkthrough
`nums = [2, 7, 11, 15]`, `target = 9`

```
i=0  x=2   need 7  → map has {} ............ no  → store 2→0   map={2:0}
i=1  x=7   need 2  → map has {2:0} ......... YES → return [map[2], 1] = [0, 1]
```

We only ever look *backwards* (the map holds elements to the left of `i`), so
the two indices are always distinct.

## Why store value→index (not index→value)?
We search **by value** (`target - x`), so value must be the key for an O(1)
lookup. We return **indices**, so the index is the stored payload.

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` — one pass, O(1) average map operations |
| **Space** | `O(n)` — the map can hold up to `n` entries |

## Edge cases
- Duplicates like `[3, 3]` work because we check the map *before* inserting the
  current element, so the earlier `3` is already stored.
- Negative numbers and zero are fine — arithmetic, not assumptions about sign.
