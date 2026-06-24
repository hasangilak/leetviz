# Min Stack · #155 · Medium

🔗 https://leetcode.com/problems/min-stack/

## Problem
Design a stack that supports `push`, `pop`, `top`, **and** `getMin` — every one
in **O(1)** time.

## 🧐 In plain English
You're building a regular stack (a last-in-first-out pile of numbers) with one bonus feature: at any moment it can instantly tell you the *smallest* number currently in the pile. It's like a stack with a built-in "what's the minimum right now?" button that answers immediately.

You implement a class with these operations:
- `push(val)` — add a number to the top of the stack.
- `pop()` — remove the number on top.
- `top()` — look at the number on top without removing it.
- `getMin()` — return the smallest number currently in the stack.

- **The hard part:** `getMin` must be O(1) (instant), even though the minimum can change as you `push` and `pop`. Scanning the whole stack each time would be too slow.

## The naive trap
Scanning the stack for the minimum on each `getMin` is O(n). We want O(1), so we
must **maintain** the minimum as we go, not recompute it.

## The idea 💡
Keep a **second stack of "minimum so far"** that moves in lockstep with the main
stack. Its top always equals the minimum of the *current* contents.

```
push(val):  mins.push( min(val, mins.top()) )
pop():      mins.pop()        // stays in sync with the value stack
getMin():   return mins.top()
```

Why a stack and not a single variable? Because a `pop()` can remove the current
minimum, and we must instantly know the *previous* minimum. The mins stack
remembers the whole history.

## Walkthrough
```
push(-2)   stack: -2          mins: -2
push(0)    stack: -2 0        mins: -2 -2   (min(0,-2)=-2)
push(-3)   stack: -2 0 -3     mins: -2 -2 -3
getMin() -> -3
pop()      stack: -2 0        mins: -2 -2
top()    -> 0
getMin() -> -2   ← the old minimum is restored automatically
```

## Complexity
| | |
|---|---|
| **Time**  | `O(1)` for every operation |
| **Space** | `O(n)` — the parallel mins stack |

> Alternative: store `(val, minSoFar)` pairs in a single stack — same idea, one
> array. The two-stack version is just easier to read.
