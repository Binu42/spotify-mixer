import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import image from '../../assets/image.png'
import image1 from '../../assets/image1.png'
import image2 from '../../assets/image2.png'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.21)',
    width: 600,
    [theme.breakpoints.down('sm')]: {
      width: 350
    }
  },
  textHelper: {
    fontWeight: 200,
    fontSize: '1.2rem',
    lineHeight: '35px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem'
    }
  },
  company: {
    position: "relative",
    '&::before': {
      content: "'2'",
      position: 'absolute',
      fontWeight: 300,
      fontSize: '10rem',
      lineHeight: '234px',
      color: 'rgba(255, 255, 255, 0.1)',
      left: "10%",
      zIndex: - 1,
    }
  }
}));

function Company() {
  const classes = useStyles();

  return (
    <Box pt={10}>
      <Grid className={classes.company} direction="column" container justify="center" alignContent="center">
        <Grid item>
          <Box pb={1}>
            <Typography className={"text-white " + classes.textHelper}>Get these <b>track recommendations</b> in your DJ app via Beatport Link</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Grid justify="center" container spacing={3}>
            <Grid item>
              <img src={image} height="30" />
            </Grid>
            <Grid item>
              <img src={image1} height="30" />
            </Grid>
            <Grid item>
              <img src={image2} height="30" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Company;
