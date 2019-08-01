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
import Icon from '@material-ui/core/Icon';
// import Button from '@material-ui/core/Button';

export default class Subreddit extends Component {

  constructor() {
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    // console.log("Fecth Called...")
    // console.log(this.props)
    fetch(`http://localhost:3000/subreddits/${this.props.subreddit.name}`)
    .then(resp => resp.json())
    .then(json => {this.setState({posts: json})})
  }

  toTitleCase(input) {
    return "r/" + input.split(' ')
    .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join(' ')
  }

  render() {
    return (
      <Paper style={{margin: '1%', backgroundColor: `${this.props.theme.subreddit}`,
                    paddingBottom: '0.25%',
                    }}>
        <div id="container">
          <div id="left" style={{textAlign: 'center'}}>
            <span style={{fontSize: '20px'}}>
              <strong>{this.toTitleCase(this.props.subreddit.name)}</strong>
            </span>
          </div>



          <div id="right">

          <IconButton>
            <img src="https://img.icons8.com/android/24/000000/refresh.png"/>
          </IconButton>
            
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
          </div>

        </div>
        


        <Paper style={{maxHeight: 400, overflow: 'auto', backgroundColor: `${this.props.theme.subreddit}`, margin: '1%'}}>
            <List data={this.state.posts} contentDisplayComponent={SubredditPost} theme={this.props.theme}/>

        </Paper>
      </Paper>
    )
  }
}