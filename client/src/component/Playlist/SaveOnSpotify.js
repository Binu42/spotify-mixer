import { Button, Card, CardActions, CardContent, Divider, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Cookies from 'js-cookie';

const useStyles = makeStyles(theme => ({
  card: {
    background: ' #28172F',
  }
}))

const SaveOnSpotify = () => {
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
        <Typography className="text-white">
          Sign in with Spotify and save your songs to a playlist
        </Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth color="primary" variant="contained">{!isLoggedIn ? 'SignIn to Save' : 'Save as Spotify'}</Button>
      </CardActions>
    </Card>
  )
}

export default SaveOnSpotify
