import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import SubredditPost from './SubredditPost'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { List } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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

  constructor() {
    super();
    this.state = {
      posts: [],

    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/subreddits/${this.props.subreddit.name}`)
    .then(resp => resp.json())
    .then(json => this.setState({posts: json}))
  }



  
  

  generatePosts = () => {
    return this.state.posts.map((post, index) => {
      return <SubredditPost key={index} post={post}/>
    })
  }

  render() {
    

    return (
      <Paper style={{margin: '1%'}}>
        <div>
          <p>{this.props.subreddit.name}
            <Button  color="secondary" onClick={() => {
              this.props.removeSubreddit(this.props.subreddit.name)
              }}>
              X
            </Button>
          </p>

        </div>


        <Paper style={{maxHeight: 400, overflow: 'auto'}}>
            {this.generatePosts()}

        </Paper>
        {/* <div>
          Page: 1 2 3 4 5 6 7 8 or nah
        </div> */}
      </Paper>
    )
  }
}