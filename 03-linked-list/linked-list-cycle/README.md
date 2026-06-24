# Linked List Cycle · #141 · Easy · *Floyd's Algorithm*

🔗 https://leetcode.com/problems/linked-list-cycle/

## Problem
Does the linked list contain a **cycle** (a node whose `next` revisits an earlier
node)? Return `true`/`false`.

```
3 → 2 → 0 → -4
    ↑_________|        -> true (tail links back to node 2)

1 → 2 → null           -> false
```

## 🧐 In plain English
A *linked list* is a chain of nodes where each node points to the `next` one. Normally the chain ends at `null`, but here some node's `next` might loop back to an earlier node, creating an endless circle — a *cycle*. Your job is just to detect whether such a loop exists, not to find or fix it.

- **You're given:** `head`, the first node of a linked list.
- **Return:** `true` if following `next` pointers ever loops forever, `false` if it eventually reaches `null`.
- **Rules / guarantees:** there's at most one cycle; you only report yes/no.
- **Watch out for:** don't actually walk forever on a cyclic list — and an empty list or one that ends in `null` is simply `false`.

## Two ways to solve it

| Approach | Time | Space |
|----------|------|-------|
| Hash set of visited nodes | `O(n)` | `O(n)` |
| **Floyd's two pointers** | `O(n)` | **`O(1)`** ✅ |

## The idea 💡 (tortoise & hare)
Run two pointers: `slow` moves 1 node per step, `fast` moves 2.

- **No cycle** → `fast` falls off the end (`null`) and we return `false`.
- **Cycle** → both get trapped in the loop. Because `fast` gains exactly **1
  step on `slow` every iteration**, the gap between them shrinks 1 at a time and
  must hit 0 — they collide. You can't leap over someone when you only close the
  gap by one each step.

## Walkthrough (cycle case)
```
list: 3 → 2 → 0 → -4 ↘ (back to 2)

         slow   fast
init      3      3
step1     2      0
step2     0      2      (fast wrapped around)
step3    -4     -4      slow == fast  -> cycle! ✅
```

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` — fast pointer traverses ≤ 2n nodes before meeting/ending |
| **Space** | `O(1)` — two pointers only |

> 💡 The same trick (advance a second pointer once they meet) finds the cycle's
> **entry node** — that's LeetCode #142, *Linked List Cycle II*.
