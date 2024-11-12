import React, { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

const GameProvider = ({ children }) => {
    const [gameState, setGameState] = useState({
        grid: [],
        status: 'playing', // 'playing', 'won', 'lost'
        difficulty: 'easy',
        firstClick: true, // Ensures the first click is safe
        flags: 0, // Number of flags placed
        mineCount: 10, // Total mines based on difficulty
        time: 0, // Timer (optional)
    });

    // Load saved game state on mount
    useEffect(() => {
        const savedState = localStorage.getItem('gameState');
        if (savedState) {
            setGameState(JSON.parse(savedState));
        }
    }, []);

    // Save game state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('gameState', JSON.stringify(gameState));
    }, [gameState]);

    return (
        <GameContext.Provider value={{ gameState, setGameState }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameProvider;
