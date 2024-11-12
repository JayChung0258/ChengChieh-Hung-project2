import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button, Typography } from '@mui/material';
import { GameContext } from '../context/GameContext';
import Cell from './Cell';

const Game = () => {
    const { difficulty } = useParams();
    const { gameState, setGameState } = useContext(GameContext);

    useEffect(() => {
        initializeGame();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [difficulty]);

    useEffect(() => {
        let timer;
        if (gameState.status === 'playing') {
            timer = setInterval(() => {
                setGameState(prevState => ({
                    ...prevState,
                    time: prevState.time + 1,
                }));
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameState.status, setGameState]);

    const initializeGame = () => {
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

        // Initialize grid structure without mines
        const grid = Array(rows)
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

        setGameState({
            grid,
            status: 'playing',
            difficulty,
            firstClick: true,
            flags: 0,
            mineCount: mines,
            time: 0,
        });
    };

    const renderGrid = () => {
        if (!gameState.grid.length) return null;
        return gameState.grid.map((row, rIdx) => (
            <div key={rIdx} style={{ display: 'flex' }}>
                {row.map((cell, cIdx) => (
                    <Cell key={cIdx} row={rIdx} col={cIdx} />
                ))}
            </div>
        ));
    };

    const handleReset = () => {
        initializeGame();
        localStorage.removeItem('gameState'); // Clear saved state
    };

    return (
        <Container style={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
                {gameState.status === 'won' && 'Game Over! You Won!'}
                {gameState.status === 'lost' && 'Game Over! You Lost!'}
                {gameState.status === 'playing' && 'Good Luck!'}
            </Typography>
            <Typography variant="h6">
                Mines Remaining: {gameState.mineCount - gameState.flags}
            </Typography>
            <Typography variant="h6">
                Time: {gameState.time} seconds
            </Typography>
            <Button variant="contained" color="primary" onClick={handleReset} style={{ margin: '10px' }}>
                Reset
            </Button>
            <div style={{ display: 'inline-block', marginTop: '20px' }}>{renderGrid()}</div>
        </Container>
    );
};

export default Game;
