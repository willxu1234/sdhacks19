import React from 'react';
import uploadFileToS3 from '../scripts/uploadFileToS3';
import runSentimentAnalysis from '../scripts/runSentimentAnalysis';
import runKeywordAnalysis from '../scripts/runKeywordAnalysis';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, useMediaQuery } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';
const URL = "http://localhost:5000/entries";

const useStyles = makeStyles(theme => ({
    addBtn: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        color: 'white',
        padding: '0 30px',
        width: "100%",
        minHeight: 275
    },
    addFab: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        position: 'fixed',
        zIndex: 100,
        color: 'white',
        bottom: "1rem",
        right: "1rem",
    },
    addIcon: {
        marginRight: theme.spacing(1)
    },
    addImageBtn: {
        borderRadius: 3,
        minWidth: 100,
        padding: '10px 30px',
    },
    imgPreview: {
        width: '90%',
        margin: '10px'
    },
    dialogFormBody: {
        display: 'flex',
        alignItems: 'center'
    },
    dialogInsertImage: {
        maxWidth: 250,
        textAlign: 'center',
    },
    input: {
        display: 'none'
    }
}));

export default function JournalEditor({ questions /* array of strings */, onAdd }) {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        imgUrl && window.URL.revokeObjectURL(imgUrl);
        setImgUrl(undefined);
    };

    const addEntry = async (newEntry) => {
        try {
            const resp = await axios.post(URL, { ...newEntry });
            console.log("POST REQUEST:");
            console.log(resp);
            onAdd(newEntry);
        } catch (err) {
            console.log('addEntry', err);
        }
    }

    const handleSubmit = async () => {
        if (imgFile) {
            const journalText = Object.values(answers).reduce((t, acc) => acc + " " + t, "");
            Promise.all([
                uploadFileToS3(imgFile),
                runKeywordAnalysis(journalText),
                runSentimentAnalysis(journalText)
            ])
                .then(results => {
                    let highestConfidence = 0;
                    let keyword = "";
                    for (let i = 0; i < results[1].KeyPhrases.length; ++i) {
                        if (results[1].KeyPhrases[i].Score > highestConfidence) {
                            highestConfidence = results[1].KeyPhrases[i].Score;
                            keyword = results[1].KeyPhrases[i].Text;
                        }
                    }
                    let newEntry = {
                        time: (new Date()).getTime(),
                        imgUrl: results[0],
                        answers: Object.values(answers),
                        keyword: keyword,
                        SentimentScore: results[2].SentimentScore,
                        Sentiment: results[2].Sentiment,
                    }
                    addEntry(newEntry)
                    handleClose();
                })
                .catch(error => {
                    console.error(error.message);
                })
        }
    }

    const [imgUrl, setImgUrl] = React.useState(undefined);
    const [imgFile, setImgFile] = React.useState(undefined);
    const [answers, setAnswers] = React.useState({});

    const handleImageChange = (e) => {
        setImgFile(e.target.files[0]);
        setImgUrl(window.URL.createObjectURL(e.target.files[0]));
    }

    const handleTextChange = name => event => {
        setAnswers({ ...answers, [name]: event.target.value });
    };

    return (
        <div>
            <Button className={classes.addBtn} onClick={handleClickOpen}>
                Write new entry
            </Button>
            <Fab
                aria-label="add"
                className={classes.addFab}
                onClick={handleClickOpen}
                variant="extended"
            >
                <AddIcon className={classes.addIcon} /> Write new entry
            </Fab>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullScreen={fullScreen}
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle id="form-dialog-title">{(new Date()).toLocaleString()}</DialogTitle>
                <DialogContent className={fullScreen ? '' : classes.dialogFormBody}>
                    <DialogContent className={classes.dialogInsertImage}>
                        {imgUrl !== undefined && <img src={imgUrl} className={classes.imgPreview} alt="Your upload" />}
                        <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="raised-button-file">
                            <Button
                                className={classes.addImageBtn}
                                variant="outlined"
                                component="span"
                                startIcon={<InsertPhotoIcon fontSize="large" />}
                            >
                                Insert Image
                            </Button>
                        </label>
                    </DialogContent>
                    <DialogContent>
                        {
                            questions.map((question, idx) => {
                                return (
                                    <DialogContent key={idx}>
                                        <DialogContentText>
                                            {question}
                                        </DialogContentText>
                                        <TextField
                                            autoFocus={idx === 0}
                                            margin="dense"
                                            id={"ans" + idx}
                                            label="Answer"
                                            type="text"
                                            fullWidth
                                            variant="filled"
                                            multiline
                                            rowsMax="4"
                                            onChange={handleTextChange("ans" + idx)}
                                        />
                                    </DialogContent>
                                );
                            })
                        }
                    </DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}