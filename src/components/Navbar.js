// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="static" style={{ marginBottom: '20px' }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Minesweeper
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/rules">
                    Rules
                </Button>
                <Button color="inherit" component={Link} to="/game/easy">
                    Easy
                </Button>
                <Button color="inherit" component={Link} to="/game/medium">
                    Medium
                </Button>
                <Button color="inherit" component={Link} to="/game/hard">
                    Hard
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
