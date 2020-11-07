import { Container } from '@material-ui/core'
import React, { useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import Company from './Company'
import Header from './Header'
import Search from './Search'
import Working from './Working'

const transport = axios.create({
  withCredentials: true,
});

const HomePage = () => {
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
    <>
      <Container>
        <Header setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} />
        <Search />
        <Company />
        <Working />
      </Container>
      <div id="footer-image" />
    </>
  )
}

export default HomePage
