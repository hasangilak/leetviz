/**
 * LeetCode #230 — Kth Smallest Element in a BST (Medium)
 * https://leetcode.com/problems/kth-smallest-element-in-a-bst/
 *
 * Return the k-th smallest value (1-indexed) in a binary search tree.
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
 * Iterative in-order traversal, stopping at the k-th node.
 *
 * KEY FACT: an in-order traversal of a BST (left, node, right) visits values in
 * STRICTLY INCREASING order. So the k-th node we visit in-order is the k-th
 * smallest. Using an explicit stack lets us stop the moment we reach k, without
 * traversing the whole tree.
 *
 * Time:  O(h + k) — descend to the smallest (O(h)), then pop k nodes.
 * Space: O(h) — the stack.
 */
export function kthSmallest(root: TreeNode | null, k: number): number {
  const stack: TreeNode[] = [];
  let node = root;

  while (node !== null || stack.length > 0) {
    // go as far left as possible, stacking the path
    while (node !== null) {
      stack.push(node);
      node = node.left;
    }

    node = stack.pop()!; // smallest unvisited node
    k--;
    if (k === 0) return node.val;

    node = node.right; // then explore its right subtree
  }

  return -1; // k larger than tree size (won't happen per constraints)
}

if (require.main === module) {
  //      5
  //     / \
  //    3   6
  //   / \
  //  2   4
  // /
  // 1
  const root = new TreeNode(
    5,
    new TreeNode(3, new TreeNode(2, new TreeNode(1)), new TreeNode(4)),
    new TreeNode(6),
  );
  console.log(kthSmallest(root, 1)); // 1
  console.log(kthSmallest(root, 3)); // 3
  console.log(kthSmallest(root, 6)); // 6
}
