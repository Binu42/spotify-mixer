import React, { useState } from 'react'
import { Card, CardContent, CardHeader, Collapse, Divider, FormControl, Hidden, IconButton, InputLabel, MenuItem, Select, Slider, Typography } from '@material-ui/core'
import { MdExpandMore } from 'react-icons/md';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  card: {
    background: 'transparent',
    marginTop: '1rem',
    border: '1px solid #fff',
    [theme.breakpoints.up("md")]: {
      position: 'sticky',
      top: '20px'
    },
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
    padding: '1rem',
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

const TrackListSettings = ({ values, handlers }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.card}>
      <Hidden mdUp implementation='css'>
        <CardHeader
          onClick={handleExpandClick}
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
          title={(expanded ? "Hide" : "Show") + " Tracklist Settings"}
        />
      </Hidden>
      <Hidden smDown implementation='css'>
        <CardContent className={classes.cardContent}>
          <Settings values={values} handlers={handlers} />
        </CardContent>
      </Hidden>
      <Hidden mdUp>
        <Collapse in={expanded}>
          <CardContent className={classes.cardContent}>
            <Settings values={values} handlers={handlers} />
          </CardContent>
        </Collapse>
      </Hidden>
    </Card>
  )
}

export default TrackListSettings

const Settings = ({ values, handlers }) => {
  const classes = useStyles();

  const onChangeHandler = (value, handler) => {
    handler({
      min: value[0],
      max: value[1],
    });
  };

  return (
    <div>
      <FormControl style={{ width: '100%' }}>
        <InputLabel id="Max-number-of-tracks" classes={{ root: classes.colorSec }}>Max number of tracks</InputLabel>
        <Select
          labelId="Max-number-of-tracks"
          id="Max-number-of-tracks"
          value={values.count}
          classes={{ root: classes.colorSec }}
          onChange={e => handlers.setCount(e.target.value)}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={25}>Twenty-five</MenuItem>
          <MenuItem value={50}>Fifty</MenuItem>
          <MenuItem value={75}>Seventy-five</MenuItem>
        </Select>
      </FormControl>
      <Typography id="range-slider" className={classes.leftSideText} gutterBottom>
        Popularity
      </Typography>
      <Slider
        value={[values.popularity.min, values.popularity.max]}
        color="secondary"
        min={0}
        max={100}
        step={1}
        onChange={(event, value) => onChangeHandler(value, handlers.setPopularity)}
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
        value={[values.energy.min, values.energy.max]}
        min={0}
        max={1}
        step={0.01}
        color="secondary"
        onChange={(event, value) => onChangeHandler(value, handlers.setEnergy)}
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
      {/* <div className={classes.sliderText}></div>
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
      </div> */}
      <div className={classes.sliderText}></div>
      <Divider />
      <Typography className={classes.sliderText} id="range-slider" gutterBottom>
        Tempo
      </Typography>
      <Slider
        value={[values.tempo.min, values.tempo.max]}
        color="secondary"
        min={50}
        max={200}
        step={1}
        onChange={(event, value) => onChangeHandler(value, handlers.setTempo)}
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
        value={[values.danceability.min, values.danceability.max]}
        min={0}
        max={1}
        step={0.01}
        color="secondary"
        onChange={(event, value) => onChangeHandler(value, handlers.setDanceability)}
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
        value={[values.valence.min, values.valence.max]}
        color="secondary"
        min={0}
        max={1}
        step={0.01}
        onChange={(event, value) => onChangeHandler(value, handlers.setValence)}
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
        value={[values.acousticness.min, values.acousticness.max]}
        color="secondary"
        min={0}
        max={1}
        step={0.01}
        onChange={(event, value) => onChangeHandler(value, handlers.setAcousticness)}
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