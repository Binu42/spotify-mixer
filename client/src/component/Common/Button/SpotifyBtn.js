import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { FaSpotify } from 'react-icons/fa'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 50
  },
}));

const SpotifyBtn = ({ label, handleOnClick }) => {
  const classes = useStyles();
  return (
    <Button classes={{ root: classes.root }} onClick={handleOnClick} variant="contained" color="primary" startIcon={<FaSpotify />}>
      {label}
    </Button>
  )
}

export default SpotifyBtn
