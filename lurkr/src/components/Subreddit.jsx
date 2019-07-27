import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import SubredditPost from './SubredditPost'

//TO-DO: Consider making this a container and moving it to the containers folder
//But I think this needs state

export default class Subreddit extends Component {

  generateBS = () => {
    let bs = Array(5).fill("BullShit")
    return bs.map((b, index) => {
      return <SubredditPost key={index} textContent={b}/>
    })
  }

  render() {
    return (
      <Paper>
        {this.generateBS()}
      </Paper>
    )
  }
}