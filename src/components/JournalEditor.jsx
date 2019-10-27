import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

    const [imgUrl, setImgUrl] = React.useState(undefined);

    const handleImageChange = (e) => {
        setImgUrl(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div>
            <Button className={classes.addBtn} onClick={handleClickOpen}>
                Write new entry
            </Button>
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
                        {imgUrl !== undefined && <img src={imgUrl} class={classes.imgPreview} alt="Your upload" />}
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
                                    <DialogContent>
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
                    <Button onClick={handleClose} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}