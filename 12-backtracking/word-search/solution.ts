/**
 * LeetCode #79 — Word Search (Medium)
 * https://leetcode.com/problems/word-search/
 *
 * Does `word` exist in the grid as a path of adjacent (up/down/left/right)
 * cells, using each cell at most once?
 */

/**
 * DFS backtracking on the grid.
 *
 * From every cell, try to match the word character by character, walking to
 * neighbours. To enforce "each cell used once" within a path, temporarily mark
 * the current cell (here: overwrite with '#') before recursing, then RESTORE it
 * on the way out so other start positions/paths can reuse it.
 *
 * Time:  O(rows · cols · 4^L) — start everywhere; each step branches ≤ 4 ways
 *        for L = word length.
 * Space: O(L) recursion depth.
 */
export function exist(board: string[][], word: string): boolean {
  const rows = board.length;
  const cols = board[0].length;

  const dfs = (r: number, c: number, i: number): boolean => {
    if (i === word.length) return true; // matched all chars
    if (
      r < 0 || c < 0 || r >= rows || c >= cols ||
      board[r][c] !== word[i]
    ) {
      return false;
    }

    const saved = board[r][c];
    board[r][c] = '#'; // mark visited for THIS path

    const found =
      dfs(r + 1, c, i + 1) ||
      dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) ||
      dfs(r, c - 1, i + 1);

    board[r][c] = saved; // restore (backtrack)
    return found;
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}

if (require.main === module) {
  const board = [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ];
  console.log(exist(board, 'ABCCED')); // true
  console.log(exist(board, 'SEE')); // true
  console.log(exist(board, 'ABCB')); // false (can't reuse the B)
}
