# Number of Islands · #200 · Medium

🔗 https://leetcode.com/problems/number-of-islands/

## Problem
Count islands in a grid of `'1'` (land) / `'0'` (water). An island is land cells
connected **up/down/left/right** (not diagonally).

```
1 1 1 1 0
1 1 0 1 0      -> 1 island (all the 1s are connected)
1 1 0 0 0
0 0 0 0 0

1 1 0 0 0
1 1 0 0 0      -> 3 islands
0 0 1 0 0
0 0 0 1 1
```

## 🧐 In plain English
You get a rectangular map made of the characters `'1'` (land) and `'0'` (water). A piece of land touches another piece of land only when they sit directly next to each other up, down, left, or right (called **4-directionally adjacent** — diagonals don't count). A blob of land cells all linked this way is one "island" (a **connected component**). Count how many separate islands there are.

- **You're given:** a 2-D grid `grid: string[][]` where each cell is `'1'` or `'0'`.
- **Return:** a number — how many distinct islands exist.
- **Rules / guarantees:** only up/down/left/right connect cells; diagonal touches do NOT merge land into one island.
- **Watch out for:** an empty grid means `0`, and one big sprawling island still counts as just `1`, no matter how many `'1'` cells it has.

## The idea 💡
The grid is a **graph in disguise**: each land cell is a node, with edges to its
4 land neighbours. Counting islands = counting **connected components**.

Algorithm:
1. Scan every cell.
2. When you find land that hasn't been visited, you've discovered a new island →
   `count++`.
3. **Flood-fill** that whole island (DFS/BFS through connected land), marking
   cells visited so they're never counted again. Here we "sink" land to `'0'`.

The marking step is the crux: without it, every cell of one island would start
its own count.

## Walkthrough (the 3-island grid)
```
scan row by row...
(0,0)='1' -> island #1, sink the top-left 2×2 block
... skip the now-'0' cells ...
(2,2)='1' -> island #2, sink it
(3,3)='1' -> island #3, sink it & (3,4)
total = 3 ✅
```

## DFS vs BFS
Both work and are `O(rows·cols)`. DFS (used here) is shortest to write via
recursion; BFS with an explicit queue avoids deep recursion on huge grids
(safer against stack overflow).

## Complexity
| | |
|---|---|
| **Time**  | `O(rows · cols)` — each cell visited O(1) times |
| **Space** | `O(rows · cols)` — recursion/queue worst case (all land) |

> Note: this sinks the input grid. If the caller needs it intact, use a separate
> `visited` boolean matrix instead of mutating.
