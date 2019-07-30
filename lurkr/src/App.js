import React, { Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
// Step 1. Import react-router functions
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login'


import Header from './components/Header';
import MainStage from './conatiners/MainStage'
// TO-DO: fix path name, conatiners to containers and correct globally


export default class App extends Component {
    constructor() {
    super()
    this.state = {
      subreddits: [],
      searchFieldValue: "",
      usernameFieldValue: ""
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/users/1")
    .then(resp => resp.json())
    .then(json => this.setState({subreddits: json.subreddits}))
  }

  handleLogin = (event) => {
    event.preventDefault();
    let username = event.target.children[0].children[1].children[0].value.trim()
    
    fetch(`http://localhost:3000/users/login/${username}`)
    .then(resp => resp.json())
    .then(json => console.log(json))
    //fetch to see if user exists
    //if yes then fetch users subreddits and other info and save user in local storage
  }

  searchFieldChange = (event) => {
    let newSearchTerm = event.target.value;
    this.setState({searchFieldValue: newSearchTerm}) 
  }

  usernameFieldChange = (event) => {
    let newUsername = event.target.value;
    this.setState({usernameFieldValue: newUsername}) 
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
      <Router>
        <Fragment>
          <Route exact path="/test" render={() => (<Header searchFieldValue={this.state.searchFieldValue} searchFieldChange={this.searchFieldChange} findSubreddit={this.findSubreddit}/>)}/>
          {/* <Header searchFieldValue={this.state.searchFieldValue} searchFieldChange={this.searchFieldChange} findSubreddit={this.findSubreddit}/> */}
          {/* <MainStage subreddits={this.state.subreddits} removeSubreddit={this.removeSubreddit}/> */}
          <Route exact path="/login" render={() => (<Login usernameFieldValue={this.state.usernameFieldValue} usernameFieldChange={this.usernameFieldChange} handleLogin={this.handleLogin}/> )}/>
        </Fragment>
      </Router>
    );
  }
}


