# Remove Nth Node From End of List · #19 · Medium

🔗 https://leetcode.com/problems/remove-nth-node-from-end-of-list/

## Problem
Remove the `n`-th node **from the end** in **one pass**; return the head.

```
1 → 2 → 3 → 4 → 5,  n = 2   ->   1 → 2 → 3 → 5     (removed the 4)
```

## 🧐 In plain English
A *linked list* is a chain of nodes each pointing to the `next` one. You must delete one node, counted from the *back* of the list: "Nth from the end" means the Nth node if you start counting at the tail (1st-from-end is the very last node, 2nd-from-end is the one before it, and so on). After removing it, hand back the start of the chain.

- **You're given:** `head`, the first node of the list, and an integer `n`.
- **Return:** the head of the list with the n-th-from-end node removed.
- **Rules / guarantees:** `n` is always valid (1 ≤ n ≤ length); aim to do it in a single pass.
- **Watch out for:** when `n` equals the list's length you're removing the head itself, so the head you return changes — a dummy node before the head handles this cleanly.

## The idea 💡 — a fixed-gap two-pointer
You don't know the length up front, but the problem wants a single pass. Trick:
hold two pointers exactly **`n` apart**, then slide them together. When `fast`
hits the end, `slow` is parked right before the target.

```
   keep a gap of n nodes:
        slow ──────── n nodes ────────▶ fast
   when fast reaches the LAST node, slow.next is the node to delete.
```

A **dummy** before the head handles deleting the head itself (then `slow` stays on
the dummy).

## 🎬 Frame-by-frame — remove 2nd-from-end of `1→2→3→4→5`
```
dummy → 1 → 2 → 3 → 4 → 5 → ∅

① open the gap: advance fast n=2 steps
   slow                    fast
    ▼                       ▼
  dummy → 1 → 2 → 3 → 4 → 5

② slide BOTH until fast is the last node
        slow              fast
         ▼                 ▼
  dummy → 1 → 2 → 3 → 4 → 5

             slow          fast
              ▼             ▼... advance...
  dummy → 1 → 2 → 3 → 4 → 5

                  slow      fast=last  ✋ stop
                   ▼         ▼
  dummy → 1 → 2 → 3 → 4 → 5

③ unlink:  slow.next = slow.next.next     (3 ──skip 4──▶ 5)
  dummy → 1 → 2 → 3 ─────────▶ 5
                        ✗ 4
  result: 1 → 2 → 3 → 5 ✅
```

## Why the gap of `n` works
When `fast` sits on the last node, there are exactly `n` nodes from `slow.next`
through `fast` inclusive. So `slow.next` is the `n`-th from the end — the one to
drop.

## Complexity
| | |
|---|---|
| **Time**  | `O(L)` — one traversal |
| **Space** | `O(1)` — two pointers |

> Two-pass alternative: count length `L`, then walk `L − n` steps. Simpler, but
> two passes — the gap trick is the one-pass answer interviewers want.
