# Unique Paths · #62 · Medium · *Grid DP*

🔗 https://leetcode.com/problems/unique-paths/

## Problem
A robot starts top-left of an `m × n` grid and wants the bottom-right, moving
only **right** or **down**. How many distinct paths exist?

```
m=3, n=7 -> 28
m=3, n=2 -> 3
```

## 🧐 In plain English
Picture a grid of cells. A robot sits in the top-left corner and must reach the
bottom-right corner. At every step it can move only one cell **right** or one cell
**down** — never left, up, or diagonally. Count how many different routes get it
there.

- **You're given:** two integers `m` (rows) and `n` (columns).
- **Return:** the number of distinct right/down paths from top-left to bottom-right.
- **Rules / guarantees:** moves are limited to right and down; the grid is at least 1×1.
- **Watch out for:** it's the count of *paths*, not steps — every path has the same length (`m-1` downs + `n-1` rights), but they differ in the **order** of those moves.

## The idea 💡 — each cell sums its two "entrances"
You can only enter a cell from **above** or from the **left**, so the number of
ways to reach it is the sum of the ways to reach those two neighbours.

```
   ┌────────────────────────────────────────────────────┐
   │ STATE       paths(i,j) = ways to reach cell (i,j)     │
   │ RECURRENCE  paths(i,j) = paths(i-1,j) + paths(i,j-1)  │
   │                          └ from above ┘ └ from left ┘ │
   │ BASE        first row & first column = 1              │
   └────────────────────────────────────────────────────┘
```

The top row and left column are all `1`: there's a single straight shot to each
(all rights, or all downs).

## 📊 Fill the grid — `m = 3, n = 7`
Each cell = the cell above **+** the cell to its left:

```
        →  →  →  →  →  →  →
      ┌──────────────────────────────┐
   ↓  │ 1   1   1   1   1   1   1     │  ← base row (one way each)
   ↓  │ 1   2   3   4   5   6   7     │  e.g. 3 = 2(left) + 1(above)
   ↓  │ 1   3   6  10  15  21  28 ★   │  28 = 21(left) + 7(above)
      └──────────────────────────────┘
                              ↑ answer
```

Each number is literally the sum of its top and left neighbours — the grid grows
into [Pascal's triangle](https://en.wikipedia.org/wiki/Pascal%27s_triangle) laid
on its side.

## 🗜️ Why one row of memory is enough
We sweep left-to-right, top-to-bottom. When we reach `dp[j]`, it **still holds the
old value** (the cell above) and `dp[j-1]` is the freshly-updated cell to the
left. So `dp[j] += dp[j-1]` does it all in a single `O(n)` array.

## Complexity
| | |
|---|---|
| **Time**  | `O(m · n)` — fill every cell once |
| **Space** | `O(n)` — one rolling row (naive 2-D table is `O(m·n)`) |

> Pure math shortcut: the answer is the binomial `C(m+n-2, m-1)` — choose which of
> the total moves are "downs".
