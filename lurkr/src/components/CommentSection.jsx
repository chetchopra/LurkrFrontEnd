import React, { Component } from 'react'

export default class CommentSection extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      test: []
    }
  }

  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    let overall = [];

    let printPreorder = (node, depth) => {
      let spaces = Array(depth).fill("-----");
      overall.push(spaces.join("") + node.data.body + "\n");
      if (node.data.replies === "") {
        return;
      } 
      node.data.replies.data.children.forEach((childNode) => {
        printPreorder(childNode, depth + 1);
      })
    }

    let url = `https://www.reddit.com${this.props.link}.json`;
    fetch(url)
    .then(resp => resp.json())
    .then(json => {
      this.setState({comments: json[1].data.children})
    })


    


  }
  
  

  render() {
    
    return (
      <ul>
        {/* {this.state.test.map((comment, index) => {
          return <li key={index}>{comment}</li>;
        })} */} */}
      </ul> 

    )
  }
}