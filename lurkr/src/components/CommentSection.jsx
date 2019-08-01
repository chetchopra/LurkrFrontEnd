import React, { Component } from 'react'

export default class CommentSection extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      test: [],
    }
  }

  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    let overall = [];



    let printPreorder = (node, depth) => {
      if(depth === 0) {
        overall.push("\n")
      }
      let spaces = Array(depth).fill("-----");
      overall.push(spaces.join("") + node.data.body + "\n");
      if (node.data.replies === "" || !node.data.replies) {
        return;
      } 
      console.log(node.data.replies)
      node.data.replies.data.children.forEach((childNode) => {
        printPreorder(childNode, depth + 1);
      })
    }

    let url = `https://www.reddit.com${this.props.link}.json`;
    fetch(url)
    .then(resp => resp.json())
    .then(json => {
      let com = json[1].data.children
      
      com.forEach((child) => {
        let depth = 0;
        printPreorder(child, depth)
      })

      this.setState({comments: overall})

    })



  }
  
  

  render() {
    
    return (
      <ul>
        {this.state.comments.map((comment, index) => {
          if (comment === "\n") {
            return <br key={index}/>
          }
          return <li key={index}>{comment}</li>;
        })}
      </ul> 
    )
  }
}