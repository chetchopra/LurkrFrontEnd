import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import CommentSection from './CommentSection';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import Chip from '@material-ui/core/Chip';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  console.log(props)


  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  let buildImageUrl = () => {
    let url = props.post.item.imageInfo.images[0].source.url.replace("amp;", "")
  
    if (props.post.item.imageInfo.images[0].variants) {
      if (props.post.item.imageInfo.images[0].variants.gif) {
        url = props.post.item.imageInfo.images[0].variants.gif.source.url.replace("amp;", "")
      }
    }

    // let url = "";
    // if (props.post.item.imageInfo.images[0].variants.gif) {
    //   url = props.post.item.imageInfo.images[0].variants.gif.source.url.replace("amp;", "")
    // } 
    

    return url
  }

  let displayImage = () => {
    if (props.post.item.imageInfo !== null) {
      return <div style={{marginLeft: 'auto', marginRight: 'auto', width: '60%', height: '80%'}}>
        <img src={buildImageUrl()} style={{maxWidth: '100%', maxHeight: '100%', display: 'block', margin: 'auto', borderRadius: '10px'}} alt="Image Link Broken :("/>
        <a href={props.post.item.url} target="_blank" rel="noopener noreferrer">Content Link</a>
      </div>
    }
  }

  let checkForComments = () => {
    if (props.post.item.num_comments > 0) {
      return <Paper style={{backgroundColor: props.post.theme.post}}>
              <div style={{textAlign: 'center'}}>
                <span style={{fontSize: '20px'}}><strong>Comments</strong></span>
              </div>
              <CommentSection link={props.post.item.permalink}/>
             </Paper>
    } else {
      return <Paper style={{backgroundColor: props.post.theme.post}}>
                No comments
             </Paper>
    }
  }

  // console.log(props)



  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
      style={{backgroundColor: props.post.theme.background}}
      
    >
      <Paper style={{height: '800px', width: '75%', backgroundColor: props.post.theme.post, marginLeft: 'auto', marginRight: 'auto'}}>

 
      
        <div style={{textAlign: 'center', paddingLeft: '10%', paddingRight: '10%', paddingTop: '1%'}}>

          <div>
            <Chip label={`r/${props.post.item.subredditName}`}/>
            <Chip label={`${props.post.item.up_votes} upvotes`}/>
            <Chip label={`${props.post.item.num_comments} comments`}/>
            <Chip label={`posted by: ${props.post.item.author}`}/>
          </div>

          <div style={{paddingTop: '1%'}}>
            <span style={{fontSize: '25px', fontWeight: 'bold'}}>{props.post.item.title}</span>
          </div>

        </div>

        <br/>

        <div style={{textAlign: 'center', paddingLeft: '20%', paddingRight: '20%', paddingTop: '1%'}}>
          <span style={{fontSize: '20px'}}>{props.post.item.self_text}</span>
        </div>

        <br/>

        {displayImage()}

        {checkForComments()}

      </Paper>

      
    </div>
  );

  return (
    <div style={{float: 'right'}}>

      {/* <IconButton aria-label="delete" className={classes.margin} size="small">
          <ArrowDownwardIcon fontSize="inherit" />
        </IconButton> */}

      <Button style={{paddingTop: '100%'}}onClick={toggleDrawer('top', true)}><ArrowDownwardIcon/></Button>
      {/* <Button onClick={props.toggleDrawer('bottom', true)}>Open Bottom</Button> */}
      <Drawer anchor="top" open={state.top} onClose={toggleDrawer('top', false)}>
        {fullList('top')}
      </Drawer>
      
      <Drawer anchor="bottom" open={state.bottom} onClose={toggleDrawer('bottom', false)}>
        {fullList('bottom')}
      </Drawer>
    </div>
  );
}