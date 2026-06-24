/**
 * LeetCode #21 — Merge Two Sorted Lists (Easy)
 * https://leetcode.com/problems/merge-two-sorted-lists/
 *
 * Splice two sorted linked lists into one sorted list and return its head.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Two pointers + a dummy head.
 *
 * Walk both lists together, always appending the smaller current node to the
 * output's tail. A "dummy" node removes the special-case of choosing the very
 * first head: we always append to `tail`, then return `dummy.next`.
 *
 * When one list runs out, the other is already sorted — just attach it whole.
 *
 * Time:  O(n + m)
 * Space: O(1) — we relink existing nodes; no new list is allocated.
 */
export function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  const dummy = new ListNode();
  let tail = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }

  // exactly one list may have leftovers; both being null is fine too
  tail.next = list1 ?? list2;

  return dummy.next;
}

if (require.main === module) {
  const fromArray = (arr: number[]): ListNode | null =>
    arr.reduceRight<ListNode | null>((next, val) => new ListNode(val, next), null);
  const toArray = (head: ListNode | null): number[] => {
    const out: number[] = [];
    for (let n = head; n !== null; n = n.next) out.push(n.val);
    return out;
  };

  console.log(toArray(mergeTwoLists(fromArray([1, 2, 4]), fromArray([1, 3, 4]))));
  // [1,1,2,3,4,4]
  console.log(toArray(mergeTwoLists(fromArray([]), fromArray([])))); // []
  console.log(toArray(mergeTwoLists(fromArray([]), fromArray([0])))); // [0]
}
