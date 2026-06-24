# Reverse Linked List · #206 · Easy

🔗 https://leetcode.com/problems/reverse-linked-list/

## Problem
Reverse a singly linked list; return the new head.

```
1 → 2 → 3 → 4 → 5 → null     becomes     5 → 4 → 3 → 2 → 1 → null
```

## 🧐 In plain English
A *singly linked list* is a chain of nodes where each node holds a value and a single `next` pointer to the following node; the last one points to `null`. You're handed the first node (the "head") of such a chain, and you must make the whole chain run in the opposite direction so the old last node becomes the new first one.

- **You're given:** `head`, the first node of a singly linked list (or `null` if empty).
- **Return:** the head of the reversed list (the node that used to be last).
- **Rules / guarantees:** you flip the existing nodes' pointers in place — no new list is built.
- **Watch out for:** before you overwrite a node's `next`, save it, or you lose the rest of the list. An empty list or a single node should just come back unchanged.

## The idea 💡
A singly linked list only knows how to go **forward**. To reverse it, flip every
`next` pointer to face backward. The only danger: once you overwrite
`curr.next`, you've lost the rest of the list — so **save it first**.

Carry three pointers:
- `prev` — the already-reversed prefix (starts `null`).
- `curr` — the node being processed.
- `next` — `curr.next`, saved before we clobber it.

## Walkthrough
```
start:   prev=∅   curr=1 → 2 → 3 → null

step 1:  save next=2;  1.next=∅;   prev=1;  curr=2
         reversed: 1→∅                 remaining: 2 → 3

step 2:  save next=3;  2.next=1;   prev=2;  curr=3
         reversed: 2 → 1 → ∅             remaining: 3

step 3:  save next=∅;  3.next=2;   prev=3;  curr=∅
         reversed: 3 → 2 → 1 → ∅

curr is ∅ -> return prev (=3), the new head
```

## Complexity
| | |
|---|---|
| **Time**  | `O(n)` — single pass |
| **Space** | `O(1)` — three pointers (recursion would cost `O(n)` stack) |

## Recursive variant (for intuition)
```ts
function reverse(head) {
  if (!head || !head.next) return head;     // base: empty / last node
  const newHead = reverse(head.next);       // reverse the tail
  head.next.next = head;                     // make the next node point back
  head.next = null;
  return newHead;
}
```
Elegant, but uses `O(n)` call-stack space — the iterative version is preferred.
