# Minesweeper

A simplified, interactive clone of the classic Minesweeper game built with React! Players can use logic to reveal safe cells and avoid hidden mines. Choose from different difficulty levels, save progress, and challenge yourself!

## Features

- **Difficulty Levels**: Easy, Medium, and Hard levels with varying grid sizes and mine counts.
- **Safe First Click**: Ensures that the first click is always safe (contains no mine).
- **Flagging Mines**: Right-click or Shift+Click to flag cells suspected to contain mines.
- **Auto-clear**: Automatically clears adjacent cells when a cell with no adjacent mines is clicked.
- **Progress Saving**: Automatically saves the game state, allowing players to resume from where they left off.
- **Responsive Design**: Optimized for both mobile and desktop browsers.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Game Rules](#game-rules)
- [Available Scripts](#available-scripts)
- [Technologies Used](#technologies-used)
- [Troubleshooting](#troubleshooting)

## Installation

1. **Clone the repository**:

   ```bash
   git clone git@github.com:JayChung0258/ChengChieh-Hung-project2.git
   cd path_to_your_clone_project
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the application locally**:

   ```bash
   npm start
   ```

   This will start the development server on [http://localhost:3000](http://localhost:3000).

## Usage

1. **Difficulty Selection**: Choose from three difficulty levels:
   - Easy (8x8 grid, 10 mines)
   - Medium (16x16 grid, 40 mines)
   - Hard (30x16 grid, 99 mines)

2. **Game Actions**:
   - **Left Click**: Reveal a cell.
   - **Right Click or Shift+Click**: Flag a cell.
   - **Reset Button**: Start a new game with randomized mines.

3. **Game Status**:
   - Win by revealing all safe cells.
   - Lose by clicking on a mine, which reveals all mine locations.

## Game Rules

- The goal is to reveal all cells that don’t contain mines.
- Each cell displays the number of adjacent mines.
- Flag suspected mine cells to help you remember their location.
- Revealing a mine will end the game in a loss.

## Available Scripts

In the project directory, you can run:

- **`npm start`**: Runs the app in the development mode on [http://localhost:3000](http://localhost:3000).
- **`npm run build`**: Builds the app for production in the `build` folder.
- **`npm run serve`**: Serves the production build locally (requires `serve` package).
- **`npm test`**: Launches the test runner in the interactive watch mode.

## Technologies Used

- **React**: Frontend JavaScript library for building user interfaces.
- **React Router**: Manages routing within the app.
- **Material-UI (optional)**: Used for styling components.
- **LocalStorage**: Saves game progress so players can resume their game later.