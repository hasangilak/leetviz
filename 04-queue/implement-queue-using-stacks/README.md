# Implement Queue using Stacks · #232 · Easy

🔗 https://leetcode.com/problems/implement-queue-using-stacks/

## Problem
Implement a **FIFO queue** (`push`, `pop`, `peek`, `empty`) using only **stack**
primitives (push/pop/peek from the top).

## 🧐 In plain English
You're building a queue — a first-in-first-out line, like people waiting at a counter where the *earliest* arrival is served first. The catch: your only building blocks are stacks, which work the opposite way (last-in-first-out, like a stack of plates). So you have to fake queue behavior using stack-only operations.

You implement a class with these operations:
- `push(x)` — add an element to the back of the queue.
- `pop()` — remove and return the element at the front (the oldest one).
- `peek()` — look at the front element without removing it.
- `empty()` — return whether the queue has no elements.

- **The hard part:** you may only use stack operations (push/pop/peek from the top). A stack hands back the *newest* item, but a queue must hand back the *oldest* — so you need a trick (two stacks) to reverse that order.

## The idea 💡
A stack is **LIFO** — the opposite of a queue. But reversing a reversal gets you
back to the original order. So use **two stacks**:

- `inStack` — receives every `push`. Newest ends up on top.
- `outStack` — when you need the front, **pour `inStack` into `outStack`**. That
  flip puts the *oldest* element on top, which is exactly the queue's front.

Crucially, only refill `outStack` when it's **empty**. Elements already poured
keep their correct FIFO order; we don't disturb them.

## Walkthrough
```
push(1)            in:[1]        out:[]
push(2)            in:[1,2]      out:[]
peek()  -> out empty, pour:      in:[]   out:[2,1]   top=1  ✅
pop()   -> out:[2]   returns 1
push(3)            in:[3]        out:[2]
pop()   -> out not empty, returns 2     in:[3] out:[]
pop()   -> out empty, pour:      in:[]   out:[3]     returns 3
```

## Why amortized O(1)?
A single `pop` that triggers a pour is O(n). But **each element is moved from
`in` to `out` exactly once** in its lifetime. Spread that one move across the
operations that touch the element, and the average ("amortized") cost is O(1).

## Complexity
| Operation | Worst case | Amortized |
|-----------|-----------|-----------|
| `push` | O(1) | O(1) |
| `pop` / `peek` | O(n) (when a pour happens) | **O(1)** |
| `empty` | O(1) | O(1) |

Space: `O(n)` for the elements held across the two stacks.
