/**
 * LeetCode #133 — Clone Graph (Medium)
 * https://leetcode.com/problems/clone-graph/
 *
 * Return a DEEP copy of a connected undirected graph: every node and edge is
 * duplicated, sharing no references with the original.
 */

export class GraphNode {
  val: number;
  neighbors: GraphNode[];
  constructor(val = 0, neighbors: GraphNode[] = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

/**
 * DFS with an original->clone map.
 *
 * Two intertwined problems: copy each node, and reproduce the edges — including
 * cycles (it's undirected, so A↔B is a 2-cycle). The map solves both:
 *   - it remembers which original we've already cloned (so cycles terminate),
 *   - and it lets us wire a clone's neighbors to the CLONED neighbors, not the
 *     originals.
 *
 * For each original we visit once: make its clone, register it, then recurse to
 * clone & attach each neighbor.
 *
 * Time:  O(V + E) — each node and edge handled once.
 * Space: O(V) — the map plus recursion depth.
 */
export function cloneGraph(node: GraphNode | null): GraphNode | null {
  if (node === null) return null;

  const cloned = new Map<GraphNode, GraphNode>(); // original -> its clone

  const dfs = (original: GraphNode): GraphNode => {
    const existing = cloned.get(original);
    if (existing !== undefined) return existing; // already cloned -> stop recursion

    const copy = new GraphNode(original.val);
    cloned.set(original, copy); // register BEFORE recursing, to break cycles

    for (const neighbor of original.neighbors) {
      copy.neighbors.push(dfs(neighbor));
    }
    return copy;
  };

  return dfs(node);
}

if (require.main === module) {
  // Build the classic 4-node square: 1-2-3-4-1
  const n1 = new GraphNode(1);
  const n2 = new GraphNode(2);
  const n3 = new GraphNode(3);
  const n4 = new GraphNode(4);
  n1.neighbors = [n2, n4];
  n2.neighbors = [n1, n3];
  n3.neighbors = [n2, n4];
  n4.neighbors = [n1, n3];

  const copy = cloneGraph(n1)!;
  console.log(copy.val); // 1
  console.log(copy.neighbors.map((n) => n.val)); // [2, 4]
  console.log(copy !== n1); // true (a real copy, different reference)
  console.log(copy.neighbors[0] !== n2); // true (neighbors are clones too)
}
