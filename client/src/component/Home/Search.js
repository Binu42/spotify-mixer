import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, IconButton, Box, Grid, Typography } from '@material-ui/core';
import { MdSearch } from 'react-icons/md'
import SpotifyBtn from '../Common/Button/SpotifyBtn';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.21)',
    width: 600,
    [theme.breakpoints.down('sm')]: {
      width: 350
    }
  },
  input: {
    marginLeft: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.6)',
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  searchHelper: {
    fontWeight: 200,
    fontSize: '1.2rem',
    lineHeight: '35px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem'
    }
  }
}));

export default function Search() {
  const classes = useStyles();

  return (
    <Box pt={10}>
      <Grid direction="column" container justify="center" alignContent="center">
        <Grid item>
          <Box pb={1}>
            <Typography className={"text-white " + classes.searchHelper}>Discover new tracks based on playlists you like </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Paper component="form" className={classes.root}>
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <MdSearch className={classes.icon} />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Type in any song, playlists or artists"
              inputProps={{ 'aria-label': 'type in any song, playlists or artists' }}
            />
          </Paper>
        </Grid>
        <Grid item>
          <Box pt={2}>
            <SpotifyBtn label="Select from my playlists" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
