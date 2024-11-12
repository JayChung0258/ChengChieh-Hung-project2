import React from 'react';
import { Typography, Container } from '@mui/material';

const Homepage = () => {
    return (
        <Container style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h2" gutterBottom>
                Minesweeper
            </Typography>
        </Container>
    );
};

export default Homepage;
