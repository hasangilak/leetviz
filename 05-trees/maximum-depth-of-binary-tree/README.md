# Maximum Depth of Binary Tree · #104 · Easy

🔗 https://leetcode.com/problems/maximum-depth-of-binary-tree/

## Problem
Return the **maximum depth** — the number of nodes on the longest root-to-leaf
path.

```
    3
   / \
  9  20         -> depth 3   (3 → 20 → 15 or 3 → 20 → 7)
    /  \
   15   7
```

## 🧐 In plain English
A binary tree is built from nodes, each with up to two children. "Depth" here means how many *levels* the tree has: start at the top (the root) and count the nodes as you walk straight down to the deepest leaf. The *maximum* depth is the length of the longest such top-to-bottom path, measured in number of nodes.

- **You're given:** the `root` node of a binary tree (or `null` if it's empty).
- **Return:** a single number — the count of nodes on the longest root-to-leaf path.
- **Rules / guarantees:** an empty tree has depth `0`; a single lone node has depth `1`.
- **Watch out for:** this counts *nodes*, not the edges between them, and you want the deepest branch, not the shortest one.

## The idea 💡
Depth is naturally **recursive**:

```
depth(tree) = 0                                  if tree is empty
            = 1 + max(depth(left), depth(right)) otherwise
```

A node contributes `1` (itself) on top of whichever subtree is taller. This
"solve the children, combine for the parent" shape is the heart of tree DFS.

## Walkthrough
```
depth(15)=1, depth(7)=1
depth(20)=1+max(1,1)=2
depth(9)=1
depth(3)=1+max(depth(9)=1, depth(20)=2)=3  ✅
```

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` — each node visited once |
| **Space** | `O(h)` — recursion stack; `O(log n)` balanced, `O(n)` degenerate |

> BFS alternative: count the number of levels while doing level-order traversal
> — same O(n) time, O(width) space.
