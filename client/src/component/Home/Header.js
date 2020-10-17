import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import React from 'react'
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

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <Grid justify="space-between" alignContent="center" wrap='nowrap' container spacing={0}>
        <Grid item>
          <Typography className={"text-white " + classes.BrandName}>TECHNOFY</Typography>
        </Grid>
        <Grid item>
          <SpotifyBtn label="Login" />
        </Grid>
      </Grid>
    </div>
  )
}

export default Header
