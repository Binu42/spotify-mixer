import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MdSearch } from 'react-icons/md'
import Cookies from 'js-cookie';
import { InputBase, IconButton, ListItemText, Avatar, Hidden, Divider, Typography, Grid, Switch, Button } from '@material-ui/core';
import { search, extractArtistInfo, extractTrackInfo, extractPlaylistInfo } from '../../utils/spotify';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme, isResult) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    borderRadius: 5,
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
  },
  autoCompleteBg: {
    background: '#373333',
    color: '#fff'
  }
}));

const SearchSeeds = (props) => {
  const classes = useStyles();
  const [accessToken] = useState(Cookies.get('access_token'));
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [seed, setSeed] = useState(null);
  const [playlistSeed, setPlaylistSeed] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);

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

  const addSeed = option => {
    if (props && props.addSeed) {
      props.addSeed(option);
    } else {
      if (option)
        if (option.type === 'Playlist') {
          setPlaylistSeed(option);
        } else if (option.type === 'Tracks') {
          setSeed({ artists: [], tracks: [option] });
        } else {
          setSeed({ artists: [option], tracks: [] });
        }
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

  if (playlistSeed) {
    return (
      <Redirect
        to={{
          pathname: '/results',
          state: {
            playlist: {
              id: playlistSeed.id,
              name: playlistSeed.name,
              image: playlistSeed.image,
            },
          },
        }}
      />
    );
  }

  if (seed) {
    return (
      <Redirect
        to={{
          pathname: '/results',
          state: { seed },
        }}
      />
    );
  }

  return (
    <Autocomplete
      noOptionsText="Type to search"
      id="Search"
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
      filterOptions={(x) => x}
      options={options}
      groupBy={(option) => option.type}
      autoComplete
      onChange={(event, value) => addSeed(value)}
      includeInputInList
      filterSelectedOptions
      onClose={() => setIsAutoCompleteOpen(false)}
      value={inputValue}
      onOpen={() => setIsAutoCompleteOpen(true)}
      classes={{ groupLabel: classes.autoCompleteBg, paper: classes.autoCompleteBg, noOptions: classes.autoCompleteBg }}
      open={options && options.length && isAutoCompleteOpen ? true : false}
      onInputChange={(event, newInputValue) => {
        searchSpotify(newInputValue);
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <div ref={params.InputProps.ref} component="form" style={{ width: props.isResult && '100%' }} className={classes.root}>
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <MdSearch className={classes.icon} />
          </IconButton>
          <InputBase
            {...params.inputProps}
            className={classes.input}
            placeholder={props.isResult ? "Type in any songs or artists" : "Type in any song, playlists or artists"}
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
  )
}

export default SearchSeeds;
