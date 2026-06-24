/**
 * LeetCode #226 — Invert Binary Tree (Easy)
 * https://leetcode.com/problems/invert-binary-tree/
 *
 * Mirror a binary tree: swap every node's left and right children.
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
 * Recursive swap (DFS).
 *
 * Inverting a tree = swap the two children of every node. Recursion makes this
 * a one-liner: invert the left subtree, invert the right subtree, then swap
 * them. The base case (null) returns null.
 *
 * Time:  O(n) — visits every node once.
 * Space: O(h) — recursion stack, h = tree height (O(n) worst, O(log n) balanced).
 */
export function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) return null;

  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;

  return root;
}

if (require.main === module) {
  const fromLevelOrder = (arr: (number | null)[]): TreeNode | null => {
    if (arr.length === 0 || arr[0] === null) return null;
    const root = new TreeNode(arr[0]!);
    const queue: TreeNode[] = [root];
    let i = 1;
    while (queue.length > 0 && i < arr.length) {
      const node = queue.shift()!;
      if (i < arr.length && arr[i] !== null) {
        node.left = new TreeNode(arr[i] as number);
        queue.push(node.left);
      }
      i++;
      if (i < arr.length && arr[i] !== null) {
        node.right = new TreeNode(arr[i] as number);
        queue.push(node.right);
      }
      i++;
    }
    return root;
  };
  const toLevelOrder = (root: TreeNode | null): (number | null)[] => {
    const out: (number | null)[] = [];
    const queue: (TreeNode | null)[] = [root];
    while (queue.length > 0) {
      const node = queue.shift()!;
      if (node) {
        out.push(node.val);
        queue.push(node.left, node.right);
      } else out.push(null);
    }
    while (out.length && out[out.length - 1] === null) out.pop();
    return out;
  };

  console.log(toLevelOrder(invertTree(fromLevelOrder([4, 2, 7, 1, 3, 6, 9]))));
  // [4, 7, 2, 9, 6, 3, 1]
}
