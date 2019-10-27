import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PastEntry from './PastEntry.jsx';
import JournalEditor from './JournalEditor.jsx';
import MonthBreak from './MonthBreak.jsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        margin: "0 5rem",
        padding: theme.spacing(4)
    }
}));

const QUESTIONS = [
    "What did you do today?",
    "What are you doing tomorrow?",
    "LOL idk this is a very long question to test if the styling works please ignore or if you feel like answering please tell me what your favorite fruit is. Rules: it cannot be pineapple, or apple, or anything that is not watermelon because watermelon is the only correct answer. Choose carefully. LOL idk this is a very long question to test if the styling works please ignore or if you feel like answering please tell me what your favorite fruit is. Rules: it cannot be pineapple, or apple, or anything that is not watermelon because watermelon is the only correct answer. Choose carefully."
]

const sampleEntry = {
    "time": 1572141478124,
    "imgURL": "https://i.pinimg.com/originals/18/4d/9d/184d9deff2f1ddf83afe1a02ab5560dd.gif",
    "ans": [
        "I saw a tree.",
        "It was cool.",
        "It had a lot of colors."
    ],
    "keyword": "Sunset Beach",
    "SentimentScore": {
        "Mixed": 0.030585512690246105,
        "Positive": 0.94992071056365967,
        "Neutral": 0.0141543131828308,
        "Negative": 0.00893945890665054
    },
    "Sentiment": "POSITIVE",
    "LanguageCode": "en"
}

export default function JournalGrid({ data }) {
    const classes = useStyles();

    const [imgUrls, setImgUrls] = React.useState([]);

    // const renderEntries = () => (
    //     // Loop through the entries and render a grid 
    //     for(i = 0; i < data.length; ++i) {

    //     }
    //     return entryGridItems;      ;
    return (
        <Paper className={classes.root}>
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
                    <PastEntry entry={sampleEntry} />
                </Grid >
                <Grid item xs={12} md={4} lg={3}>
                    <PastEntry entry={sampleEntry} />
                </Grid >
                <Grid item xs={12} md={4} lg={3}>
                    <PastEntry entry={sampleEntry} />
                </Grid >
                <Grid item xs={12} md={4} lg={3}>
                    <PastEntry entry={sampleEntry} />
                </Grid >
                <Grid item xs={12}>
                    <MonthBreak date={new Date(2000, 2, 9)}></MonthBreak>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <PastEntry entry={sampleEntry} />
                </Grid >
            </Grid>
        </Paper>
    );
}

JournalGrid.propTypes = {
    data: PropTypes.array
};