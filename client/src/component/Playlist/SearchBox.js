import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, IconButton, Box, Grid } from '@material-ui/core';
import { MdSearch } from 'react-icons/md'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.21)',
    width: "100%"
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
  }
}));

export default function SearchBox() {
  const classes = useStyles();

  return (
    <Box pt={2}>
      <Grid className={classes.search} direction="column" container justify="center" alignContent="center">
        <Grid item xs={12} style={{ width: '100%' }}>
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
      </Grid>
    </Box>
  );
}
