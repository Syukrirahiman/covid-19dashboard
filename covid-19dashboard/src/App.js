import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'assets/css/App.css';

import theme from 'theme';
import { withStyles } from '@material-ui/core/styles';
import Navbar from 'view/Navbar';
import StatisticView from 'view/StatisticView';
import LoginView from 'view/LoginView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: null,
      user: null
    }
  }

  componentDidMount() {
    this.userCollector();
  }

  async tokenExpired(userId) {
    let userStatus = {
      expired: true,
      resetPw: false
    }

    // await api.getUser(userId)
    //   .then((response) => {
    //     userStatus.expired = false
    //     userStatus.resetPw = response[0].resetPassword
    //     this.setState({
    //       user: response[0]
    //     })

    //   }).catch((error) => {
    //   })

    if (userId !== undefined){
      userStatus.expired = false
    }
    return userStatus;
  }

  async userCollector() {
    let userId = Cookies.get('user_id')
    let userStatus = await this.tokenExpired(userId);
    let tokenExpired = userStatus.expired;
    let resetPassword = userStatus.resetPW;

    if (userId && !tokenExpired) {
      if (resetPassword) {
        this.setState({
          login: false
        })

      } else {
        this.setState({
          login: true
        })
      }

    } else {
      this.setState({
        login: false,
      })
    }
  }


  render() {
    const { classes } = this.props;
    const handleLoginSuccess = (user) => {
      var userId = user.id;
      Cookies.set('user_id', userId);
      this.userCollector()
    }
    const handleLogoutSuccess = () => {
      this.setState({ login: false })
      Cookies.remove('user_id');
    }

    return (
      <ThemeProvider theme={theme}>
        {
          this.state.login !== null && (!this.state.login ?
            <Router>
              <Redirect to={{ pathname: '/login' }} />
              <Route path="/login">
                <LoginView handleLoginSuccess={handleLoginSuccess} />
              </Route>
            </Router>
            : <Router>
              <Navbar />
              <div className={classes.main}>
                <Switch>
                  <Route exact path="/" render={() => <Redirect to="/covid-dashboard/" />} />
                  {/* <Route path="/covid-dashboard/:country" component={SearchCountryView} /> */}
                  <Route path="/statistic" component={StatisticView} />
                </Switch>
              </div>
            </Router>
          )
        }
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
