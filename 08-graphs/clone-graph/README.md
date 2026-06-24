# Clone Graph · #133 · Medium

🔗 https://leetcode.com/problems/clone-graph/

## Problem
Given a reference to a node in a connected **undirected** graph, return a **deep
copy**: every node and edge duplicated, sharing no references with the original.

```
   1 --- 2
   |     |        clone the whole thing into a fresh,
   4 --- 3        identical-but-separate graph
```

## 🧐 In plain English
You're handed one node of a graph (nodes connected by **undirected** edges, meaning a link between `1` and `2` works both ways). Build a brand-new graph that looks exactly the same but is completely separate — a **deep copy**. "Deep copy" means you create fresh node objects, so changing the copy never affects the original and they share no objects in memory.

- **You're given:** a reference to one `Node` in a connected undirected graph; each node has a `val` and a list of `neighbors`.
- **Return:** the matching node in a fully duplicated graph (every node and edge recreated).
- **Rules / guarantees:** the graph is connected, so starting from the given node you can reach all of it.
- **Watch out for:** the graph has cycles (edges go both ways), so you must remember which originals you've already copied — otherwise you'll loop forever or duplicate the same node twice.

## The challenge 🌀
Two things make this tricky:
1. **Cycles.** Undirected edges mean `1↔2` is a cycle. Naively recursing into
   neighbors would loop forever.
2. **Shared nodes.** Node `3` is reached from both `2` and `4`. We must create it
   **once** and have both clones point to that same copy.

## The idea 💡
Keep a **map from each original node to its clone**. It does double duty:
- **Memo / visited set** — if an original is already in the map, return its
  existing clone instead of recursing again. This terminates cycles.
- **Edge fixer** — when wiring a clone's neighbors, we look up the *cloned*
  neighbor, so edges connect copies to copies.

Crucially, **register the clone in the map *before* recursing** into neighbors —
otherwise a cycle would re-enter the same node before it's recorded and recurse
infinitely.

```
dfs(original):
  if original in map: return map[original]      # already done
  copy = new Node(original.val)
  map[original] = copy                          # register first!
  for nb in original.neighbors:
      copy.neighbors.push(dfs(nb))
  return copy
```

## Walkthrough
```
dfs(1): map{1:1'}; neighbors 2,4
  dfs(2): map{1',2'}; neighbors 1,3
    dfs(1) -> already in map -> return 1'    (cycle broken ✅)
    dfs(3): map{1',2',3'}; neighbors 2,4
      dfs(2) -> in map -> 2'
      dfs(4): map{...,4'}; neighbors 1,3 -> both in map -> 1',3'
```

## Complexity
| | |
|---|---|
| **Time**  | `O(V + E)` — each node created once, each edge traversed once |
| **Space** | `O(V)` — the map + recursion stack (BFS with a queue also works) |
