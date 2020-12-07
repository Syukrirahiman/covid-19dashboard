import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import 'assets/css/App.css';

import theme from 'theme';
import { withStyles } from '@material-ui/core/styles';
import Navbar from 'view/Navbar'
import StatisticView from 'view/StatisticView/StatisticView'

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <div className={classes.main}>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/covid-dashboard/" />} />
              {/* <Route path="/covid-dashboard/:country" component={SearchCountryView} /> */}
              <Route path="/statistic" component={StatisticView} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    )
  }
}

const styles = (theme) => ({
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1',
    minHeight: '80vh',
  }
});

export default withStyles(styles)(App);
