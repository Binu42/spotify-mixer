import { Button, Card, CardActions, CardContent, Divider, IconButton, InputBase, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import Cookies from 'js-cookie';
import { MdSave, MdCheckCircle } from 'react-icons/md';

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
  saveMessage: {
    flexDirection: "column",
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.21)',
  },
  saved: {
    width: '100%',
    paddingTop: 10,
    display: 'block',
    color: 'green',
    fontSize: '3.5rem'
  },
  textSaved: {
    width: '100%',
    display: 'block',
    color: '#C1B4BC',
    textAlign: 'center',
    paddingBottom: 10
  }
}))

const SaveOnSpotify = ({ save, setName, name, saved, saving, link }) => {
  const classes = useStyles();
  const accessToken = Cookies.get('access_token');
  const isLoggedIn = accessToken && accessToken !== '';
  return (
    <>
      {!saved ? <Card className={classes.card}>
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
          <Button fullWidth color="primary" disabled={saving} onClick={save} variant="contained">{saving ? "Saving" : !isLoggedIn ? 'SignIn to Save' : 'Save as Spotify'}</Button>
        </CardActions>
      </Card> : <Card className={classes.card}>
          <CardContent>
            <Typography color="secondary" gutterBottom>
              Saved Successfully
            </Typography>
            <Divider />
            <div className={classes.saveMessage}>
              <MdCheckCircle className={classes.saved} />
              <Typography className={classes.textSaved} variant="h6">
                Playlist Saved!
              </Typography>
            </div>
          </CardContent>
          <CardActions>
            <Button fullWidth color="primary" component="a" href={link} target="_blank" variant="contained">View on Spotify</Button>
          </CardActions>
        </Card>}
    </>
  )
}

export default SaveOnSpotify
