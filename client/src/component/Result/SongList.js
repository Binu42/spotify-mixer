import React, { useEffect, useState } from 'react'
import { Skeleton } from '@material-ui/lab'
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Tooltip, Zoom } from '@material-ui/core'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'

const SongList = ({ loading, songs }) => {
  const [sounds, setSounds] = useState([]);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState();
  const [playIndex, setPlayIndex] = useState(0);
  const [index, setIndex] = useState([]);

  useEffect(() => {
    if (sounds.length)
      setSounds([]);
    for (let i = 0; i < songs.length; i++) {
      const { id, preview_url, name, album: { images }, artists } = songs[i];
      if (preview_url) {
        setIndex(prev => [...prev, id]);
        setSounds(prev => [...prev, {
          id,
          name,
          musicSrc: preview_url,
          cover: images[0]?.url,
          singer: artists?.map((artist) => artist.name),
          duration: 30,
        }]);
      }
    }
  }, [songs])

  if (loading) return <SongLoading />

  return (
    <List component="ul">
      {
        songs?.map(song => {
          const { id, preview_url, name, album: { images }, artists, duration_ms } = song;
          const min = ('0' + Math.floor(duration_ms / (1000 * 60))).slice(-2);
          const sec = ('0' + Math.ceil((duration_ms % 60000) / 1000)).slice(-2);

          return (
            <div key={id}>
              <Tooltip title={preview_url !== null ? "click to play" : "preview of this song not available"} placement="top" TransitionComponent={Zoom} >
                <ListItem onClick={e => setPlayIndex(index.findIndex(el => el === id))} className={(currentlyPlayingId === id ? "active" : '') + (preview_url !== null ? ' pointer' : '')}>
                  <ListItemAvatar>
                    <Avatar variant="square" alt={name} src={images[0]?.url} style={{ width: 50, height: 50, borderRadius: 5, marginRight: 10 }} />
                  </ListItemAvatar>
                  <ListItemText className="text-white" primary={name} secondary={artists?.map((artist, i) => i === artists.length - 1 ? `${artist.name}` : `${artist.name}, `)} />
                  <ListItemSecondaryAction className="text-white">
                    {`${min} : ${sec}`}
                  </ListItemSecondaryAction>
                </ListItem>
              </Tooltip>
              <Divider />
            </div>
          )
        })
      }
      <div style={{ marginTop: '100px' }}></div>
      <ReactJkMusicPlayer
        audioLists={sounds}
        theme="dark"
        onAudioPlay={({ id }) => setCurrentlyPlayingId(id)}
        onPlayIndexChange={(index) => setPlayIndex(index)}
        showDownload={false}
        glassBg={true}
        mode="full"
        showReload={false}
        playIndex={playIndex}
        defaultPosition={{ bottom: 10, right: 10 }}
        showThemeSwitch={false}
        toggleMode={false}
        responsive={false}
        remove={false}
      />
    </List>
  )
}

export default SongList

const SongLoading = () => {
  return (
    <List>
      {
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Skeleton variant="rect" style={{ background: 'rgba(245, 241, 218, 0.473)', borderRadius: 5 }} width={50} height={50} />
            </ListItemAvatar>
            <ListItemText primary={<Skeleton style={{ background: 'rgba(245, 241, 218, 0.473)' }} />} secondary={<Skeleton style={{ background: 'rgba(245, 241, 218, 0.473)' }} />} />
          </ListItem>
        ))
      }
    </List>
  )
}