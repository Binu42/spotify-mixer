import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputBase, IconButton, Box, Grid, Typography, ListItemText, Avatar } from '@material-ui/core';
import { MdSearch } from 'react-icons/md'
import Cookies from 'js-cookie';
import SpotifyBtn from '../Common/Button/SpotifyBtn';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withRouter } from 'react-router-dom';
import { search, extractArtistInfo, extractTrackInfo, extractPlaylistInfo } from '../../utils/spotify';

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
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [seed, setSeed] = useState(null);
  const [playlistSeed, setPlaylistSeed] = useState(null);

  const handleSelectFromPlaylist = () => {
    if (!accessToken) {
      const URI = process.env.REACT_APP_API_URL;
      window.location = `${URI}/login?redirectTo=playlists`;
    } else {
      props.history.push('/playlists');
    }
  }

  const searchSpotify = async (searchTerm) => {
    if (searchTerm && searchTerm.length > 0) {
      let { artists, tracks, playlists } = await search(accessToken, searchTerm);

      artists = artists.map(extractArtistInfo);
      tracks = tracks.map(extractTrackInfo);
      playlists = playlists.map(extractPlaylistInfo);

      setArtists(artists);
      setTracks(tracks);
      setPlaylists(playlists);
    }
  };

  const options = [
    ...(!props || !props.addSeed
      ? [
        ...playlists,
        ...artists,
        ...tracks
      ]
      : [
        ...artists,
        ...tracks
      ])
  ];

  return (
    <Box pt={10}>
      <Grid className={classes.search} direction="column" container justify="center" alignContent="center">
        <Grid item>
          <Box pb={1}>
            <Typography className={"text-white " + classes.searchHelper}>Discover new tracks based on playlists you like </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Autocomplete
            id="Search"
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
            filterOptions={(x) => x}
            options={options}
            groupBy={(option) => option.type}
            autoComplete
            includeInputInList
            filterSelectedOptions
            onInputChange={(event, newInputValue) => {
              searchSpotify(newInputValue);
            }}
            renderInput={(params) => (
              <div ref={params.InputProps.ref} component="form" className={classes.root}>
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                  <MdSearch className={classes.icon} />
                </IconButton>
                <InputBase
                  {...params.inputProps}
                  className={classes.input}
                  placeholder="Type in any song, playlists or artists"
                  inputProps={{ 'aria-label': 'type in any song, playlists or artists' }}
                />
              </div>
            )}
            renderOption={(option) => {
              return (
                <>
                  <Avatar alt={option.name} src={option.image} /> &emsp;
                  <ListItemText primary={option.name} />
                </>
              );
            }}
          />

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