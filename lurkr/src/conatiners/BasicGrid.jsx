import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Subreddit from '../components/Subreddit';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function BasicGrid(props) {
  
  const classes = useStyles();

  let generateSubredditGrid = (props) => {
    return props.subreddits.map((subreddit) => {
      return <Grid item xs={3} key={subreddit.name}><Subreddit subreddit={subreddit} removeSubreddit={props.removeSubreddit}/></Grid>
    })
  }



  return (
    // style={{backgroundColor: "#113452"}}
    <div className={classes.root} > 
      <Grid container spacing={3}>
        {generateSubredditGrid(props)}
      </Grid>
    </div>
  );
}