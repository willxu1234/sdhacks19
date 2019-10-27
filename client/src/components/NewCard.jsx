import React from 'react';
import { Card, CardContent, CardMedia, CardActionArea, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
});

export default function JournalCard() {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Monday"
                    height="140"
                    src="https://cdn.mindful.org/how-to-meditate.jpg?q=80&fm=jpg&fit=crop&w=1920&h=1080"
                    title="Monday"
                />
            </CardActionArea>
        </Card>

    );

}