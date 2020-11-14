import { Box, Container, Grid } from '@material-ui/core'
import React from 'react'
import SaveOnSpotify from './SaveOnSpotify'
import SearchBox from './SearchBox'
import TrackListSettings from './TrackListSettings'

const Result = (props) => {
  return (
    <Container>
      <SearchBox />
      <Box py={2}>
        <Grid container justify="center" spacing={1}>
          <Grid item xs={12} md={9}>
            lorem10000
          </Grid>
          <Grid item xs={12} md={3}>
            <SaveOnSpotify />
            <TrackListSettings />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Result
