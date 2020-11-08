import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Paper, InputBase, IconButton, Box, Grid, Divider, Switch, Typography, Button } from '@material-ui/core';
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
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(prev => !prev);
  }

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
              placeholder={`Search by ${isChecked ? 'Artist' : 'Track'}`}
              inputProps={{ 'aria-label': 'type in any song, playlists or artists' }}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <Typography component="div" color="secondary">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Artist</Grid>
                <Grid item>
                  <Switch size="small" checked={isChecked} onChange={handleChange} color="primary" name="artistSwitch" />
                </Grid>
                <Grid item>Track</Grid> |
                <Button onClick={e => setIsChecked(false)} style={{ textTransform: "capitalize" }} color="secondary">Reset</Button>
              </Grid>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
