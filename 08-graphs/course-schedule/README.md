# Course Schedule · #207 · Medium · *Topological Sort*

🔗 https://leetcode.com/problems/course-schedule/

## Problem
There are `numCourses` courses. `prerequisites[i] = [a, b]` means **b must be
taken before a**. Return `true` if you can finish all courses.

```
2, [[1,0]]           -> true   (0 then 1)
2, [[1,0],[0,1]]     -> false  (1 needs 0, 0 needs 1 — deadlock)
```

## 🧐 In plain English
You have `numCourses` courses labelled `0` to `numCourses - 1`. Each pair `[a, b]` is a **prerequisite**: you must finish course `b` before you're allowed to take course `a`. The question is simply: is there any order to take every course that never breaks a prerequisite? That's only impossible if the prerequisites loop back on themselves (a circular dependency, also called a **cycle**).

- **You're given:** a number `numCourses` and an array `prerequisites` where each `[a, b]` means "take `b` before `a`".
- **Return:** `true` if all courses can be completed, otherwise `false`.
- **Rules / guarantees:** you can finish everything exactly when no course (directly or indirectly) requires itself.
- **Watch out for:** with no prerequisites the answer is always `true`; the deadlock is any cycle like `a` needs `b` and `b` needs `a`.

## Reframe it as a graph 🔗
Make a **directed edge `b → a`** for "b unlocks a". The question becomes: *can
this directed graph be ordered so every prerequisite comes before its course?*
That ordering exists **iff the graph has no cycle** (it's a DAG). A cycle is a
circular dependency you can never start.

Producing such an order is called a **topological sort**.

## The idea 💡 — Kahn's algorithm (BFS)
**In-degree** of a course = how many prerequisites it still has.

1. Compute every course's in-degree.
2. Queue all courses with in-degree `0` (no prereqs — can start now).
3. Pop one, mark it completed, and decrement each dependent's in-degree. Any
   dependent that drops to `0` is now unlocked → enqueue it.
4. Repeat until the queue empties.

If you complete **all** courses, success. If some never reach in-degree 0,
they're tangled in a cycle → `false`.

## Walkthrough — `4, [[1,0],[2,0],[3,1],[3,2]]`
```
edges: 0→1, 0→2, 1→3, 2→3
indeg: [0,1,1,2]

queue:[0]                completed=0
pop 0 -> completed=1; indeg ->[_,0,0,2]; enqueue 1,2   queue:[1,2]
pop 1 -> completed=2; indeg[3]->1
pop 2 -> completed=3; indeg[3]->0; enqueue 3           queue:[3]
pop 3 -> completed=4
completed(4) == numCourses(4) -> true ✅
```

## Walkthrough — the cycle `[[1,0],[0,1]]`
```
indeg: [1,1]   -> nothing has in-degree 0
queue empty immediately -> completed=0 ≠ 2 -> false ✅
```

## Complexity
| | |
|---|---|
| **Time**  | `O(V + E)` — build graph + visit each node/edge once |
| **Space** | `O(V + E)` — adjacency list, in-degree array, queue |

> DFS alternative: detect a back-edge using three colors
> (unvisited / in-progress / done). Same `O(V+E)`; Kahn's is often cleaner.
