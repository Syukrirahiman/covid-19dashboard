import React, { Component } from 'react'
import axios from "axios";

import { Grid, withStyles, InputLabel, MenuItem, Paper, FormControl, Select, Typography } from '@material-ui/core';


class Statistic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedData: null,
        }
    }

    componentDidMount() {
        this._fetchStatisticData();
    }

    onSorting = (data) => {
        let sortedList = data.sort((a, b) => {
        return (a['country'] <= b['country'] ? -1 : 1)
        });

        return sortedList
    }

    _fetchStatisticData = () => {
        const options = {
            method: 'GET',
            url: 'https://covid-193.p.rapidapi.com/statistics',
            headers: {
                'x-rapidapi-key': '20abfa9073msh424d1f742c0f240p1de7c6jsn6d5bd2fe379c',
                'x-rapidapi-host': 'covid-193.p.rapidapi.com'
            }
        };
        axios.request(options)
            .then((response) => {
                this.setState({
                    data: this.onSorting(response.data.response)
                })
            }).catch(function (error) {
                console.error(error);
            });
    }

    handleChange = (event) => {
        this.setState({
            selectedData: event.target.value
        })
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.selectedData)
        return (
            <React.Fragment>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Country</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.selectedData}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={null}><em>Select Country</em></MenuItem>
                            {this.state.data.map((entity, i) =>
                                (<MenuItem key={i} value={entity}>{entity.country}</MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </div>

                <div className={classes.body}>
                    {this.state.selectedData === null ?
                        <Typography align="center">
                            Please select a country to view statistic
                    </Typography>
                        :

                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={12}>
                                <Typography align="center" variant="h4">
                                    <p> {this.state.selectedData.country}</p>
                                </Typography>
                                <p align="center"> As of {this.state.selectedData.day}</p>
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <Typography align="center" variant="h5">
                                    Active Cases
                        </Typography>
                                <Typography align="center" variant="h6" >
                                    <p> {this.state.selectedData.cases.active} ({this.state.selectedData.cases.new} new cases)</p>
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <Typography align="center" variant="h5">
                                    Critical
                                </Typography>
                                <Typography align="center" variant="h6" className={classes.mainColor}>
                                    <p className={classes.critical}> {this.state.selectedData.cases.critical === null ? 0 : this.state.selectedData.cases.critical}</p>
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={3}>
                                <Typography align="center" variant="h5">
                                    Recovered
                                </Typography>
                                <Typography align="center" variant="h6" className={classes.mainColor}>
                                    <p> {this.state.selectedData.cases.recovered === null ? 0 : this.state.selectedData.cases.recovered}</p>
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <Typography align="center" variant="h5">
                                    Total Deaths
                                </Typography>
                                <Typography align="center" variant="h6" className={classes.mainColor}>
                                    <p className={classes.critical}> {this.state.selectedData.deaths.total === null ? 0 : this.state.selectedData.cases.critical}</p>
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                </div>
            </React.Fragment >
        )
    }
}

const styles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    body: {
        margin: theme.spacing(1),
    },
    critical: {
        color: "#f70008"
    }
});

export default withStyles(styles)(Statistic);