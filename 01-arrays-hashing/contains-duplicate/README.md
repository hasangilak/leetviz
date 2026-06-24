# Contains Duplicate · #217 · Easy

🔗 https://leetcode.com/problems/contains-duplicate/

## Problem
Return `true` if any value appears **at least twice**, otherwise `false`.

```
[1, 2, 3, 1] -> true
[1, 2, 3, 4] -> false
```

## 🧐 In plain English
You're handed a list of numbers and asked a simple yes/no question: does the same value show up more than once anywhere in the list? If even a single number repeats, the answer is "yes"; if every number is unique, the answer is "no".

- **You're given:** an array `nums` of integers.
- **Return:** a boolean — `true` if any value appears two or more times, `false` if all values are distinct.
- **Rules / guarantees:** the repeated values don't need to be next to each other; one repeat anywhere is enough.
- **Watch out for:** order doesn't matter, and the duplicates can be far apart — you must check the whole list, not just neighbors.

## The idea 💡
A **set** stores only distinct values. Stream the numbers through it; if you ever
meet a value that's already inside, you've found your duplicate and can stop
early.

Compare the options:

| Approach | Time | Space | Note |
|----------|------|-------|------|
| Brute force (compare all pairs) | `O(n²)` | `O(1)` | too slow |
| Sort, then check neighbours | `O(n log n)` | `O(1)`* | mutates / copies input |
| **Hash set (this one)** | **`O(n)`** | `O(n)` | fastest; early exit |

\*`O(1)` extra only if you're allowed to sort in place.

## Walkthrough
```
[1, 2, 3, 1]
 1 → set {1}
 2 → set {1,2}
 3 → set {1,2,3}
 1 → already in set ✋  → return true
```

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` — single pass with O(1) average set ops |
| **Space** | `O(n)` — worst case (all distinct) stores every element |
