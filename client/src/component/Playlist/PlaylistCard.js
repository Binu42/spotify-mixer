import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  media: {
    height: 300,
  },
  name: {
    textDecoration: 'none'
  },
  card: {
    backgroundColor: '#25282c'
  },
  disabled: {
    pointerEvents: 'none',
    cursor: 'default'
  }
}));

function PlaylistCard(props) {
  const { loading = false, playlist } = props;
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Link
        className={loading ? classes.disabled : classes.name}
        to={{
          pathname: '/results',
          state: {
            playlist: {
              id: playlist?.id,
              name: playlist?.name,
              image: playlist?.image,
            },
          },
        }}
      >
        <Card elevation={4} className={classes.card}>
          {loading ? (
            <Skeleton variant="rect" className={classes.media} style={{ background: 'rgba(245, 241, 218, 0.473)' }} />
          ) : (
              <CardMedia
                className={classes.media}
                image={playlist.image}
                title={playlist.name}
              />
            )}
          <CardHeader
            title={
              loading ? (
                <Skeleton height={10} width="100%" style={{ marginBottom: 6, background: 'rgba(245, 241, 218, 0.568)' }} />
              ) : (
                  (<Typography variant="h6" color="primary">{playlist.name}</Typography>)
                )
            }
          />
        </Card>
      </Link>
    </Grid>
  );
}

export default PlaylistCard;