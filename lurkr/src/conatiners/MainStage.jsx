import React, { Component } from 'react';
import Subreddit from '../components/Subreddit'
import BasicGrid from './BasicGrid'
import { Container } from '@material-ui/core';


//TO-DO: Consider making this a Material UI container


export default class MainStage extends Component {
  constructor() {
    super()
    this.state = {
      subreddits: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/users/1")
    .then(resp => resp.json())
    .then(json => this.setState({subreddits: json.subreddits}))
  }

  render() {
    return (
      <BasicGrid subreddits={this.state.subreddits}/>
    )

  }
}