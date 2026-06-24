/**
 * LeetCode #104 — Maximum Depth of Binary Tree (Easy)
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/
 *
 * Return the maximum depth: the number of nodes along the longest path from the
 * root down to a leaf.
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
 * Recursive DFS.
 *
 * The depth of a tree is 1 (for the root) plus the depth of its deeper subtree.
 * An empty tree has depth 0. That single recurrence solves it.
 *
 * Time:  O(n) — visits each node once.
 * Space: O(h) — recursion stack (h = height).
 */
export function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

if (require.main === module) {
  // [3,9,20,null,null,15,7]  -> depth 3
  const root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
  console.log(maxDepth(root)); // 3
  console.log(maxDepth(new TreeNode(1, null, new TreeNode(2)))); // 2
  console.log(maxDepth(null)); // 0
}
