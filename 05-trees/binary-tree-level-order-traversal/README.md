# Binary Tree Level Order Traversal · #102 · Medium · *BFS*

🔗 https://leetcode.com/problems/binary-tree-level-order-traversal/

## Problem
Return values grouped **by level**, top→bottom, left→right.

```
    3
   / \
  9  20          -> [[3], [9, 20], [15, 7]]
    /  \
   15   7
```

## 🧐 In plain English
Picture the tree in rows: the root is row 0, its children are row 1, their children are row 2, and so on. "Level order" means reading the tree row by row from top to bottom, and within each row from left to right (this is also called a *breadth-first* walk). You collect each row into its own list.

- **You're given:** the `root` node of a binary tree (or `null` if it's empty).
- **Return:** a list of lists — one inner list per level, holding that level's node values left-to-right (e.g. `[[3], [9, 20], [15, 7]]`).
- **Rules / guarantees:** an empty tree returns an empty list `[]`.
- **Watch out for:** keep each level separate — don't flatten everything into one big list, and preserve the left-to-right order within each level.

## The idea 💡
**Breadth-First Search** naturally walks a tree level by level using a queue.
The only addition is *grouping*: process the queue **one whole level at a time**.

Snapshot the current frontier (all nodes at this depth), record their values,
then build the next frontier from their children. Repeat until empty.

```
frontier = [root]
while frontier not empty:
    record values of frontier         // this is one level
    frontier = all children of frontier
```

## Walkthrough
```
frontier [3]        -> record [3]        children -> [9, 20]
frontier [9, 20]    -> record [9, 20]    children -> [15, 7]
frontier [15, 7]    -> record [15, 7]    children -> []
frontier []         -> stop

result = [[3], [9, 20], [15, 7]]
```

## DFS alternative
You *can* do this with DFS by passing a `depth` parameter and appending to
`result[depth]`. BFS is the more natural fit and the standard answer.

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` — each node handled once |
| **Space** | `O(n)` — output + the widest level in the queue (up to ~n/2 nodes) |

> Note: using `Array.shift()` as a queue is O(n) per call (O(n²) total). The
> "swap the whole frontier" style here avoids that and stays O(n).
