/**
 * LeetCode #200 — Number of Islands (Medium)
 * https://leetcode.com/problems/number-of-islands/
 *
 * Count islands in a grid of '1' (land) and '0' (water). An island is a group of
 * land cells connected horizontally/vertically.
 */

/**
 * DFS flood fill.
 *
 * Scan every cell. When we hit unvisited land ('1'), that's a NEW island, so
 * bump the count — then "sink" the entire connected landmass by flood-filling it
 * to '0'. Sinking ensures each island is counted exactly once: the cells we
 * already absorbed won't trigger a new count later.
 *
 * Time:  O(rows · cols) — every cell is visited a constant number of times.
 * Space: O(rows · cols) — worst-case recursion depth (grid that's all land).
 */
export function numIslands(grid: string[][]): number {
  const rows = grid.length;
  if (rows === 0) return 0;
  const cols = grid[0].length;
  let islands = 0;

  const sink = (r: number, c: number): void => {
    // stop at the border or on water/visited cells
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0'; // mark visited by sinking it
    sink(r + 1, c);
    sink(r - 1, c);
    sink(r, c + 1);
    sink(r, c - 1);
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        islands++;
        sink(r, c); // remove the whole island so it's counted once
      }
    }
  }

  return islands;
}

if (require.main === module) {
  const grid1 = [
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
  ];
  console.log(numIslands(grid1)); // 1

  const grid2 = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1'],
  ];
  console.log(numIslands(grid2)); // 3
}
