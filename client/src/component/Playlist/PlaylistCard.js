import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  media: {
    height: 300,
  },
}));

function PlaylistCard(props) {
  const { loading = false, playlist } = props;
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card elevation={4}>
        {loading ? (
          <Skeleton animation="wave" variant="rect" className={classes.media} />
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
              <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
            ) : (
                (playlist.name)
              )
          }
        />
      </Card>
    </Grid>
  );
}

export default PlaylistCard;