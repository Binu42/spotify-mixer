import React, { Suspense, lazy, useState } from 'react';
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import theme from "./Theme";
import GlobalStyles from "./GlobalStyles";
import Spinner from './component/Common/Spinner/Spinner';
import Header from './component/Common/Header'
import ScrollToTop from './component/Common/ScrollToTop';

const HomePage = lazy(() => import("./component/Home"));
const Result = lazy(() => import("./component/Result"));
const Playlist = lazy(() => import("./component/Playlist"));

const transport = axios.create({
  withCredentials: true,
});

function App() {
  const [accessToken, setAccessToken] = useState(Cookies.get('access_token'));
  const [refreshToken, setRefreshToken] = useState(Cookies.get('refresh_token'));

  const refresh = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + '/refresh';
      let response = await transport.get(url);
      let expiry_time = new Date(new Date().getTime() + response.data.maxAge);
      Cookies.set('access_token', response.data.access_token, { expires: expiry_time });
      setAccessToken(response.data.access_token);
    } catch (e) {
      setAccessToken(null);
      setRefreshToken(null);
    }
  };

  if (!accessToken && refreshToken) {
    refresh();
  }
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <ScrollToTop />
        <Header setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} />
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/playlists">
              <Playlist />
            </Route>
            <Route path="/results">
              <Result />
            </Route>
          </Switch>
        </Suspense>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
