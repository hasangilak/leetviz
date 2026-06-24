# Kth Largest Element in a Stream · #703 · Easy

🔗 https://leetcode.com/problems/kth-largest-element-in-a-stream/

## Problem
Build a class `KthLargest(k, nums)` whose `add(val)` returns the **k-th largest**
element among everything added so far (initial `nums` + later `add`s).

```
KthLargest(3, [4,5,8,2])
add(3)  -> 4      add(5)  -> 5
add(10) -> 5      add(9)  -> 8      add(4) -> 8
```

## 🧐 In plain English
You're building a running scoreboard that, after every new number arrives, can instantly tell you the **k-th largest** value seen so far. "k-th largest" means: line up everything in descending order and take the value at position `k` (e.g. with `k=3`, it's the 3rd-biggest, *not* the maximum).

You implement a class with these operations:
- `KthLargest(k, nums)` — constructor: remember `k` and seed the scoreboard with the starting array `nums`.
- `add(val)` — add a new number to the pool, then return the k-th largest value across *all* numbers added so far (the original `nums` plus every `add` to date).

- **The hard part:** results must stay correct as the pool keeps growing across many `add` calls, and you can't afford to re-sort everything each time. Duplicates count as separate values, and the pool is always guaranteed to hold at least `k` numbers.

## Heap refresher 🌳
A **binary heap** is a complete tree kept in an array where every parent beats
its children by some rule. A **min-heap** keeps the *minimum* at the root.
`push`/`pop` are `O(log n)`, `peek` is `O(1)`.

## The idea 💡 (the counter-intuitive part)
To track the k-th **largest**, keep a **min-heap of size k** holding the k
largest values seen so far.

Why min-heap? The k-th largest value is the *smallest* member of the "top k"
club. A min-heap exposes that smallest member at its root in O(1). Each `add`:

1. push the new value,
2. if the heap now holds more than `k`, pop the root (the smallest of the
   candidates — it can't be the k-th largest),
3. return the root.

We never store more than `k + 1` items, so it's cheap and memory-light.

## Walkthrough — `KthLargest(3, [4,5,8,2])`, then `add(3)`
```
build (keep 3 largest):
  push4 -> [4]
  push5 -> [4,5]
  push8 -> [4,5,8]
  push2 -> size 4 > 3 -> pop min(2) -> [4,5,8]   root=4

add(3): push3 -> size 4 -> pop min(3) -> [4,5,8] root=4  -> returns 4 ✅
```

## Complexity
| | |
|---|---|
| **`add`** | `O(log k)` |
| **Space** | `O(k)` — heap never exceeds k (+1 transiently) |
