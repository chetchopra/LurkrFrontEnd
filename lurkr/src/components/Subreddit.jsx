import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import SubredditPost from './SubredditPost'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { List } from '@material-ui/core';

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

  
  

  generatePosts = () => {
    return this.props.posts.map((post, index) => {
      return <SubredditPost key={index} post={post}/>
    })
  }

  render() {
    

    return (
      <div>
      {this.props.name}
      <Paper style={{maxHeight: 200, overflow: 'auto'}}>
          {this.generatePosts()}

      </Paper>
      </div>
    )
  }
}