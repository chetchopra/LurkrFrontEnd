import React, { Component, Fragment } from 'react';
import Subreddit from '../components/Subreddit'
import BasicGrid from './BasicGrid'
import { Container } from '@material-ui/core';
import DGrid from '../components/dragndrop/DGrid'
import ExpansionPanel from '../components/ExpansionPanel'
import Header from '../components/Header';



//TO-DO: Consider making this a Material UI container


export default class MainStage extends Component {
  constructor() {
    super()
    this.state = {
      subreddits: [],
      searchFieldValue: "",
      settings: {
        numColumns: 3,
        numRecords: 26,
        theme: {
          background: "#6D7993",
          header: "#96858F",  
          post: "#D5D5D5",
          subreddit: "#9099A2",
          theme_name: "The Blues"
        }
      }
    }
  }


  componentDidMount() {
    fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
    .then(resp => resp.json())
    .then(json => {this.setState({subreddits: json.subreddits,
                                  settings: json.setting
    })
  })
  }


  searchFieldChange = (event) => {
    let newSearchTerm = event.target.value;
    this.setState({searchFieldValue: newSearchTerm}) 
  }

  findSubreddit = (event) => {
    event.preventDefault();
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({"subreddit": {"name": this.state.searchFieldValue, "user_id": this.props.currentUser.id}})
    }

    fetch("http://localhost:3000/subreddits", configObj)
    .then(resp => resp.json())
    .then(json => {
      if (json.name !== "Issue") {
        let newState = [...this.state.subreddits]
        newState.push(json);
        this.setState({subreddits: newState})
      } 
    })
    this.setState({searchFieldValue: ""})
    
  }

  removeSubreddit = (subredditName) => {
    console.log(subredditName)
    let configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({"subreddit": {"name": subredditName, "user_id": this.props.currentUser.id}})
    }

    fetch("http://localhost:3000/subreddits", configObj)
    .then(resp => resp.json())
    .then(json => {
      console.log("made it into json")
      let newState = [...this.state.subreddits]
      let updatedState = newState.filter((subreddit) => subreddit.name !== subredditName)
      this.setState({subreddits: updatedState})
    })
  }


  render() {
    return (
      <Fragment>
        <Header searchFieldValue={this.state.searchFieldValue} searchFieldChange={this.searchFieldChange} findSubreddit={this.findSubreddit} theme={this.state.settings.theme} handleLogout={this.props.handleLogout}/>
        <BasicGrid subreddits={this.state.subreddits} removeSubreddit={this.removeSubreddit} settings={this.state.settings}/> 
      </Fragment> 
    )

  }
}