# Course Schedule II · #210 · Medium · *Topological Sort*

🔗 https://leetcode.com/problems/course-schedule-ii/

## Problem
Return **an order** to take all courses given prerequisites (`[a, b]` = take `b`
before `a`), or `[]` if impossible.

```
2, [[1,0]]                       -> [0, 1]
4, [[1,0],[2,0],[3,1],[3,2]]     -> [0,1,2,3]  (or [0,2,1,3])
2, [[1,0],[0,1]]                 -> []         (cycle)
```

## 🧐 In plain English
You have `numCourses` courses labelled `0` to `numCourses - 1`, and each pair `[a, b]` is a **prerequisite** meaning "finish `b` before `a`". Unlike #207 (which just asks yes/no), here you must actually hand back a valid order to take them all — an ordering where every course comes after its prerequisites. This kind of dependency-respecting order is called a **topological order**. If the prerequisites form a loop (a **cycle**), no such order exists, so return an empty array.

- **You're given:** a number `numCourses` and an array `prerequisites` where each `[a, b]` means "take `b` before `a`".
- **Return:** an array of course labels in a valid order, or `[]` if it's impossible.
- **Rules / guarantees:** any valid ordering is accepted (several may exist); each course appears exactly once.
- **Watch out for:** return `[]` (not a partial list) when a cycle makes ordering impossible; with no prerequisites, any order such as `[0, 1, 2, ...]` is fine.

## The idea 💡
This is [Course Schedule (#207)](../course-schedule) but we **output the order**.
That order is a **topological sort** of the dependency graph, produced directly by
**Kahn's algorithm** (BFS on in-degrees):

```
   in-degree(course) = how many prerequisites it still needs

   ① queue every course with in-degree 0 (no prereqs)
   ② pop one → append to order → for each dependent, in-degree--
                                  any that hit 0 → enqueue (now unlocked)
   ③ order has all courses → valid  |  some stuck (cycle) → []
```

## 🔗 The graph — `4, [[1,0],[2,0],[3,1],[3,2]]`
Edges point **prereq → course** ("0 unlocks 1 and 2", "1 and 2 unlock 3"):

```
            ┌──▶ 1 ──┐
   0 ──────┤         ├──▶ 3
            └──▶ 2 ──┘

   in-degrees:  0:0   1:1   2:1   3:2
```

## 🎬 Frame-by-frame (in-degree table + queue + order)
```
step  pop  in-degrees [0,1,2,3]   queue        order
────  ───  ────────────────────   ───────────  ──────────
init   –   [0, 1, 1, 2]           [0]          []
 1     0   [_, 0, 0, 2]           [1, 2]       [0]          ← 0 unlocks 1,2
 2     1   [_, _, 0, 1]           [2]          [0,1]        ← 3's indeg 2→1
 3     2   [_, _, _, 0]           [3]          [0,1,2]      ← 3's indeg 1→0, enqueue
 4     3   [_, _, _, _]           []           [0,1,2,3]

 order length 4 == numCourses  →  [0,1,2,3] ✅
```

## 🔴 A cycle produces no valid order — `[[1,0],[0,1]]`
```
   0 ⇄ 1          in-degrees: 0:1  1:1   → NOTHING starts at 0
                  queue empty immediately → order = [] (length 0 ≠ 2) → [] ✅
```

The popped order *is* the answer: every course emerges only after all its
prerequisites already have.

## Complexity
| | |
|---|---|
| **Time**  | `O(V + E)` — visit each course and prerequisite once |
| **Space** | `O(V + E)` — adjacency list + in-degrees + queue + order |

> DFS post-order (record a node after its dependents, then reverse) is an
> equivalent topological sort — same `O(V+E)`.
