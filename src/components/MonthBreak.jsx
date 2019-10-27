import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const formatter = new Intl.DateTimeFormat('en-us', { month: 'short' });


export default function MonthBreak({ date }) {
    return (
        <React.Fragment>
            <Typography component='h1' variant='h6'>
                {formatter.format(date)} {date.getFullYear()}
            </Typography>
        </React.Fragment>
    );
}