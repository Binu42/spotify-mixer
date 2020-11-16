import { Box, Grid, Typography } from '@material-ui/core'
import React, { useLayoutEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MobView from '../../assets/Mob.svg'
import DesktopView from '../../assets/desktop.svg'

const useStyles = makeStyles((theme) => ({
  working: {
    fontWeight: 300,
    fontsize: '1.5rem',
    textAlign: 'center',
    lineHeight: '1.5rem',
    marginBottom: '1rem',
    letterSpacing: '0.2em',
  },
  imageDesktop: {
    width: '100%',
    height: 200
  },
  imageMob: {
    width: '100%',
    height: 400
  }
}))

const Working = () => {
  const [isDesktop, setIsDesktop] = useState();
  useLayoutEffect(() => {
    function updatePosition() {
      if (window.innerWidth > 640)
        setIsDesktop(true);
      else
        setIsDesktop(false)
    }
    window.addEventListener('resize', updatePosition);
    updatePosition();
    return () => window.removeEventListener('resize', updatePosition);
    // eslint-disable-next-line
  }, [])
  const classes = useStyles();
  return (
    <Box py={10}>
      <Grid container justify="center">
        <Grid item>
          <Typography className={"text-white " + classes.working}>How it works</Typography>
          <img src={isDesktop ? DesktopView : MobView} className={isDesktop ? classes.imageDesktop : classes.imageMob} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Working
