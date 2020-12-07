import React from 'react'
import Paper from '@material-ui/core/Paper';
import Statistic from 'components/Statistic/Statistic.js';
import { makeStyles } from "@material-ui/core";

function StatisticView() {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <div className={classes.statistic_wrapper}>
                <Statistic />
            </div>
        </Paper>
    )
}

const useStyles = makeStyles({
    statistic_wrapper: {
        margin: '40px 36px',
    },
    paper: {
        // maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',
    },
})

export default StatisticView;