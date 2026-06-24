# Climbing Stairs · #70 · Easy · *DP intro*

🔗 https://leetcode.com/problems/climbing-stairs/

## Problem
You're climbing a staircase with `n` steps. Each move is **1 or 2** steps. How
many distinct ways can you reach the top?

```
n = 2 -> 2     (1+1, 2)
n = 3 -> 3     (1+1+1, 1+2, 2+1)
```

## 🧐 In plain English
You start at the ground and want to reach step `n`. Every move you may go up
either 1 step or 2 steps. Count how many different *sequences* of moves land you
exactly on the top — `[1,2]` and `[2,1]` are different ways.

- **You're given:** a single integer `n` (the number of steps).
- **Return:** the number of distinct ways to climb to the top.
- **Rules / guarantees:** each move is exactly 1 or 2 steps; `n ≥ 1`.
- **Watch out for:** order matters (`1+2 ≠ 2+1`), so this counts *sequences*, not just how many 1s and 2s.

## The idea 💡 — your first DP
**Dynamic programming** = break a problem into smaller overlapping subproblems,
solve each **once**, and reuse the answers. Three things define any DP:

```
   ┌───────────────────────────────────────────────────────────┐
   │ STATE       ways(i) = # of ways to reach step i             │
   │ RECURRENCE  the last hop was +1 (from i-1) or +2 (from i-2) │
   │             → ways(i) = ways(i-1) + ways(i-2)               │
   │ BASE CASE   ways(0) = 1   ways(1) = 1                       │
   └───────────────────────────────────────────────────────────┘
```

That recurrence is **Fibonacci**! Each step's answer is the sum of the previous
two.

## 📊 Build the table — `n = 5`
```
   step:   0    1    2    3    4    5
   ways:   1    1    2    3    5    8
                 ╲__╱ ╲__╱ ╲__╱ ╲__╱
                  each = sum of the two before it

   ways(2) = ways(1)+ways(0) = 1+1 = 2
   ways(3) = ways(2)+ways(1) = 2+1 = 3
   ways(4) = ways(3)+ways(2) = 3+2 = 5
   ways(5) = ways(4)+ways(3) = 5+3 = 8   ✅
```

## 🗜️ Space optimization
The table only ever looks **two cells back**, so we don't need the whole array —
just slide two variables forward:

```
   twoBack  oneBack
     1        1      → current = 2 ; shift →
              1        2          → current = 3 ; shift →
                       2          3   ...
```
That drops space from `O(n)` to `O(1)`.

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` — one pass building each step once |
| **Space** | `O(1)` — two rolling variables (or `O(n)` if you keep the full table) |

> This "state → recurrence → base case → fill the table" recipe is **every** DP
> problem. The rest of this section just changes what the state means.
