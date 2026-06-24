/**
 * LeetCode #207 — Course Schedule (Medium)
 * https://leetcode.com/problems/course-schedule/
 *
 * `prerequisites[i] = [a, b]` means you must take b before a. Return true if you
 * can finish ALL courses — i.e. the dependency graph has no cycle.
 */

/**
 * Topological sort via Kahn's algorithm (BFS on in-degrees).
 *
 * Model courses as a directed graph: an edge b -> a means "b unlocks a". A valid
 * schedule exists iff the graph is a DAG (no cycle). Kahn's algorithm repeatedly
 * takes any course with no remaining prerequisites (in-degree 0), "completes" it,
 * and decrements its dependents' in-degrees (possibly unlocking them).
 *
 * If we manage to complete every course, the graph was acyclic. If we get stuck
 * with courses still pending, those courses form a cycle -> impossible.
 *
 * Time:  O(V + E) — V courses, E prerequisite edges.
 * Space: O(V + E) — adjacency list + in-degree array + queue.
 */
export function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  const indegree = new Array<number>(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course); // prereq must come before course
    indegree[course]++;
  }

  // start with everything that has no prerequisites
  const queue: number[] = [];
  for (let c = 0; c < numCourses; c++) {
    if (indegree[c] === 0) queue.push(c);
  }

  let completed = 0;
  let head = 0; // index pointer used as a queue front (avoids O(n) shift)
  while (head < queue.length) {
    const course = queue[head++];
    completed++;
    for (const next of adj[course]) {
      indegree[next]--;
      if (indegree[next] === 0) queue.push(next); // all prereqs done -> unlock
    }
  }

  return completed === numCourses; // stuck before finishing => a cycle existed
}

if (require.main === module) {
  console.log(canFinish(2, [[1, 0]])); // true  (take 0, then 1)
  console.log(canFinish(2, [[1, 0], [0, 1]])); // false (0<->1 cycle)
  console.log(canFinish(4, [[1, 0], [2, 0], [3, 1], [3, 2]])); // true
}
