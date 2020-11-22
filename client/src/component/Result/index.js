import { Box, Container, Grid, Hidden } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import SearchSeeds from '../Common/SearchSeeds'
import SaveOnSpotify from './SaveOnSpotify'
import TrackListSettings from './TrackListSettings'
import Cookies from 'js-cookie';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import { authenticate, getRecommendations, getArtists, getTracks } from '../../utils/spotify.js';
import SongList from './SongList'

const transport = axios.create({
  withCredentials: true,
});

const checkStateStored = () => {
  return (
    localStorage.getItem('songs') &&
    localStorage.getItem('playlist') &&
    localStorage.getItem('name') &&
    localStorage.getItem('count') &&
    localStorage.getItem('popularity') &&
    localStorage.getItem('danceability') &&
    localStorage.getItem('energy') &&
    localStorage.getItem('acousticness') &&
    localStorage.getItem('valence') &&
    localStorage.getItem('tempo') &&
    localStorage.getItem('seeds') &&
    localStorage.getItem('seedColors')
  );
};

const Result = (props) => {
  const [accessToken] = useState(Cookies.get('access_token'));
  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('technofy');
  const [generatedPlaylistLink, setGeneratedPlaylistLink] = useState();
  const [error, setError] = useState(false);
  const initialFetchComplete = useRef(false);
  // Parameters
  const [count, setCount] = useState(25);
  const [popularity, setPopularity] = useState({ min: 0, max: 100 });
  const [danceability, setDanceability] = useState({ min: 0, max: 1 });
  const [energy, setEnergy] = useState({ min: 0, max: 1 });
  const [acousticness, setAcousticness] = useState({ min: 0, max: 1 });
  const [valence, setValence] = useState({ min: 0, max: 1 });
  const [tempo, setTempo] = useState({ min: 50, max: 200 });
  const [seeds, setSeeds] = useState();
  const [seedColors, setSeedColors] = useState({});

  const saveStateAndLogin = () => {
    localStorage.setItem('songs', JSON.stringify(songs));
    localStorage.setItem('playlist', JSON.stringify(playlist));
    localStorage.setItem('name', JSON.stringify(name));
    localStorage.setItem('count', JSON.stringify(count));
    localStorage.setItem('popularity', JSON.stringify(popularity));
    localStorage.setItem('danceability', JSON.stringify(danceability));
    localStorage.setItem('energy', JSON.stringify(energy));
    localStorage.setItem('acousticness', JSON.stringify(acousticness));
    localStorage.setItem('valence', JSON.stringify(valence));
    localStorage.setItem('tempo', JSON.stringify(tempo));
    localStorage.setItem('seeds', JSON.stringify(seeds));
    localStorage.setItem('seedColors', JSON.stringify(seedColors));

    const URI = process.env.REACT_APP_API_URL;
    window.location = `${URI}/login?redirectTo=results`;
  };

  const checkStateUpdatedFromStorage = () => {
    return (
      JSON.stringify(songs) === localStorage.getItem('songs') &&
      JSON.stringify(playlist) === localStorage.getItem('playlist') &&
      JSON.stringify(name) === localStorage.getItem('name') &&
      JSON.stringify(count) === localStorage.getItem('count') &&
      JSON.stringify(popularity) === localStorage.getItem('popularity') &&
      JSON.stringify(danceability) === localStorage.getItem('danceability') &&
      JSON.stringify(energy) === localStorage.getItem('energy') &&
      JSON.stringify(acousticness) === localStorage.getItem('acousticness') &&
      JSON.stringify(valence) === localStorage.getItem('valence') &&
      JSON.stringify(tempo) === localStorage.getItem('tempo') &&
      JSON.stringify(seeds) === localStorage.getItem('seeds') &&
      JSON.stringify(seedColors) === localStorage.getItem('seedColors')
    );
  };

  const restoreState = () => {
    setLoading(true);
    initialFetchComplete.current = false;

    setSongs(JSON.parse(localStorage.getItem('songs')));
    setPlaylist(JSON.parse(localStorage.getItem('playlist')));
    setName(JSON.parse(localStorage.getItem('name')));
    setCount(JSON.parse(localStorage.getItem('count')));
    setPopularity(JSON.parse(localStorage.getItem('popularity')));
    setDanceability(JSON.parse(localStorage.getItem('danceability')));
    setEnergy(JSON.parse(localStorage.getItem('energy')));
    setAcousticness(JSON.parse(localStorage.getItem('acousticness')));
    setValence(JSON.parse(localStorage.getItem('valence')));
    setTempo(JSON.parse(localStorage.getItem('tempo')));
    setSeeds(JSON.parse(localStorage.getItem('seeds')));
    setSeedColors(JSON.parse(localStorage.getItem('seedColors')));

    setLoading(false);
  };

  useEffect(() => {
    if (checkStateStored()) {
      restoreState();
    } else if (props?.location?.state?.seed) {
      initialFetchComplete.current = true;
      setSeeds(props.location.state.seed);
      setLoading(false);
    } else {
      (async () => {
        if (props?.location?.state?.playlist) {
          setPlaylist(props.location.state.playlist);
        }

        if (props?.location?.state?.playlist?.id || playlist?.id) {
          let id = playlist?.id || props?.location?.state?.playlist?.id;
          const url = process.env.REACT_APP_API_URL + '/results/' + id;

          try {
            let response = await transport.get(url);

            setSongs(response.data.songs);

            const parameters = response.data.parameters;

            setDanceability({
              min: parameters.min_danceability,
              max: parameters.max_danceability,
            });

            setAcousticness({
              min: parameters.min_acousticness,
              max: parameters.max_acousticness,
            });

            setPopularity({
              min: parameters.min_popularity,
              max: parameters.max_popularity,
            });

            setEnergy({
              min: parameters.min_energy,
              max: parameters.max_energy,
            });

            setValence({
              min: parameters.min_valence,
              max: parameters.max_valence,
            });

            setTempo({
              min: parameters.min_tempo,
              max: parameters.max_tempo,
            });

            let [artists, tracks] = await Promise.all([
              getArtists(accessToken, parameters.seed_artists),
              getTracks(accessToken, parameters.seed_tracks),
            ]);

            setSeeds({
              artists: artists,
              tracks: tracks,
            });

            let playlistName = playlist?.name || props?.location?.state?.playlist?.name;
            setName(`technofy:${playlistName}`);
            initialFetchComplete.current = true;
            setLoading(false);
          } catch (e) {
            console.log(e);
            setError(true);
          }
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (!loading && initialFetchComplete.current) {
      console.log('Running seeds effect');
      setLoading(true);
      setGeneratedPlaylistLink(null);

      let parameters = {
        popularity,
        danceability,
        energy,
        acousticness,
        valence,
        tempo,
      };

      getRecommendations(accessToken, parameters, seeds, count)
        .then((songs) => {
          setSongs(songs);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
        });
    } else if (checkStateStored() && checkStateUpdatedFromStorage()) {
      initialFetchComplete.current = true;
      localStorage.clear();
    }
  }, [count, popularity, danceability, energy, tempo, acousticness, valence, seeds]);

  if (!(props?.location?.state?.playlist || props?.location?.state?.seed || checkStateStored() || songs)) {
    return <Redirect to="/" />;
  }

  const savePlaylist = () => {
    const url = process.env.REACT_APP_API_URL + '/save';
    transport
      .post(url, {
        name,
        tracks: songs.map((item) => item.uri),
      })
      .then(
        (response) => {
          console.log('Saved playlist');
          console.log(response);
          setGeneratedPlaylistLink(response.data.link);
        },
        (error) => {
          console.log(error);
          saveStateAndLogin();
        }
      );
  };

  const removeSeed = (item, type) => {
    if (seeds.artists.length + seeds.tracks.length <= 1) {
      // message.error('Cannot remove all seeds');
    } else {
      setSeeds({
        artists: type === 'artist' ? seeds.artists.filter((artist) => artist.id !== item.id) : seeds.artists,
        tracks: type === 'track' ? seeds.tracks.filter((track) => track.id !== item.id) : seeds.tracks,
      });
    }
  };

  const addSeed = (item) => {
    if (seeds?.artists.length + seeds?.tracks.length >= 5) {
      // message.error('Cannot add more than five seeds');
    } else {
      setSeeds({
        artists: item.type === 'Artists' ? [...seeds?.artists, item] : seeds.artists,
        tracks: item.type === 'Tracks' ? [...seeds?.tracks, item] : seeds.tracks,
      });
    }
  };
  return (
    <Container>
      <SearchSeeds isResult={true} addSeed={addSeed} />
      <Box py={2}>
        <Hidden smDown>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} md={8}>
              <SongList loading={loading} songs={songs} />
            </Grid>
            <Grid item xs={12} md={4}>
              <SaveOnSpotify save={accessToken ? savePlaylist : saveStateAndLogin} name={name} setName={setName} />
              <TrackListSettings
                values={{
                  count,
                  energy,
                  popularity,
                  danceability,
                  tempo,
                  acousticness,
                  valence,
                }}
                handlers={{
                  setCount,
                  setEnergy,
                  setPopularity,
                  setDanceability,
                  setTempo,
                  setAcousticness,
                  setValence,
                }} />
            </Grid>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} md={8}>
              <SaveOnSpotify save={accessToken ? savePlaylist : saveStateAndLogin} name={name} setName={setName} />
              <TrackListSettings
                values={{
                  count,
                  energy,
                  popularity,
                  danceability,
                  tempo,
                  acousticness,
                  valence,
                }}
                handlers={{
                  setCount,
                  setEnergy,
                  setPopularity,
                  setDanceability,
                  setTempo,
                  setAcousticness,
                  setValence,
                }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <SongList loading={loading} songs={songs} />
            </Grid>
          </Grid>
        </Hidden>
      </Box>
    </Container>
  )
}

export default withRouter(Result) 
