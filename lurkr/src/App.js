import React, { Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
// Step 1. Import react-router functions
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login'

import PostDisplay from './components/PostDisplay'


import Header from './components/Header';
import MainStage from './conatiners/MainStage'
// TO-DO: fix path name, conatiners to containers and correct globally


export default class App extends Component {
    constructor() {
    super()
    this.state = {
      usernameFieldValue: "",
      currentUser: {
        username: null,
        theme: null,
        id: null
      } 
    }
  }

  componentDidMount() {
    let username = localStorage.getItem("currentUsername")
    let userId = localStorage.getItem("currentUserId")
    console.log(username !== null && userId !== null)
    if (username !== null && userId !== null) {
      let newCurrentUser = {...this.state.currentUser}
      newCurrentUser.username = username;
      newCurrentUser.id = userId;
      this.setState({currentUser: newCurrentUser})
    }
  }

  handleLogin = (event) => {
    event.preventDefault();
    let username = event.target.children[0].children[1].children[0].value.trim()
    
    fetch(`http://localhost:3000/users/login/${username}`)
    .then(resp => resp.json())
    .then(json => {
      this.handleLoginResponse(json);
      });
  }

  handleLoginResponse = (data) => {
    if (data.message) {
      this.setState({usernameFieldValue: "Incorrect Username"})
    } else if (data.username) {
      let newCurrentUser = {...this.state.currentUser}
      newCurrentUser.username = data.username;
      newCurrentUser.id = data.id;
      this.setState({currentUser: newCurrentUser}) 
      localStorage.setItem("currentUsername", this.state.currentUser.username); 
      localStorage.setItem("currentUserId", this.state.currentUser.id)
    }
  }

  usernameFieldChange = (event) => {
    let newUsername = event.target.value;
    this.setState({usernameFieldValue: newUsername}) 
  }

  // checkLocalStorage = () => {
  //   return localStorage.getItem("currentUser") !== null;
  // }

  checkLoggedIn = () => {
    console.log(this.state.currentUser.username !== null)
    if (this.state.currentUser.username !== null) {
      return (
        <Fragment>
          {/* <Header searchFieldValue={this.state.searchFieldValue} searchFieldChange={this.searchFieldChange} findSubreddit={this.findSubreddit} theme={this.state.theme}/> */}
          <MainStage currentUser={this.state.currentUser} handleLogout={this.handleLogout}/>
        </Fragment>
      );
    } else {
        return <Login usernameFieldValue={this.state.usernameFieldValue} usernameFieldChange={this.usernameFieldChange} handleLogin={this.handleLogin}/>
    }
  }

  handleLogout = () => {
    localStorage.removeItem("currentUsername");
    localStorage.removeItem("currentUserId");
    let newCurrentUser = {...this.state.currentUser}
    newCurrentUser.username = null;
    newCurrentUser.id = null;
    this.setState({currentUser: newCurrentUser})
  }


  render() {
    return (
      <Router>
        <Fragment>

          {this.checkLoggedIn()}


          {/* <Header searchFieldValue={this.state.searchFieldValue} searchFieldChange={this.searchFieldChange} findSubreddit={this.findSubreddit} theme={this.state.theme}/>
          <Route exact path="/login" render={() => (<Login usernameFieldValue={this.state.usernameFieldValue} usernameFieldChange={this.usernameFieldChange} handleLogin={this.handleLogin}/> )}/>
          <Route exact path="/view" render={() => (<MainStage subreddits={this.state.subreddits} removeSubreddit={this.removeSubreddit} theme={this.state.theme}/>)}/>
           */}
        </Fragment>
      </Router>
    );
  }
}


