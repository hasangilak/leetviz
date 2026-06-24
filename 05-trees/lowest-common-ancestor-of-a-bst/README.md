# Lowest Common Ancestor of a BST · #235 · Medium

🔗 https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/

## Problem
Given a BST and two nodes `p`, `q`, return their **lowest common ancestor** — the
deepest node that has both as descendants (a node can be its own ancestor).

```
        6
      /   \
     2     8
    / \   / \
   0   4 7   9
      / \
     3   5

LCA(2, 8) = 6     LCA(2, 4) = 2     LCA(3, 5) = 4
```

## 🧐 In plain English
An *ancestor* of a node is any node you pass through on the way down from the root to it. The **lowest common ancestor (LCA)** of two nodes `p` and `q` is the deepest node that has *both* of them somewhere below it (and a node counts as its own ancestor). Here the tree is a **BST** — smaller values go left, larger go right — and you use that ordering to find the LCA quickly. Intuitively, the LCA is the exact point where the paths down to `p` and to `q` first split apart.

- **You're given:** the `root` of a BST and two nodes `p` and `q` that are guaranteed to exist in it.
- **Return:** the node that is the lowest common ancestor of `p` and `q`.
- **Rules / guarantees:** all values are unique; both `p` and `q` are present in the tree.
- **Watch out for:** "lowest" means deepest in the tree (furthest from the root), and a node *can* be the ancestor of itself — e.g. if `q` sits directly below `p`, then `p` is the answer.

## The idea 💡
In a **plain** binary tree, finding the LCA needs a real search. In a **BST**,
the ordering hands you the answer — just walk down from the root and compare:

- Both `p` and `q` **greater** than the current node → LCA is in the **right**
  subtree.
- Both **smaller** → LCA is in the **left** subtree.
- They **split** here (one ≤ node ≤ other, or one equals the node) → this node is
  the LCA. It's the first (highest) node where the paths to `p` and `q` diverge.

## Walkthrough — LCA(3, 5)
```
node 6: 3<6 and 5<6  -> go left
node 2: 3>2 and 5>2  -> go right
node 4: 3<4 and 5>4  -> split!  -> LCA = 4 ✅
```

## Walkthrough — LCA(2, 8)
```
node 6: 2<6 but 8>6  -> split immediately -> LCA = 6 ✅
```

## Complexity
| | |
|---|---|
| **Time**  | `O(h)` — single descent; `O(log n)` balanced, `O(n)` worst |
| **Space** | `O(1)` — iterative (no recursion stack) |

> The general-tree version (#236) can't use ordering and instead recurses,
> returning a node when `p` and `q` are found in different subtrees — `O(n)`.
