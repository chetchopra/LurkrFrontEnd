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

    // Visual Fuckery
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

    // STATE
    this.state = {
      subreddits: [],
      searchFieldValue: "",
      theme: {...themeUglyDuckling},
    }
  }


  componentDidMount() {
    console.log(this.props)
    fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
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
        <Header searchFieldValue={this.state.searchFieldValue} searchFieldChange={this.searchFieldChange} findSubreddit={this.findSubreddit} theme={this.state.theme} handleLogout={this.props.handleLogout}/>
        <BasicGrid subreddits={this.state.subreddits} removeSubreddit={this.removeSubreddit} theme={this.state.theme}/> 
      </Fragment> 
    )

  }
}