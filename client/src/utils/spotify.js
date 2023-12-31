const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');

const DEFAULT_ARTIST_IMAGE = '/images/artist.png';
const DEFAULT_TRACK_IMAGE = '/images/track.png';
const URI = process.env.REACT_APP_API_URL;

const authenticate = (accessToken) => {
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);
  return spotifyApi;
};

const search = async (accessToken, searchTerm) => {
  let types = ['track', 'artist', 'playlist'];
  let limit = 4;
  let response;

  if (accessToken) {
    const spotifyApi = authenticate(accessToken);
    response = await spotifyApi.search(searchTerm, types, { limit });
  } else {
    response = await axios.get(`${URI}/search`, {
      params: { searchTerm, types, limit },
    });
    response = response.data;
  }

  return {
    artists: response.body.artists.items,
    tracks: response.body.tracks.items,
    playlists: response.body.playlists.items,
  };
};

const getRecommendations = async (accessToken, parameters, seeds, limit) => {
  let response;
  if (accessToken) {
    const spotify = authenticate(accessToken);
    let params = {};
    params.seed_artists = seeds.artists.map((artist) => artist.id);
    params.seed_tracks = seeds.tracks.map((track) => track.id);
    const relevant_features = ['danceability', 'energy', 'acousticness', 'valence', 'tempo', 'popularity'];
    for (let feature of relevant_features) {
      params[`min_${feature}`] = parameters[feature].min;
      params[`max_${feature}`] = parameters[feature].max;
    }
    params.limit = limit;
    response = await spotify.getRecommendations(params);
    const { tracks } = response.body;
    const trackIds = tracks && tracks.map(song => song.id);
    try {
      const audioFeature = await spotify.getAudioFeaturesForTracks(trackIds);
      for (let i = 0; i < response.body.tracks.length; i++)
        response.body.tracks[i].features = audioFeature.body.audio_features[i];
    } catch (error) {
      console.log(error)
    }
  } else {
    response = await axios.post(`${URI}/recommendations`, {
      parameters,
      seeds,
      limit,
    });
    response = response.data;
  }
  return response.body.tracks;
};

const extractArtistInfo = (artist) => ({
  name: artist.name,
  id: artist.id,
  type: "Artists",
  image: artist.images && artist.images.length > 0 ? artist.images[artist.images.length - 1].url : DEFAULT_ARTIST_IMAGE,
});

const extractPlaylistInfo = (playlist) => ({
  name: playlist.name,
  id: playlist.id,
  type: "Playlist",
  image: playlist.images && playlist.images.length > 0 ? playlist.images[playlist.images.length - 1].url : DEFAULT_ARTIST_IMAGE,
});

const extractTrackInfo = (track) => ({
  name: track.name,
  id: track.id,
  type: "Tracks",
  image:
    track.album && track.album.images && track.album.images.length > 0
      ? track.album.images[track.album.images.length - 1].url
      : DEFAULT_TRACK_IMAGE,
});

const getArtists = async (accessToken, artistIds) => {
  let response;
  if (accessToken) {
    const spotify = authenticate(accessToken);
    response = await spotify.getArtists(artistIds);
  } else {
    response = await axios.get(`${URI}/artists`, {
      params: { artistIds },
    });
    response = response.data;
  }
  return response.body.artists.map(extractArtistInfo);
};

const getTracks = async (accessToken, trackIds) => {
  let response;
  if (accessToken) {
    const spotify = authenticate(accessToken);
    response = await spotify.getTracks(trackIds);
  } else {
    response = await axios.get(`${URI}/tracks`, {
      params: { trackIds },
    });
    response = response.data;
  }
  return response.body.tracks.map(extractTrackInfo);
};

export { authenticate, search, getRecommendations, extractArtistInfo, extractPlaylistInfo, extractTrackInfo, getArtists, getTracks };