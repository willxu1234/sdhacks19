import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import JournalCard from './JournalCard.jsx';

const colors = {
    happy: { r: 255, g: 222, b: 0 },
    sad: { r: 104, g: 130, b: 213 },
    love: { r: 255, g: 63, b: 63 },
    calm: { r: 121, g: 232, b: 158 },
}

export default function PastEntry({ entry }) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        console.log("here");
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <JournalCard
                pic={entry.imgURL}
                // pic="https://sdhacks19-journal.s3.us-west-2.amazonaws.com/3840x2161-2742903-your-name-4k-wallpaper-hd-top.jpg"
                title="Shopping"
                moodColor={colors.happy}
                onClick={handleClickOpen} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullScreen={fullScreen}
                maxWidth="lg"
                scroll="paper"
                fullWidth
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    {entry.keyword}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        <CloseIcon></CloseIcon>
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Delete
                    </Button>
                </DialogActions>
                <DialogContent>
                    <DialogContentText>
                        This was a post.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}