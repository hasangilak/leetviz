# Word Search · #79 · Medium

🔗 https://leetcode.com/problems/word-search/

## Problem
Is `word` formable by a path of **adjacent** cells (up/down/left/right), with each
cell used **at most once**?

```
A B C E
S F C S      "ABCCED" -> true     "SEE" -> true     "ABCB" -> false
A D E E      (ABCB fails: the single B can't be reused)
```

## 🧐 In plain English
You have a grid of letters and a target `word`. Can you trace the word by hopping from cell to cell, where each step moves only **up, down, left, or right** (no diagonals), and you never step on the same cell twice in a single trace? **Adjacent** means sharing an edge. Return true if such a path spells the word, false otherwise.

- **You're given:** a 2-D grid `board` of single characters and a string `word`.
- **Return:** `true` if the word can be traced through adjacent cells, else `false`.
- **Rules / guarantees:** consecutive letters must be in horizontally or vertically neighbouring cells; each grid cell may be used **at most once** per path.
- **Watch out for:** the path can twist and turn freely, but it can't revisit a cell — so a single `B` cell can't serve two `B`s in the word.

## The idea 💡
From each cell, run a **DFS** that matches the word one letter at a time, stepping
to neighbours. This is backtracking on a grid:

```
   ┌─────────────────────────────────────────────┐
   │ 1. cell matches word[i]?  no → fail           │
   │ 2. MARK cell visited  (overwrite with '#')    │  ← so the path can't loop back
   │ 3. recurse into 4 neighbours for word[i+1]    │
   │ 4. RESTORE cell        (undo the mark)         │  ← other paths may reuse it
   └─────────────────────────────────────────────┘
        steps 2 & 4 = the backtracking heartbeat
```

## 🗺️ Tracing `"ABCCED"` — a successful path
Numbers show the order cells are visited; `#` = currently on the path.

```
   A  B  C  E          A→B→C→C→E→D snakes through the grid:
   S  F  C  S
   A  D  E  E
                       ①  ②  ③  .            A(0,0) B(0,1) C(0,2)
   step:               .  .  ④  .            then DOWN to C(1,2)
                       .  ⑥  ⑤  .            then DOWN to E(2,2), LEFT to D(2,1)

   path: A(0,0)→B(0,1)→C(0,2)→C(1,2)→E(2,2)→D(2,1)   all 6 matched → true ✅
```

## ❌ Tracing `"ABCB"` — why it fails
```
   A→B→C  ...next needs 'B'
   A [B] C E        from C(0,2), neighbours are E(0,3), C(1,2), B(0,1)
   S  F  C S        B(0,1) IS a 'B' — but it's already '#' on this path!
   A  D  E E        every other branch is a dead end → false ✅

   (the in-path mark is exactly what forbids reusing that single B)
```

## 🎬 Mark / restore on one cell
```
   board[r][c] = 'A'
   board[r][c] = '#'        ← mark before recursing
       ...explore neighbours...
   board[r][c] = 'A'        ← restore after; board ends unchanged
```

## Complexity
Let `L = word.length`, grid `m × n`:

| | |
|---|---|
| **Time**  | `O(m · n · 4ᴸ)` — start from each cell, ≤ 4 branches per step |
| **Space** | `O(L)` — recursion depth (visited marking is in-place) |

> Searching for **many** words at once (**#212**) pairs this DFS with a **trie** so
> all words are matched in a single grid traversal.
