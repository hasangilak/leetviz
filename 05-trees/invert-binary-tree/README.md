# Invert Binary Tree · #226 · Easy

🔗 https://leetcode.com/problems/invert-binary-tree/

## Problem
Mirror a binary tree — swap the left and right child of **every** node.

```
     4                  4
   /   \              /   \
  2     7    ->      7     2
 / \   / \          / \   / \
1   3 6   9        9   6 3   1
```

## 🧐 In plain English
A binary tree is a structure where each node has at most two children, a *left* one and a *right* one. "Inverting" (or mirroring) the tree means flipping it horizontally: at every single node, the left child and right child trade places. Do this for all nodes and you get the mirror image of the original tree.

- **You're given:** the `root` node of a binary tree (or `null` if it's empty).
- **Return:** the `root` of the same tree with every node's left and right children swapped.
- **Rules / guarantees:** an empty tree (`null` root) is valid — just return it as is.
- **Watch out for:** it's not enough to swap only the root's two children; you must swap at *every* level, all the way down.

## The idea 💡
"Invert" just means **swap children, recursively**. The structure is
self-similar, so the recursion mirrors the tree:

```
invert(node):
  if node is null: return null
  invert its left subtree
  invert its right subtree
  swap node.left and node.right
```

Whether you swap first then recurse, or recurse then swap, doesn't matter — every
node gets its children flipped exactly once.

## Walkthrough
```
at 2: swap(1,3)  -> 2 has left=3, right=1
at 7: swap(6,9)  -> 7 has left=9, right=6
at 4: swap(2,7)  -> 4 has left=7, right=2
```

## Fun fact 🐦
This is the problem behind the famous tweet: *"Google: 90% of our engineers use
the software you wrote (Homebrew), but you can't invert a binary tree on a
whiteboard, so f*** off."* It's genuinely a 4-line function.

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` — every node visited once |
| **Space** | `O(h)` — recursion stack; `O(log n)` balanced, `O(n)` worst (a "stick") |

> BFS/iterative variant: push the root on a queue/stack, swap children, enqueue
> them — same O(n) time, explicit O(n) space.
