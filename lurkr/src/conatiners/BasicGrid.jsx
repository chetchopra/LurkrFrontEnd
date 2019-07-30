import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Subreddit from '../components/Subreddit';
import List from '../components/List'

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
      return <Grid item xs={4} key={subreddit.name}><Subreddit subreddit={subreddit} removeSubreddit={props.removeSubreddit} theme={props.theme}/></Grid>
    })
  }



  return (
    // style={{backgroundColor: "#113452"}}
    <div className={classes.root} style={{backgroundColor: `${props.theme.backGround}`}} > 
      <Grid container spacing={3}>
        {generateSubredditGrid(props)}
      </Grid>
    </div>
  );
}