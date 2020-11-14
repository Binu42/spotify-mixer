import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core'

const SongList = ({ loading, songs }) => {
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
              <ListItem>
                <ListItemAvatar>
                  <Avatar variant="square" alt={name} src={images[0].url} style={{ width: 50, height: 50, borderRadius: 5, marginRight: 10 }} />
                </ListItemAvatar>
                <ListItemText className="text-white" primary={name} secondary={artists?.map((artist, i) => i === artists.length - 1 ? `${artist.name}` : `${artist.name}, `)} />
                <ListItemSecondaryAction className="text-white">
                  {`${min} : ${sec}`}
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          )
        })
      }
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
              <Skeleton variant="rect" width={60} height={60} />
            </ListItemAvatar>
            <ListItemText primary={<Skeleton />} secondary={<Skeleton />} />
          </ListItem>
        ))
      }
    </List>
  )
}