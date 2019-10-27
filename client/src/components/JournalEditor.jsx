import React from 'react';
import uploadFileToS3 from '../scripts/uploadFileToS3';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    addBtn: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        color: 'white',
        padding: '0 30px',
        minWidth: 275,
        minHeight: 275
    },
    addFab: {
        position: 'fixed',
        zIndex: 100,
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
        minWidth: 200,
        textAlign: 'center',
    },
    input: {
        display: 'none'
    }
}));

export default function JournalEditor({ questions /* array of strings */ }) {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setImgUrl(undefined);
    };

    const handleSubmit = () => {
        handleClose();
        if (imgFile) {
            return uploadFileToS3(imgFile);
            // return uploadFileToS3(imgFile).then(val => {
            //     console.log(val);
            // });
        }
    }

    const [imgUrl, setImgUrl] = React.useState(undefined);
    const [imgFile, setImgFile] = React.useState(undefined);

    const handleImageChange = (e) => {
        setImgUrl(URL.createObjectURL(e.target.files[0]));
        setImgFile(e.target.files[0]);
    }

    return (
        <div>
            <Button className={classes.addBtn} onClick={handleClickOpen}>
                Write new entry
            </Button>
            <Fab
                color="primary"
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