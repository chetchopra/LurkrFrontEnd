import React, { Component } from 'react';
import Subreddit from '../components/Subreddit'
import BasicGrid from './BasicGrid'
import { Container } from '@material-ui/core';
import DGrid from '../components/dragndrop/DGrid'
import ExpansionPanel from '../components/ExpansionPanel'



//TO-DO: Consider making this a Material UI container


export default class MainStage extends Component {


  render() {
    return (
      <BasicGrid subreddits={this.props.subreddits} removeSubreddit={this.props.removeSubreddit} theme={this.props.theme}/>  
    )

  }
}