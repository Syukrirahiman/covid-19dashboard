
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter, useHistory } from "react-router";
import { Link } from "react-router-dom";


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const tabs = [{name: 'Statistic', pathname: '/statistic'}, {name: 'Countries', pathname: '/countries'}, {name: 'History', pathname: '/history'},]

function Navbar() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const history = useHistory();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleRedirect = (pathName) => {
        history.push(pathName)
    }


    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" className={classes.title}>
                        Covid-19 Dashboard
                </Typography>
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>

            <div>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        {tabs.map((currTab, index) => (
                            <Tab component = {Link} label={currTab.name} {...a11yProps(index)} to ={currTab.pathname}/>
                        ))}
                    </Tabs>
                </AppBar>
            </div>
        </React.Fragment>
    )
}

export default withRouter(Navbar);