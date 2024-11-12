import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { Button } from '@mui/material';
import { revealCell, revealAllMines } from '../utils/reveal';

const Cell = ({ row, col }) => {
    const { gameState, setGameState } = useContext(GameContext);
    const cell = gameState.grid[row][col];

    const handleClick = (e) => {
        e.preventDefault(); // Prevent default behavior for right-click
        if (gameState.status !== 'playing' || cell.revealed) return;

        // Determine if it's a flagging action
        if (e.type === 'contextmenu' || e.shiftKey) {
            toggleFlag();
            return;
        }

        // Handle first click to ensure it's safe
        if (gameState.firstClick) {
            const updatedGrid = initializeGrid(gameState.difficulty, row, col);
            setGameState({
                ...gameState,
                grid: updatedGrid,
                firstClick: false,
            });
            return;
        }

        // Reveal the cell
        if (cell.hasMine) {
            const updatedGrid = revealAllMines(gameState.grid);
            setGameState({
                ...gameState,
                grid: updatedGrid,
                status: 'lost',
            });
        } else {
            const updatedGrid = revealCell(gameState.grid, row, col);
            const allRevealed = updatedGrid.every(r =>
                r.every(c => c.revealed || c.hasMine)
            );
            setGameState({
                ...gameState,
                grid: updatedGrid,
                status: allRevealed ? 'won' : 'playing',
            });
        }
    };

    const toggleFlag = () => {
        if (cell.revealed) return;

        const updatedGrid = [...gameState.grid];
        updatedGrid[row][col].flagged = !updatedGrid[row][col].flagged;

        const flagChange = updatedGrid[row][col].flagged ? 1 : -1;

        setGameState({
            ...gameState,
            grid: updatedGrid,
            flags: gameState.flags + flagChange,
        });
    };

    const getCellContent = () => {
        if (cell.flagged) return '🚩';
        if (!cell.revealed) return null;
        if (cell.hasMine) return '💣';
        return cell.adjacentMines > 0 ? cell.adjacentMines : '';
    };

    const getCellStyle = () => {
        if (cell.flagged) return { backgroundColor: '#ffc107' };
        if (!cell.revealed) return { backgroundColor: '#ccc' };
        if (cell.hasMine) return { backgroundColor: 'red' };
        return { backgroundColor: '#e0e0e0' };
    };

    return (
        <Button
            onClick={handleClick}
            onContextMenu={handleClick} // Handle right-click
            onMouseDown={(e) => {
                if (e.shiftKey) handleClick(e);
            }}
            style={{
                width: '30px',
                height: '30px',
                minWidth: '30px',
                minHeight: '30px',
                padding: '0',
                margin: '1px',
                ...getCellStyle(),
                fontSize: '16px',
                fontWeight: 'bold',
                // backgroundColor: cell.hasMine ? 'orange' : 'grey', // debug usage
            }}
        >
            {getCellContent()}
        </Button>
    );
};

// Initialize the grid, ensuring the first click is safe
const initializeGrid = (difficulty, firstRow, firstCol) => {
    let rows, cols, mines;
    switch (difficulty) {
        case 'easy':
            rows = cols = 8;
            mines = 10;
            break;
        case 'medium':
            rows = cols = 16;
            mines = 40;
            break;
        case 'hard':
            rows = 16;
            cols = 30;
            mines = 99;
            break;
        default:
            rows = cols = 8;
            mines = 10;
    }

    // Initialize grid
    let grid = Array(rows)
        .fill(null)
        .map(() =>
            Array(cols)
                .fill(null)
                .map(() => ({
                    hasMine: false,
                    revealed: false,
                    adjacentMines: 0,
                    flagged: false,
                }))
        );

    // Place mines, ensuring the first clicked cell is safe
    let placedMines = 0;
    while (placedMines < mines) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        if (
            !grid[r][c].hasMine &&
            !(r === firstRow && c === firstCol)
        ) {
            grid[r][c].hasMine = true;
            placedMines++;
        }
    }

    // Calculate adjacent mines for each cell
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (!grid[r][c].hasMine) {
                grid[r][c].adjacentMines = countAdjacentMines(grid, r, c, rows, cols);
            }
        }
    }

    return grid;
};

// Calculate the number of adjacent mines for a given cell
const countAdjacentMines = (grid, r, c, rows, cols) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newRow = r + i;
            const newCol = c + j;
            if (
                newRow >= 0 &&
                newRow < rows &&
                newCol >= 0 &&
                newCol < cols &&
                grid[newRow][newCol].hasMine
            ) {
                count++;
            }
        }
    }
    return count;
};

export default Cell;
