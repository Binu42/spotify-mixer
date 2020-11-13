import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import PlaylistCard from './PlaylistCard';
import { Container, Grid, IconButton, InputBase, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MdSearch } from 'react-icons/md';
import { Redirect } from 'react-router-dom';

const transport = axios.create({
  withCredentials: true,
});

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
  }
}))

function Playlist() {
  const classes = useStyles();
  const [accessToken] = useState(Cookies.get('access_token'));
  const [playlists, setPlaylists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (accessToken) {
      let url = process.env.REACT_APP_API_URL + '/playlists';

      transport.get(url).then(
        (response) => {
          setPlaylists(response.data.playlists);
          setFilteredPlaylists(response.data.playlists);
          setLoading(false);
        }
      );
    }
  }, []);

  if (!accessToken) {
    return <Redirect to="/" />;
  }

  const filter = (searchTerm) => {
    setFilteredPlaylists(playlists.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  return (
    <Container>

      <Typography variant="h4" style={{ color: "#fff", textAlign: 'center' }}> Select playlist </Typography>
      <br />

      <Grid container justify="center">
        <Grid item>
          <Paper component="form" className={classes.root}>
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <MdSearch className={classes.icon} />
            </IconButton>
            <InputBase
              onChange={e => filter(e.target.value)}
              className={classes.input}
              placeholder="Type in any song, playlists or artists"
              inputProps={{ 'aria-label': 'type in any song, playlists or artists' }}
            />
          </Paper>
        </Grid>
      </Grid>

      <br />
      <div>
        <Grid container spacing={2} justify="center">
          {loading && <>
            <PlaylistCard loading={true} />
            <PlaylistCard loading={true} />
            <PlaylistCard loading={true} />
          </>}
          {filteredPlaylists &&
            filteredPlaylists.map((item) => {
              return <PlaylistCard playlist={item} key={item.id} />;
            })}
          {
            filteredPlaylists && filteredPlaylists.length === 0 && <Typography variant="h5" style={{ color: "#fff", textAlign: 'center' }}>No playlist exist</Typography>
          }
        </Grid>
      </div>
    </Container>
  );
}

export default Playlist;