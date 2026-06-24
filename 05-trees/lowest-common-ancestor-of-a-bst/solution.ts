/**
 * LeetCode #235 — Lowest Common Ancestor of a BST (Medium)
 * https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
 *
 * Given a BST and two nodes p, q, return their lowest (deepest) common ancestor.
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
 * Exploit the BST ordering — no full search needed.
 *
 * Walk down from the root:
 *   - if BOTH p and q are greater than the current node -> LCA is to the right.
 *   - if BOTH are smaller -> LCA is to the left.
 *   - otherwise the paths to p and q diverge here (or one IS this node):
 *     this node is the split point = the lowest common ancestor.
 *
 * Time:  O(h) — one root-to-LCA descent (O(log n) balanced, O(n) worst).
 * Space: O(1) — iterative, no recursion stack.
 */
export function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode,
): TreeNode | null {
  let node = root;
  while (node !== null) {
    if (p.val > node.val && q.val > node.val) {
      node = node.right; // both larger -> go right
    } else if (p.val < node.val && q.val < node.val) {
      node = node.left; // both smaller -> go left
    } else {
      return node; // split point -> LCA
    }
  }
  return null;
}

if (require.main === module) {
  //        6
  //      /   \
  //     2     8
  //    / \   / \
  //   0   4 7   9
  //      / \
  //     3   5
  const n3 = new TreeNode(3);
  const n5 = new TreeNode(5);
  const n4 = new TreeNode(4, n3, n5);
  const n0 = new TreeNode(0);
  const n2 = new TreeNode(2, n0, n4);
  const n7 = new TreeNode(7);
  const n9 = new TreeNode(9);
  const n8 = new TreeNode(8, n7, n9);
  const root = new TreeNode(6, n2, n8);

  console.log(lowestCommonAncestor(root, n2, n8)?.val); // 6
  console.log(lowestCommonAncestor(root, n2, n4)?.val); // 2 (a node is its own ancestor)
  console.log(lowestCommonAncestor(root, n3, n5)?.val); // 4
}
