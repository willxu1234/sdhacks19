import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        border: 0,
        borderRadius: 3,
        textAlign: 'center',
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        padding: '0 30px',
        margin: '20px'
    },
});

export default function Header({ message }) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Container maxWidth="xl">
                <Typography variant="h2" component="h1" className={classes.root}>
                    {message}
                </Typography>
            </Container>
        </React.Fragment>
    );
}