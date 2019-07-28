import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import SubredditPost from './SubredditPost'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

//TO-DO: Consider making this a container and moving it to the containers folder
//But I think this needs state

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// }));

// const classes = useStyles();

export default class Subreddit extends Component {

  
  

  generateBS = () => {
    let bs = Array(1).fill("BullShit")
    return bs.map((b, index) => {
      return <SubredditPost key={index} textContent={b}/>
    })
  }

  render() {

    return (
      
    <Paper>{this.props.textContent}</Paper>
    // <Paper className={classes.paper}/>
    )
  }
}