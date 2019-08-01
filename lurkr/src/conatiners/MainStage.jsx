import React, { Component, Fragment } from 'react';
import Subreddit from '../components/Subreddit'
import BasicGrid from './BasicGrid'
import { Container } from '@material-ui/core';
import Header from '../components/Header';



//TO-DO: Consider making this a Material UI container


export default class MainStage extends Component {
  constructor() {
    super()
    this.state = {
      subreddits: [],
      searchFieldValue: "",
      settings: {
        id: 1,
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
    this.fetchUserInfo();
  }

  fetchUserInfo = () => {
    fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
    .then(resp => resp.json())
    .then(json => {this.setState({subreddits: json.subreddits,
                                  settings: json.setting
    })
  })
  }

  changeColumns = (event, settingId) => {
    let newCols = event.target.value;
    this.updateColumns(settingId, newCols)
  }

  updateColumns = (settingId, newCols) => {
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({columns: newCols})
    }


    fetch(`http://localhost:3000/settings/${settingId}`, configObj)
    .then(resp => resp.json())
    
  }



  searchFieldChange = (event) => {
    let newSearchTerm = event.target.value;
    this.setState({searchFieldValue: newSearchTerm}) 
  }

  findSubreddit = (event) => {
    event.preventDefault();
    // this.checkSubreddit();
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({"subreddit": {"name": this.state.searchFieldValue.trim(), "user_id": this.props.currentUser.id}})
    }

    fetch("http://localhost:3000/subreddits", configObj)
    .then(resp => resp.json())
    .then(json => {
      if (!json.error) {
        let newState = [...this.state.subreddits]
        newState.push(json);
        this.setState({subreddits: newState})
      } else {
        alert(json.error)
      }
      console.log(json)
    })
    this.setState({searchFieldValue: ""})
    
  }

  removeSubreddit = (subredditName) => {
    let configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({"subreddit": 
                              {"name": subredditName, 
                                "user_id": this.props.currentUser.id}})
    }

    fetch("http://localhost:3000/subreddits", configObj)
    .then(resp => resp.json())
    .then(json => {
      let newState = [...this.state.subreddits]
      let updatedState = newState.filter((subreddit) => subreddit.name !== subredditName)
      this.setState({subreddits: updatedState})
    })
  }


  render() {
    return (
      <Fragment>
        <Header searchFieldValue={this.state.searchFieldValue} 
                searchFieldChange={this.searchFieldChange} 
                findSubreddit={this.findSubreddit} 
                // theme={this.state.settings.theme} 
                handleLogout={this.props.handleLogout} 
                changeColumns={this.changeColumns}
                settings={this.state.settings}/>
        <BasicGrid subreddits={this.state.subreddits} 
                   removeSubreddit={this.removeSubreddit} 
                   settings={this.state.settings}/> 
      </Fragment> 
    )

  }
}