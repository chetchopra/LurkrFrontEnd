import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

//TO-DO: Consider making this a container and moving it to the containers folder

export default class SubredditPost extends Component {
  render() {
    return (
      <Card>
        <CardContent>
          {this.props.textContent}
        </CardContent>
      </Card>
    )
  }
}