import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     fontWeight: theme.typography.fontWeightRegular,
//   },
// }));



export default class Expansion extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      test: "testeroni"
    }
  };

  // componentDidMount() {
  //   fetch("https://www.reddit.com/r/cats/comments/cj2qmd/weve_been_fostering_this_semiferal_7_week_old.json")
  //   .then(resp => resp.json())
  //   .then(json => {
  //     console.log(json[1].data.children[0].kind)
  //     this.setState((state, _props) => {
  //       return {comments: json}
  //     })
  //   })
  // }




  render() {

  // const classes = useStyles();

  let overall = [];

  let printPreorder = (node, depth) => {
    let spaces = Array(depth).fill("-----");
    overall.push(spaces.join("") + node.data.body + "\n");
    // console.log(overall);
    if (node.data.replies === "") {
      return;
    } 
    node.data.replies.data.children.forEach((childNode) => {
      printPreorder(childNode, depth + 1);
    })
  }


  let getComments = () => {
    let url = `https://www.reddit.com${this.props.linkToComments.slice(0,-1)}.json`;
    fetch(url)
    .then(resp => resp.json())
    .then(json => this.setState({comments: json[1].data.children}))
  }//console.log(json[1].data.children[0].kind))



  return (
    <div >
      <ExpansionPanel style={{backgroundColor: "#DCDCDC"}}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={getComments}
        >
          <Typography >{this.props.numComments} comments</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{backgroundColor: "#FFFFFF"}}>
          {/* <Typography>
            
          </Typography> */}
          {this.state.comments.forEach((child) => {
            let depth = 0;
            printPreorder(child, depth)
            }
          )}
          <ul>
          {overall.map((comment, index) => {
            return <li key={index}>{comment}</li>;
          } )}
          </ul>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      {/* Disabled Panel  - Use for reddit posts with no comments*/}

      {/* <ExpansionPanel disabled>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel> */}
    </div>
  );
}
}