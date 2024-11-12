import React from 'react';
import { Typography, Container, List, ListItem, ListItemText } from '@mui/material';

const Rules = () => {
    return (
        <Container style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                How to Play Minesweeper
            </Typography>
            <Typography variant="body1" paragraph>
                Minesweeper is a classic puzzle game where the objective is to clear a rectangular board containing hidden "mines" without detonating any of them, with help from clues about the number of neighboring mines in each field.
            </Typography>
            <List>
                <ListItem>
                    <ListItemText primary="1. The board is made up of squares, some of which contain mines." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="2. Clicking on a square reveals what is underneath. If it's a mine, you lose." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="3. If it's a number, it indicates how many mines are adjacent to that square." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="4. Use logic to deduce where the mines are and reveal all safe squares to win the game." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="5. You can right-click to flag squares you suspect contain mines." />
                </ListItem>
            </List>
            <Typography variant="body1" paragraph>
                Good luck and have fun!
            </Typography>
        </Container>
    );
};

export default Rules;
