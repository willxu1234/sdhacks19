import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Grid, Paper } from '@material-ui/core';
import PastEntry from './PastEntry.jsx';
import JournalEditor from './JournalEditor.jsx';
import MonthBreak from './MonthBreak.jsx';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
    root: {
        margin: "0 2vw",
        padding: theme.spacing(4)
    }
}));

const QUESTIONS = [
    "How did you feel today?",
    "What do you want to do tomorrow?",
    "LOL idk this is a very long question to test if the styling works please ignore or if you feel like answering please tell me what your favorite fruit is. Rules: it cannot be pineapple, or apple, or anything that is not watermelon because watermelon is the only correct answer. Choose carefully. LOL idk this is a very long question to test if the styling works please ignore or if you feel like answering please tell me what your favorite fruit is. Rules: it cannot be pineapple, or apple, or anything that is not watermelon because watermelon is the only correct answer. Choose carefully.",
    "What did you do today?",
]

export default function JournalGrid({ entries, onAdd }) {
    const classes = useStyles();

    const items = []

    if (entries.length > 0) {

        entries.sort(function (a, b) {
            return b.time - a.time;
        });

        const now = new Date();
        let lastMonth = Infinity;
        let numElems = 0;

        for (let i = 0; i < entries.length; ++i) {
            const entryDate = new Date(entries[i].time);
            const thisMonth = entryDate.getFullYear() * 12 + entryDate.getMonth();
            console.log(entries[i].time);
            if (lastMonth > thisMonth) {
                items.push(
                    <Grid key={"grid" + numElems++} item xs={12}>
                        <MonthBreak date={entryDate} />
                    </Grid >
                );
                if (i === 0) {
                    items.push(
                        <Grid key={"grid" + numElems++} item xs={12} md={4} lg={3}>
                            <JournalEditor questions={QUESTIONS} onAdd={onAdd} />
                        </Grid >
                    );
                }
                lastMonth = thisMonth;
            }
            items.push(
                <Grid key={"grid" + numElems++} item xs={12} md={4} lg={3}>
                    <PastEntry entry={entries[i]} />
                </Grid >
            );
        }
    } else {
        return (
            <Grid item xs={12} md={4} lg={3}>
                <JournalEditor questions={QUESTIONS} onAdd={onAdd} />
            </Grid >
        )
    }

    return (
        <Paper className={classes.root} >
            <Grid container spacing={3}>
                {items}
            </Grid>
        </Paper >
    );
}

JournalGrid.propTypes = {
    entries: PropTypes.array
};