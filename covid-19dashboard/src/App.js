import React, { Component } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import 'assets/css/App.css';

import theme from "theme";
import Navbar from 'view/Navbar'
import StatisticView from 'view/StatisticView/StatisticView'

// function App() {
//   return (
//     <div className="App">
//       <StatisticView/>
//     </div>
//   );
// }

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
        </Router>
      </ThemeProvider>
    )
  }
}

export default App;
