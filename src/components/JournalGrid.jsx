import AWS from 'aws-sdk';
import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import PastEntry from './PastEntry.jsx';
import JournalEditor from './JournalEditor.jsx';
import MonthBreak from './MonthBreak.jsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    root: {
        margin: "0 5rem",
    }
}));

const QUESTIONS = [
    "What did you do today?",
    "What are you doing tomorrow?",
    "LOL idk this is a very long question to test if the styling works please ignore or if you feel like answering please tell me what your favorite fruit is. Rules: it cannot be pineapple, or apple, or anything that is not watermelon because watermelon is the only correct answer. Choose carefully. LOL idk this is a very long question to test if the styling works please ignore or if you feel like answering please tell me what your favorite fruit is. Rules: it cannot be pineapple, or apple, or anything that is not watermelon because watermelon is the only correct answer. Choose carefully."
]

export default function JournalGrid({ data }) {
    const classes = useStyles();


    // const renderEntries = () => (
    //     // Loop through the entries and render a grid 
    //     for(i = 0; i < data.length; ++i) {

    //     }
    //     return entryGridItems;      ;
    return (
        <div class={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <MonthBreak date={new Date()}></MonthBreak>
                </Grid>
                {/* <Grid item xs={12} md={4} lg={3}> */}
                <Grid item>
                    <JournalEditor questions={QUESTIONS} />
                    {/* <Button variant="outlined" size="large" className={classes.addBtn}>
                        Large
                    </Button> */}
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <PastEntry />
                </Grid >
                <Grid item xs={12} md={4} lg={3}>
                    <PastEntry />
                </Grid >
                <Grid item xs={12} md={4} lg={3}>
                    <PastEntry />
                </Grid >
                <Grid item xs={12} md={4} lg={3}>
                    <PastEntry />
                </Grid >
                <Grid item xs={12}>
                    <MonthBreak date={new Date(2000, 2, 9)}></MonthBreak>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <PastEntry />m} />
                </Grid >
            </Grid>
        </div>
    );
}

JournalGrid.propTypes = {
    data: PropTypes.array
};