/**
 * LeetCode #102 — Binary Tree Level Order Traversal (Medium)
 * https://leetcode.com/problems/binary-tree-level-order-traversal/
 *
 * Return node values grouped by level, top to bottom, left to right.
 */

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Breadth-First Search, one level at a time.
 *
 * BFS visits nodes nearest-to-root first — exactly the level order we want. The
 * trick to grouping by level: before processing a level, snapshot the current
 * frontier. Everything in it belongs to this level; their children form the next
 * frontier.
 *
 * Time:  O(n) — each node enqueued/dequeued once.
 * Space: O(n) — the queue holds up to a full level (worst case ~n/2 leaves).
 */
export function levelOrder(root: TreeNode | null): number[][] {
  const result: number[][] = [];
  if (root === null) return result;

  let frontier: TreeNode[] = [root];
  while (frontier.length > 0) {
    result.push(frontier.map((node) => node.val));

    const next: TreeNode[] = [];
    for (const node of frontier) {
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    frontier = next;
  }

  return result;
}

if (require.main === module) {
  // [3,9,20,null,null,15,7]
  const root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
  console.log(levelOrder(root)); // [[3], [9,20], [15,7]]
  console.log(levelOrder(new TreeNode(1))); // [[1]]
  console.log(levelOrder(null)); // []
}
