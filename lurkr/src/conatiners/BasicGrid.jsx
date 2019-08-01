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

  let determineColumns = () => {
    let cols = 4;
    if (props.settings.num_cols === 1) {
      cols = 12;
    } else if (props.settings.num_cols === 2) {
      cols = 6;
    } else if (props.settings.num_cols === 3) {
      cols = 4;
    } 
    return cols;
  }

  let generateSubredditGrid = (props) => {
    return props.subreddits.map((subreddit) => {
      return <Grid item xs={determineColumns()} key={subreddit.name}><Subreddit subreddit={subreddit} removeSubreddit={props.removeSubreddit} theme={props.settings.theme}/></Grid>
    })
  }



  return (
    <div className={classes.root} style={{backgroundColor: `${props.settings.theme.background}`, width: '100%', height: '100%'}} > 
      <Grid container spacing={3} style={{padding: '1%'}}>
        {generateSubredditGrid(props)}
      </Grid>
    </div>
  );
}