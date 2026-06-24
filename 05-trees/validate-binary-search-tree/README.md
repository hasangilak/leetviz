# Validate Binary Search Tree · #98 · Medium

🔗 https://leetcode.com/problems/validate-binary-search-tree/

## Problem
Is the tree a valid **BST**? For every node: the *entire* left subtree is
strictly smaller, the *entire* right subtree is strictly larger.

```
   2            5
  / \          / \
 1   3   ✅   1   4     ❌  (3 < 5 but sits in 5's right subtree)
                 / \
                3   6
```

## 🧐 In plain English
A **Binary Search Tree (BST)** is a binary tree with an ordering rule: for any node, *everything* in its left subtree must be smaller than it, and *everything* in its right subtree must be larger. Your job is to check whether a given tree actually obeys this rule everywhere — not just between a node and its immediate children, but across the whole subtree below it.

- **You're given:** the `root` node of a binary tree.
- **Return:** a boolean — `true` if it's a valid BST, `false` otherwise.
- **Rules / guarantees:** the ordering is *strict* (no duplicates equal to an ancestor); an empty tree counts as valid.
- **Watch out for:** the rule applies to the *entire* left/right subtree, not just direct children — a node can be larger than its parent yet still break the rule because of a more distant ancestor.

## The classic trap 🪤
Only comparing a node to its **direct children** is wrong. In the bad example,
`3 < 4` (its parent) looks fine locally — but `3` is in `5`'s right subtree, so
it must be `> 5`. The BST rule is **global**.

## The idea 💡
Pass each node the open interval `(low, high)` it's allowed to occupy:

- Start the root with `(-∞, +∞)`.
- Recurse **left** → values must be smaller, so tighten the ceiling:
  `(low, node.val)`.
- Recurse **right** → values must be larger, so tighten the floor:
  `(node.val, high)`.

If any node falls outside its interval, it's not a BST.

## Walkthrough (the ❌ tree)
```
5  in (-∞, +∞)                      ok
├─L 1 in (-∞, 5)                    ok
└─R 4 in (5, +∞)                    ok
    ├─L 3 in (5, 4)  -> 3 ≤ 5  ✋   FAIL  (lower bound 5 inherited from root)
```

The inherited bound `low = 5` is what catches the violation a local check would
miss.

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` — visit each node once |
| **Space** | `O(h)` — recursion stack |

> Alternative: an **in-order traversal** of a BST yields strictly increasing
> values. Walk in-order and verify each value is greater than the previous one.
