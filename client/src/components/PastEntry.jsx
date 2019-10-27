import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, useMediaQuery } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import JournalCard from './JournalCard.jsx';
import getColorFromSentiment from '../scripts/getColorFromSentiment'

const useStyles = makeStyles(theme => ({
    imgPreview: {
        // width: '90%',
        maxWidth: '70%',
        margin: '10px'
    },
    dialogFormBody: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    dialogImage: {
        minWidth: 200,
        textAlign: 'center',
    },
}));

export default function PastEntry({ entry }) {
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        console.log("here");
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    let responseStr = "";
    if (entry.answers) {
        // for (let i = 0; i < entry.answers; ++i) {
        for (let i = 0; i < entry.answers.length; ++i) {
            console.log("here");
            responseStr = responseStr + (entry.answers[i] + "\n");
        }
    }

    console.log(entry);

    return (
        <div>
            <JournalCard
                pic={entry.imgUrl}
                title={entry.keyword}
                time={entry.time}
                moodColor={getColorFromSentiment(responseStr, entry.Sentiment)}
                onClick={handleClickOpen} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullScreen={fullScreen}
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle id="form-dialog-title">
                    {entry.keyword} - {(new Date(entry.time)).toLocaleString()}
                </DialogTitle>
                <DialogContent className={fullScreen ? '' : classes.dialogFormBody}>
                    <DialogContent className={classes.dialogImage}>
                        <img src={entry.imgUrl} className={classes.imgPreview} alt="Your upload" />
                        <DialogContent>
                            <DialogContentText>
                                <Typography component="p" variant="h5">
                                    {responseStr}
                                </Typography>
                            </DialogContentText>
                        </DialogContent>
                    </DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        <CloseIcon />
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}