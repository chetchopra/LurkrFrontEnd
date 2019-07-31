import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import SubredditPost from './SubredditPost'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from './List'
import '../css/subreddit.css'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
// import Button from '@material-ui/core/Button';

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

  toTitleCase(input) {
    return "r/" + input.split(' ')
    .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join(' ')
  }

  // generatePosts = () => {
  //   return this.state.posts.map((post, index) => {
  //     return <SubredditPost key={index} post={post}/>
  //   })
  // }

  render() {
    

    return (
      <Paper style={{margin: '1%', backgroundColor: `${this.props.theme.subreddit}`}}>
        <div id="container">
          <div id="left">
            <span style={{fontSize: '20px'}}>
              <strong>{this.toTitleCase(this.props.subreddit.name)}</strong>
            </span>
          </div>

          <div id="right">
            
            {/* <Button variant="contained" color="secondary" onClick={() => 
              {this.props.removeSubreddit(this.props.subreddit.name)
            }}>
              <DeleteIcon />
            </Button> */}

            <IconButton onClick={() => 
              {this.props.removeSubreddit(this.props.subreddit.name)
            }}>
              <DeleteIcon />
            </IconButton> 

            {/* <IconButton onClick={() => 
              {this.props.removeSubreddit(this.props.subreddit.name)
            }}>
              x
            </IconButton> */}

          </div>
        </div>
        


        <Paper style={{maxHeight: 400, overflow: 'auto', backgroundColor: `${this.props.theme.subreddit}`, margin: '1%'}}>
            {/* {this.generatePosts()} */}
            <List data={this.state.posts} contentDisplayComponent={SubredditPost} theme={this.props.theme}/>

        </Paper>
      </Paper>
    )
  }
}