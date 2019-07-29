import React, { Component, Fragment } from 'react';


import Header from './components/Header';
import MainStage from './conatiners/MainStage'
// TO-DO: fix path name, conatiners to containers and correct globally


export default class App extends Component {
    constructor() {
    super()
    this.state = {
      subreddits: [],
      searchFieldValue: ""
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/users/1")
    .then(resp => resp.json())
    .then(json => this.setState({subreddits: json.subreddits}))
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
      body: JSON.stringify({"subreddit": {"name": this.state.searchFieldValue, "user_id": 1}})
    }

    fetch("http://localhost:3000/subreddits", configObj)
    .then(resp => resp.json())
    .then(json => {
      // console.log(json)
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
      body: JSON.stringify({"subreddit": {"name": subredditName, "user_id": 1}})
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
        <Header searchFieldValue={this.state.searchFieldValue} searchFieldChange={this.searchFieldChange} findSubreddit={this.findSubreddit}/>
        <MainStage subreddits={this.state.subreddits} removeSubreddit={this.removeSubreddit}/>
      </Fragment>
    );
  }
}


