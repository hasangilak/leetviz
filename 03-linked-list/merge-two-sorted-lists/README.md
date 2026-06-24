# Merge Two Sorted Lists · #21 · Easy

🔗 https://leetcode.com/problems/merge-two-sorted-lists/

## Problem
Merge two **sorted** linked lists into one sorted list by splicing nodes.

```
list1: 1 → 2 → 4
list2: 1 → 3 → 4
merged: 1 → 1 → 2 → 3 → 4 → 4
```

## 🧐 In plain English
A *linked list* is a chain of nodes, each holding a value and a `next` pointer to the following node. You get two such chains that are each already in increasing order, and you must weave them into one single chain that is also in increasing order — by rerouting the existing nodes' pointers, not by copying values.

- **You're given:** `list1` and `list2`, the head nodes of two lists already sorted ascending (either may be `null`/empty).
- **Return:** the head of one merged list containing all nodes, sorted ascending.
- **Rules / guarantees:** both inputs are already sorted; you splice (reconnect) the existing nodes rather than creating new ones.
- **Watch out for:** either list can be empty, and duplicate values across the two lists are fine — just keep everything in order.

## The idea 💡
This is the **merge step of merge-sort**. Compare the two front nodes, append the
smaller to your result, advance that list, repeat. When one list empties, append
whatever's left of the other (it's already sorted).

### The dummy-node trick
Picking the first node is awkward — which list's head wins? A **dummy** sentinel
sidesteps it: always append to `tail`, and return `dummy.next` at the end. No
special case for the head.

## Walkthrough
```
dummy → ∅            l1: 1 2 4     l2: 1 3 4

1 ≤ 1 -> take l1(1)   dummy→1                 l1: 2 4   l2: 1 3 4
1 < 2 -> take l2(1)   dummy→1→1               l1: 2 4   l2: 3 4
2 ≤ 3 -> take l1(2)   dummy→1→1→2             l1: 4     l2: 3 4
3 < 4 -> take l2(3)   dummy→1→1→2→3           l1: 4     l2: 4
4 ≤ 4 -> take l1(4)   dummy→1→1→2→3→4         l1: ∅     l2: 4
l1 empty -> attach l2: dummy→1→1→2→3→4→4

return dummy.next = 1→1→2→3→4→4
```

## Why `<=` and not `<`?
Using `<=` keeps the merge **stable** (equal values keep list1-before-list2
order). Not required here, but a good habit.

## Complexity
| | |
|---|---|
| **Time**  | `O(n + m)` — each node visited once |
| **Space** | `O(1)` — relinks existing nodes; nothing new allocated |
