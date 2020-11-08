import React, { useState } from 'react'
import { Card, CardContent, CardHeader, Collapse, Divider, FormControl, Hidden, IconButton, InputLabel, MenuItem, Select, Slider, Typography } from '@material-ui/core'
import { MdExpandMore } from 'react-icons/md';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  card: {
    background: 'transparent',
    marginTop: '1rem',
    border: '1px solid #fff'
  },
  cardHeader: {
    padding: '0.5rem',
    color: '#FF8AD5'
  },
  rightSideText: {
    fontSize: '0.8rem',
    float: 'right'
  },
  leftSideText: {
    fontSize: '0.8rem',
    float: 'left'
  },
  sliderText: {
    fontSize: '0.8rem',
    clear: "both"
  },
  cardContent: {
    padding: '0.5rem',
    color: '#FF8AD5'
  },
  colorSec: {
    color: '#FF8AD5'
  },
  cardHeaderTitle: {
    fontSize: '1rem'
  },
  expand: {
    transform: 'rotate(0deg)',
    color: '#FF8AD5',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
}));

const TrackListSettings = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.card}>
      <Hidden mdUp implementation='css'>
        <CardHeader
          className={classes.cardHeader}
          classes={{
            title: classes.cardHeaderTitle
          }}
          action={
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
            >
              <MdExpandMore />
            </IconButton>
          }
          title="Show Tracklist Settings"
        />
      </Hidden>
      <Hidden smDown implementation='css'>
        <CardContent className={classes.cardContent}>
          <Settings />
        </CardContent>
      </Hidden>
      <Collapse in={expanded}>
        <CardContent className={classes.cardContent}>
          <Settings />
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default TrackListSettings

const Settings = () => {
  const classes = useStyles();
  const [noOfTracks, setNoOfTracks] = useState(5);
  const handleChange = (event) => {
    setNoOfTracks(event.target.value);
  };

  const [value, setValue] = useState([20, 37]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <FormControl style={{ width: '100%' }}>
        <InputLabel id="Max-number-of-tracks" classes={{ root: classes.colorSec }}>Max number of tracks</InputLabel>
        <Select
          labelId="Max-number-of-tracks"
          id="Max-number-of-tracks"
          value={noOfTracks}
          classes={{ root: classes.colorSec }}
          onChange={handleChange}
        >
          <MenuItem value={5}>Five</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={15}>Fifteen</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={25}>Twenty-five</MenuItem>
        </Select>
      </FormControl>
      <Typography id="range-slider" className={classes.leftSideText} gutterBottom>
        Popularity
      </Typography>
      <Slider
        value={value}
        color="secondary"
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
      />
      <div>
        <Typography className={classes.rightSideText} id="range-slider" gutterBottom>
          Playing at bars
        </Typography>
        <Typography className={classes.leftSideText} id="range-slider" gutterBottom>
          World Tour
        </Typography>
      </div>
      <div className={classes.sliderText}></div>
      <Divider />
      <Typography className={classes.sliderText} id="range-slider" gutterBottom>
        Energy
      </Typography>
      <Slider
        value={value}
        color="secondary"
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
      />
      <div>
        <Typography className={classes.rightSideText} id="range-slider" gutterBottom>
          Chill
        </Typography>
        <Typography className={classes.leftSideText} id="range-slider" gutterBottom>
          No Chill
        </Typography>
      </div>
      <div className={classes.sliderText}></div>
      <Divider />
      <Typography className={classes.sliderText} id="range-slider" gutterBottom>
        Vocal
      </Typography>
      <Slider
        value={value}
        color="secondary"
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
      />
      <div>
        <Typography className={classes.rightSideText} id="range-slider" gutterBottom>
          None
        </Typography>
        <Typography className={classes.leftSideText} id="range-slider" gutterBottom>
          A Ton
        </Typography>
      </div>
      <div className={classes.sliderText}></div>
      <Divider />
      <Typography className={classes.sliderText} id="range-slider" gutterBottom>
        Tempo
      </Typography>
      <Slider
        value={value}
        color="secondary"
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
      />
      <div>
        <Typography className={classes.rightSideText} id="range-slider" gutterBottom>
          Slow
        </Typography>
        <Typography className={classes.leftSideText} id="range-slider" gutterBottom>
          Fast
        </Typography>
      </div>
      <div className={classes.sliderText}></div>
      <Divider />
      <Typography className={classes.sliderText} id="range-slider" gutterBottom>
        Danceable
      </Typography>
      <Slider
        value={value}
        color="secondary"
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
      />
      <div>
        <Typography className={classes.rightSideText} id="range-slider" gutterBottom>
          Not at all
        </Typography>
        <Typography className={classes.leftSideText} id="range-slider" gutterBottom>
          Disco
        </Typography>
      </div>
      <div className={classes.sliderText}></div>
      <Divider />
      <Typography className={classes.sliderText} id="range-slider" gutterBottom>
        Mood
      </Typography>
      <Slider
        value={value}
        color="secondary"
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
      />
      <div>
        <Typography className={classes.rightSideText} id="range-slider" gutterBottom>
          Downer
        </Typography>
        <Typography className={classes.leftSideText} id="range-slider" gutterBottom>
          Upper
        </Typography>
      </div>
      <div className={classes.sliderText}></div>
      <Divider />
      <Typography className={classes.sliderText} id="range-slider" gutterBottom>
        Acoustic
      </Typography>
      <Slider
        value={value}
        color="secondary"
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
      />
      <div>
        <Typography className={classes.rightSideText} id="range-slider" gutterBottom>
          All Digital
        </Typography>
        <Typography className={classes.leftSideText} id="range-slider" gutterBottom>
          All Analog
        </Typography>
      </div>
    </div>
  )
}