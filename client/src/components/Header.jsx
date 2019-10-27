import React from 'react';
import colors from '../scripts/colors'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container, Chip, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        border: 0,
        borderRadius: 3,
        textAlign: 'center',
        color: 'black',
        margin: '20px 0',
        display: 'flex',
        justifyContent: 'center',
        '& > *': {
            margin: "0.2rem",
        },
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
            <Container maxWidth="xl" className={classes.root}>
                {
                    Object.keys(colors).map((mood, index) => {
                        const color = colors[mood];
                        return (
                            <Chip
                                size="medium"
                                label={mood}
                                // variant="outlined"
                                style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`, color: "white" }}
                            />
                        );
                    })
                }
            </Container>
        </React.Fragment>
    );
}