# Rotting Oranges · #994 · Medium · *Multi-source BFS*

🔗 https://leetcode.com/problems/rotting-oranges/

## Problem
Grid: `0` empty, `1` fresh, `2` rotten. Each minute, rot spreads from every
rotten orange to its 4-neighbour fresh oranges. Minutes until none are fresh, or
`-1` if impossible.

```
2 1 1            2 1 1
1 1 0  -> 4      0 1 1  -> -1   (bottom-left orange is walled off, never rots)
0 1 1            1 0 1
```

## 🧐 In plain English
You have a grid where each cell is empty (`0`), holds a fresh orange (`1`), or holds a rotten orange (`2`). Every minute, each rotten orange rots its fresh up/down/left/right neighbours (its **4-directionally adjacent** cells). Find the number of minutes until no fresh orange is left. If some fresh orange can never be reached, return `-1`.

- **You're given:** a grid `grid: number[][]` where each cell is `0`, `1`, or `2`.
- **Return:** the minimum minutes until zero fresh oranges remain, or `-1` if that's impossible.
- **Rules / guarantees:** rot only spreads to adjacent fresh cells (not diagonally, not through empty cells), and all rotten oranges spread at the same time each minute.
- **Watch out for:** if there are no fresh oranges to begin with, the answer is `0`; a fresh orange fenced off from every rotten one makes the answer `-1`.

## The idea 💡 — all sources spread at once
Rot expands **one ring per minute from every rotten orange simultaneously**.
"All sources at once, level by level" is the signature of **multi-source BFS**:

```
   ① seed the queue with EVERY initially-rotten cell, and COUNT fresh oranges
   ② process the queue one LAYER at a time — each full layer = one minute
   ③ each layer rots its fresh neighbours (they become next layer); fresh--
   ④ end:  fresh == 0 → minutes elapsed   |   fresh > 0 → -1 (unreachable)
```

> Seeding *all* rotten cells up front is the trick — a separate BFS from each
> source would be slower and harder to time.

## 🎬 Minute-by-minute — first grid
`2`=rotten  `1`=fresh  `0`=empty.  Newly-rotted cells shown as `▣`.

```
 minute 0          minute 1          minute 2          minute 3          minute 4
 2 1 1             2 ▣ 1             2 2 ▣             2 2 2             2 2 2
 1 1 0             ▣ 1 0             2 ▣ 0             2 2 0             2 2 0
 0 1 1             0 1 1             0 1 1             0 ▣ 1             0 2 ▣
 fresh=6           fresh=4           fresh=2           fresh=1           fresh=0 ✅

 frontier:         rots (0,1)        rots (0,2)        rots (2,1)        rots (2,2)
 {(0,0)}           & (1,0)           & (1,1)                            → 4 minutes
```

## ❌ Why the second grid returns −1
```
 2 1 1
 0 1 1            the orange at (2,0) has only empty/rotten-unreachable
 1 0 1            neighbours → BFS can never reach it → fresh stays > 0 → -1
 ▲
 (2,0) isolated
```

## Complexity
| | |
|---|---|
| **Time**  | `O(rows · cols)` — each cell enqueued at most once |
| **Space** | `O(rows · cols)` — the BFS queue |

> Edge case: if there are **no fresh oranges at the start**, the answer is `0`.
