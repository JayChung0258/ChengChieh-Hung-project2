export const revealCell = (grid, row, col) => {
    const rows = grid.length;
    const cols = grid[0].length;
    const newGrid = grid.map(r => r.map(c => ({ ...c })));

    const reveal = (r, c) => {
        if (
            r < 0 ||
            r >= rows ||
            c < 0 ||
            c >= cols ||
            newGrid[r][c].revealed ||
            newGrid[r][c].flagged
        ) {
            return;
        }

        newGrid[r][c].revealed = true;

        if (newGrid[r][c].adjacentMines === 0) {
            // Recursively reveal neighbors
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue;
                    reveal(r + i, c + j);
                }
            }
        }
    };

    reveal(row, col);
    return newGrid;
};

export const revealAllMines = (grid) => {
    return grid.map(row =>
        row.map(cell => ({
            ...cell,
            revealed: cell.hasMine ? true : cell.revealed,
        }))
    );
};
