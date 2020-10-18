import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  working: {
    fontWeight: 300,
    fontsize: '1.5rem',
    lineHeight: '1.5rem',
    letterSpacing: '0.2em',
  }
}))

const Working = () => {
  const classes = useStyles();
  return (
    <Box py={10}>
      <Grid container justify="center">
        <Grid item>
          <Typography className={"text-white " + classes.working}>How it works</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Working
