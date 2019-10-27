import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardActionArea, Typography } from '@material-ui/core';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

const lowOpacityTheme = createMuiTheme({
    // ...theme,
    palette: {
        action: {
            hoverOpacity: "0.7",
        }
    },
});

const useStyles = makeStyles(theme => ({
    card: {
        margin: "0 theme.spacing(2)",
        // margin: "0 1rem",
        // opacity: "0.8",
        boxShadow: props => `0 3px 10px 4px rgba(${props.r}, ${props.g}, ${props.b}, 0.7)` //'0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    typography: {
        position: "absolute",
        color: "white",
        top: "1rem",
        left: "1rem",
        paddingRight: "1rem",
        zIndex: "500",
    }
}));

const JournalCard = ({ pic, time, title, onClick, moodColor }) => {
    const [showText, setShowText] = React.useState(false);

    const classes = useStyles(moodColor);

    function handleClick() {
        onClick();
    }

    function handleMouseEnter() {
        setShowText(true);
    }

    function handleMouseLeave() {
        setShowText(false);
    }

    return (
        <ThemeProvider theme={lowOpacityTheme}>
            <Card className={classes.card}>
                <CardActionArea
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={classes.Area}
                >
                    {showText &&
                        <div className={classes.typography}>
                            <Typography component="h2" variant="h4">
                                {title}
                            </Typography>
                            <Typography component="h3" variant="subtitle1">
                                {(new Date(time)).toLocaleString()}
                            </Typography>
                        </div>
                    }
                    <CardMedia
                        component="img"
                        alt={title}
                        height="275"
                        src={pic}
                        title={title}
                    />
                </CardActionArea>
            </Card >
        </ThemeProvider>
    );

}

JournalCard.propTypes = {
    pic: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    moodColor: PropTypes.object.isRequired
};

export default JournalCard;