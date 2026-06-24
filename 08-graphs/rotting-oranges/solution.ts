/**
 * LeetCode #994 — Rotting Oranges (Medium)
 * https://leetcode.com/problems/rotting-oranges/
 *
 * Grid cells: 0 empty, 1 fresh orange, 2 rotten. Each minute, every rotten
 * orange rots its 4-directional fresh neighbours. Return minutes until none are
 * fresh, or -1 if some orange can never rot.
 */

/**
 * Multi-source BFS (all rotten oranges spread simultaneously).
 *
 * Rot spreads one ring per minute from EVERY rotten orange at once — that's
 * exactly multi-source BFS. Seed the queue with all initially-rotten cells, then
 * process the frontier layer by layer; each layer is one minute. Count fresh
 * oranges so we can both detect completion and report -1 if any stay fresh
 * (unreachable).
 *
 * Time:  O(rows · cols) — each cell enqueued at most once.
 * Space: O(rows · cols) — the queue.
 */
export function orangesRotting(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;
  let frontier: Array<[number, number]> = [];
  let fresh = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) frontier.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }

  if (fresh === 0) return 0; // nothing to rot

  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let minutes = 0;

  while (frontier.length > 0 && fresh > 0) {
    const next: Array<[number, number]> = [];
    for (const [r, c] of frontier) {
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && grid[nr][nc] === 1) {
          grid[nr][nc] = 2; // newly rotten
          fresh--;
          next.push([nr, nc]);
        }
      }
    }
    frontier = next;
    minutes++;
  }

  return fresh === 0 ? minutes : -1; // leftover fresh -> unreachable
}

if (require.main === module) {
  console.log(orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]])); // 4
  console.log(orangesRotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]])); // -1
  console.log(orangesRotting([[0, 2]])); // 0
}
