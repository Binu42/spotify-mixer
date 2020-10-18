import React, { Suspense, lazy } from 'react';
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import theme from "./Theme";
import GlobalStyles from "./GlobalStyles";
import Spinner from './component/Common/Spinner/Spinner';
import HomePage from './component/Home';
import Playlist from './component/Playlist';

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/playlist">
              <Playlist />
            </Route>
          </Switch>
        </Suspense>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
