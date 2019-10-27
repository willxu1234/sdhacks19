import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 275,
        minHeight: 275,
        maring: theme.spacing(2),
        boxShadow: props => `0 3px 10px 2px rgba(${props.r}, ${props.g}, ${props.b}, 0.7)` //'0 3px 5px 2px rgba(255, 105, 135, .3)',
    }
}));

const JournalCard = ({ pic, title, onClick, moodColor }) => {
    const classes = useStyles(moodColor);

    function handleClick() {
        onClick();
    }

    return (
        <Card className={classes.card}>
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    component="img"
                    alt={title}
                    height="275"
                    src={pic}
                    title={title}
                />
            </CardActionArea>
        </Card >

    );

}

JournalCard.propTypes = {
    pic: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    moodColor: PropTypes.object.isRequired
};

export default JournalCard;