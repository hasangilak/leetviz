/**
 * LeetCode #98 — Validate Binary Search Tree (Medium)
 * https://leetcode.com/problems/validate-binary-search-tree/
 *
 * Return true iff the tree is a valid BST:
 *   - every node in the left subtree is STRICTLY LESS than the node, and
 *   - every node in the right subtree is STRICTLY GREATER, recursively.
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
 * DFS carrying an allowed (low, high) range.
 *
 * The BST property is GLOBAL, not just parent-vs-child. A node deep on the left
 * must still be smaller than an ancestor far above it. So we pass down the open
 * interval (low, high) a node is allowed to live in:
 *   - going left:  the upper bound tightens to the current value.
 *   - going right: the lower bound tightens to the current value.
 * A node outside its interval breaks the BST.
 *
 * Time:  O(n) — each node checked once.
 * Space: O(h) — recursion stack.
 */
export function isValidBST(root: TreeNode | null): boolean {
  const validate = (node: TreeNode | null, low: number, high: number): boolean => {
    if (node === null) return true;
    if (node.val <= low || node.val >= high) return false;
    return (
      validate(node.left, low, node.val) && // left subtree must be < node.val
      validate(node.right, node.val, high) // right subtree must be > node.val
    );
  };

  return validate(root, -Infinity, Infinity);
}

if (require.main === module) {
  // [2,1,3] valid
  console.log(isValidBST(new TreeNode(2, new TreeNode(1), new TreeNode(3)))); // true

  // [5,1,4,null,null,3,6] invalid: 3 is in the right subtree of 5 but < 5
  const bad = new TreeNode(5, new TreeNode(1), new TreeNode(4, new TreeNode(3), new TreeNode(6)));
  console.log(isValidBST(bad)); // false

  console.log(isValidBST(new TreeNode(1))); // true
}
