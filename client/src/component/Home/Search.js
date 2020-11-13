import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import Cookies from 'js-cookie';
import SpotifyBtn from '../Common/Button/SpotifyBtn';
import { withRouter } from 'react-router-dom';
import SearchSeeds from '../Common/SearchSeeds';

const useStyles = makeStyles((theme) => ({
  searchHelper: {
    fontWeight: 200,
    fontSize: '1.2rem',
    lineHeight: '35px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem'
    }
  },
  search: {
    position: "relative",
    '&::before': {
      content: "'1'",
      position: 'absolute',
      fontWeight: 300,
      fontSize: '10rem',
      lineHeight: '234px',
      color: 'rgba(255, 255, 255, 0.1)',
      top: '-30%',
      left: "10%",
      zIndex: - 1,
    }
  }
}));

function Search(props) {
  const classes = useStyles();
  const [accessToken] = useState(Cookies.get('access_token'));

  const handleSelectFromPlaylist = () => {
    if (!accessToken) {
      const URI = process.env.REACT_APP_API_URL;
      window.location = `${URI}/login?redirectTo=playlists`;
    } else {
      props.history.push('/playlists');
    }
  }

  return (
    <Box pt={10}>
      <Grid className={classes.search} direction="column" container justify="center" alignContent="center">
        <Grid item>
          <Box pb={1}>
            <Typography className={"text-white " + classes.searchHelper}>Discover new tracks based on playlists you like </Typography>
          </Box>
        </Grid>
        <Grid item>
          <SearchSeeds />
        </Grid>
        <Grid item>
          <Box pt={2}>
            <SpotifyBtn handleOnClick={handleSelectFromPlaylist} label="Select from my playlists" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default withRouter(Search);