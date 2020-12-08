import React from 'react';
import AddNew from 'components/AddNew';
import { makeStyles, Paper } from '@material-ui/core';

function AddNewView() {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.paper}>
                <div className={classes.addnew_wrapper}>
                    <AddNew/>
                </div>
            </Paper>
        </div>
    )
}

const useStyles = makeStyles({
    addnew_wrapper: {
        margin: '40px 36px',
    },
    paper: {
        // maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',
    },
})

export default AddNewView;