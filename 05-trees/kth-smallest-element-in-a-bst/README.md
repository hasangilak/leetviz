# Kth Smallest Element in a BST · #230 · Medium

🔗 https://leetcode.com/problems/kth-smallest-element-in-a-bst/

## Problem
Return the `k`-th smallest value (1-indexed) in a BST.

```
      5
     / \
    3   6        k = 3  ->  3
   / \
  2   4
 /
1
```

## 🧐 In plain English
A **Binary Search Tree (BST)** stores values so that, for every node, smaller values sit to its left and larger ones to its right. That ordering means the tree secretly holds its values in sorted order. The task: imagine listing every value from smallest to largest, then pick the `k`-th one (counting from 1, so `k = 1` is the smallest).

- **You're given:** the `root` of a BST and an integer `k`.
- **Return:** the value of the `k`-th smallest node (1-indexed).
- **Rules / guarantees:** `k` is always valid (`1 ≤ k ≤` number of nodes), so the answer always exists.
- **Watch out for:** `k` counts from 1, not 0 — and "smallest" follows the BST sort order, which is *not* the same as the order nodes appear top-to-bottom in the diagram.

## 🔑 The one fact you need
**In-order traversal of a BST (`left → node → right`) emits values in sorted
order.** So the answer is simply the **k-th node visited in-order**.

```
        5
       / \              in-order walk:
      3   6             1 → 2 → 3 → 4 → 5 → 6
     / \                ▲     ▲
    2   4               1st   3rd  ← the k-th visited node is the k-th smallest
   /
  1
```

## The idea 💡 — iterative in-order, stop at k
Use an explicit **stack** so we can **bail out early** at the k-th node (a plain
recursion would walk the whole tree):

```
   ① dive LEFT as far as possible, pushing each node
   ② pop  → that's the next-smallest;  k--
   ③ if k == 0 → answer
   ④ else step into its RIGHT subtree, repeat
```

## 🎬 Frame-by-frame — k = 3
```
action            stack (top → )     popped  k
────────────────  ─────────────────  ──────  ──
dive left 5,3,2,1 [5, 3, 2, 1]               3
pop 1             [5, 3, 2]          1       2   right? none
pop 2             [5, 3]             2        1   right? none
pop 3             [5]                3        0   → return 3 ✅
                                                  (never visits 4, 5, 6!)
```

Visually, we only descended the left spine and popped three nodes:

```
      5            stack grows down the left spine: 5 → 3 → 2 → 1
     /             then pops back up: 1, 2, 3 ... stop at the 3rd ✅
    3
   / \
  2   4   ← never touched
 /
1
```

## Complexity
| | |
|---|---|
| **Time**  | `O(h + k)` — `O(h)` to reach the smallest, then `k` pops |
| **Space** | `O(h)` — the stack (`h` = tree height) |

> If the BST changes often and you query repeatedly, store each node's subtree
> size to answer in `O(h)` without the in-order walk.
