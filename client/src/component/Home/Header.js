import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react'
import Cookies from 'js-cookie';
import SpotifyBtn from '../Common/Button/SpotifyBtn'

const useStyles = makeStyles((theme) => ({
  header: {
    padding: '2rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem 0.8rem',
    }
  },
  BrandName: {
    fontWeight: 500,
    fontSize: '1.8rem',
    lineHeight: '35px',
    letterSpacing: '0.4em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem'
    }
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const accessToken = Cookies.get('access_token');
  const isLoggedIn = accessToken && accessToken !== '';

  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('userID');

    props.setAccessToken && props.setAccessToken(null);
    props.setRefreshToken && props.setRefreshToken(null);

    window.location = '/';
  };

  const login = () => {
    const URI = process.env.REACT_APP_API_URL;
    window.location = `${URI}/login`;
  };

  return (
    <div className={classes.header}>
      <Grid justify="space-between" alignContent="center" wrap='nowrap' container spacing={0}>
        <Grid item>
          <Typography className={"text-white " + classes.BrandName}>TECHNOFY</Typography>
        </Grid>
        <Grid item>
          <SpotifyBtn handleOnClick={isLoggedIn ? logout : login} label={isLoggedIn ? "LogOut" : "Login"} />
        </Grid>
      </Grid>
    </div>
  )
}

export default Header
