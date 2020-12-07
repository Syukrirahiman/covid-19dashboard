import React, { Component } from 'react'
import axios from "axios";
export default class Statistic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        this._fetchStatisticData();
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

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}
