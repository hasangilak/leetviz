# Last Stone Weight · #1046 · Easy

🔗 https://leetcode.com/problems/last-stone-weight/

## Problem
Each turn, take the **two heaviest** stones and smash them:
- equal → both shatter.
- unequal → the heavier loses the lighter's weight (`x - y` survives).

Return the last stone's weight, or `0` if none remain.

```
[2,7,4,1,8,1]
 smash 8,7 -> 1     stones: [2,4,1,1,1]
 smash 4,2 -> 2     stones: [2,1,1,1]
 smash 2,1 -> 1     stones: [1,1,1]
 smash 1,1 -> 0     stones: [1]
 -> 1
```

## 🧐 In plain English
You have a bag of stones, each with a weight (a positive integer). Repeatedly grab the **two heaviest** stones and smash them together: if they weigh the same, both are destroyed; if not, the lighter one is destroyed and the heavier one is left with the *difference* in weight. Keep going until one stone (or none) is left.

- **You're given:** an array `stones` of positive integers (their weights).
- **Return:** the weight of the single remaining stone, or `0` if all stones are destroyed.
- **Rules / guarantees:** each smash uses the two currently-largest stones; equal weights cancel out completely; otherwise `heavier - lighter` becomes a new stone back in the bag.
- **Watch out for:** after a smash, the leftover stone re-enters the pool and may itself become one of the next "two heaviest" — so you can't just sort once.

## The idea 💡
The operation always needs the **two largest** current stones. Re-sorting the
array every turn is `O(n² log n)`. A **max-heap** gives the maximum in O(1) and
re-balances in O(log n) after each change — perfect for "repeatedly grab the
biggest."

```
while heap has ≥ 2 stones:
    a = pop max
    b = pop max
    if a != b: push (a - b)
return heap.size==1 ? top : 0
```

> JS has no built-in heap, so the file ships a tiny one. A **max-heap** is just a
> min-heap with the comparator flipped (`a > b` instead of `a < b`).

## Walkthrough
```
heap (max): [8,7,4,2,1,1]
pop 8, pop 7 -> push 1     heap: [4,2,1,1,1]
pop 4, pop 2 -> push 2     heap: [2,1,1,1]
pop 2, pop 1 -> push 1     heap: [1,1,1]
pop 1, pop 1 -> equal, nothing pushed   heap: [1]
size 1 -> return 1 ✅
```

## Complexity
| | |
|---|---|
| **Time**  | `O(n log n)` — ≤ n smashes × O(log n) heap ops (+ O(n) build) |
| **Space** | `O(n)` — the heap |
