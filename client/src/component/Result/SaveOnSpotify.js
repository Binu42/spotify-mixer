import { Button, Card, CardActions, CardContent, Divider, IconButton, InputBase, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import Cookies from 'js-cookie';
import { MdSave } from 'react-icons/md';

const useStyles = makeStyles(theme => ({
  card: {
    background: ' #28172F',
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.21)',
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
}))

const SaveOnSpotify = ({ save, setName, name }) => {
  const classes = useStyles();
  const accessToken = Cookies.get('access_token');
  const isLoggedIn = accessToken && accessToken !== '';
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography color="secondary" gutterBottom>
          Keep your tracks
        </Typography>
        <Divider />
        {isLoggedIn ? <Paper className={classes.root}>
          <IconButton className={classes.iconButton} aria-label="search">
            <MdSave className={classes.icon} />
          </IconButton>
          <InputBase
            className={classes.input}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter playlist name to save"
          />
        </Paper> : <Typography className="text-white">
            Sign in with Spotify and save your songs to a playlist
        </Typography>}
      </CardContent>
      <CardActions>
        <Button fullWidth color="primary" onClick={save} variant="contained">{!isLoggedIn ? 'SignIn to Save' : 'Save as Spotify'}</Button>
      </CardActions>
    </Card>
  )
}

export default SaveOnSpotify
