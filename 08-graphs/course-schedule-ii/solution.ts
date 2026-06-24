/**
 * LeetCode #210 — Course Schedule II (Medium)
 * https://leetcode.com/problems/course-schedule-ii/
 *
 * Like Course Schedule, but RETURN a valid order to take all courses (any one),
 * or [] if it's impossible (a cycle exists).
 */

/**
 * Topological sort via Kahn's algorithm (BFS on in-degrees).
 *
 * Same machinery as #207, but we record the order in which courses are
 * "completed". Repeatedly take a course with no remaining prerequisites
 * (in-degree 0), append it to the order, and relax its dependents. If we manage
 * to output all courses, that sequence is a valid topological order; if not, a
 * cycle blocked us -> return [].
 *
 * Time:  O(V + E)
 * Space: O(V + E)
 */
export function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  const indegree = new Array<number>(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course);
    indegree[course]++;
  }

  const queue: number[] = [];
  for (let c = 0; c < numCourses; c++) {
    if (indegree[c] === 0) queue.push(c);
  }

  const order: number[] = [];
  let head = 0;
  while (head < queue.length) {
    const course = queue[head++];
    order.push(course);
    for (const next of adj[course]) {
      if (--indegree[next] === 0) queue.push(next); // unlocked
    }
  }

  // if some course never reached in-degree 0, there was a cycle
  return order.length === numCourses ? order : [];
}

if (require.main === module) {
  console.log(findOrder(2, [[1, 0]])); // [0, 1]
  console.log(findOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]])); // [0,1,2,3] (or [0,2,1,3])
  console.log(findOrder(2, [[1, 0], [0, 1]])); // [] (cycle)
  console.log(findOrder(1, [])); // [0]
}
