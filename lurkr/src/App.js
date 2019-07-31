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
    let themeBlues = {
      header: "#96858F",
      backGround: "#6D7993",
      subreddit: "#9099A2",
      post: "#D5D5D5"
    }
    let themeRustic = {
      header: "#18121E",
      backGround: "#233237",
      subreddit: "#984B43",
      post: "#D5D5D5"    
      // "#EAC67A"
    }
    let themeOrangeDelight = {
      header: "#6B7A8F",
      backGround: "#F7882F",
      subreddit: "#F7C331",
      post: "#DCC7AA"
    }
    let themeDarkMelon = {
      header: "#CF6766",
      backGround: "#031424",
      subreddit: "#30415D",
      post: "#8EAEBD"
    }
    let themeModernHome = {
      header: "#DA635D",
      backGround: "#4E4E56",
      subreddit: "#DCD0C0",
      post: "#B1938B"
    }
    let themeDark = {
      header: "#000000",
      backGround: "#4E4E56",
      subreddit: "#76323F",
      post: "#B1938B"
    }
    let themeUglyDuckling = {
      header: "#D3D3D3",
      backGround: "#FFFFFF",
      subreddit: "#FFFFFF",
      post: "#FFFFFF"
    }



    this.state = {
      subreddits: [],
      searchFieldValue: "",
      usernameFieldValue: "",
      theme: {...themeUglyDuckling},
      currentUser: null
      
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
    .then(json => {
      console.log(json);
      this.handleLoginResponse(json);
      });
    //fetch to see if user exists
    //if yes then fetch users subreddits and other info and save user in local storage
  }

  handleLoginResponse = (data) => {
    if (data.message) {
      this.setState({usernameFieldValue: "Incorrect Username"})
    } else if (data.username) {
      this.setState({currentUser: data.username}) 
      localStorage.setItem("currentUser", this.state.currentUser); 
    }
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

  checkLocalStorage = () => {
    return localStorage.getItem("currentUser") !== null;
  }

  checkLoggedIn = () => {
    if (this.state.currentUser !== null || this.checkLocalStorage()) {
      return (
        <Fragment>
          <Header searchFieldValue={this.state.searchFieldValue} searchFieldChange={this.searchFieldChange} findSubreddit={this.findSubreddit} theme={this.state.theme}/>
          <MainStage subreddits={this.state.subreddits} removeSubreddit={this.removeSubreddit} theme={this.state.theme}/>
        </Fragment>
      );
    } else {
        return <Login usernameFieldValue={this.state.usernameFieldValue} usernameFieldChange={this.usernameFieldChange} handleLogin={this.handleLogin}/>
    }
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


