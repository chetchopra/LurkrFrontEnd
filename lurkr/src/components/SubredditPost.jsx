import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import ExpansionPanel from '../components/ExpansionPanel';
import PostDisplay from './PostDisplay'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: '1%',
    marginTop: '1%',
    maxWidth: '100%',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function SubredditPost(props) {

  let {title, num_comments, img, url} = props.item;
  let {theme} = props;
  const classes = useStyles();

  // console.log("From SubredditPost", props.item.permalink)
  let displayImage = () => {
    // console.log(props)
    if (img !== "" && img !== "self" && img !== "default") {
      return <Grid item>
      <ButtonBase className={classes.image}>
        <img className={classes.img} alt="complex" src={img} style={{borderRadius: "10px"}}/>
      </ButtonBase>
    </Grid> 
    }
  }

  // const toggleDrawer = (side, open) => event => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }

  //   setState({ ...state, [side]: open });
  // };

  return (
    <div className={classes.root} >
      <Paper className={classes.paper} style={{backgroundColor: theme.post}}>  
        <Grid container spacing={2}>
          {displayImage()}
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>

                {/* style={{whiteSpace: "nowrap", overflow: "hidden"}} */}
                <p><strong> 
                  {title}
                </strong></p>
                
                {/* <Typography variant="body2" gutterBottom>
                  Posted By: {props.author}
                </Typography> */}
                <Typography variant="body2" color="textSecondary">
                  {num_comments} comments
                </Typography>
              </Grid>

              

            </Grid>
          </Grid>
          <PostDisplay post={props}/>
        </Grid>        
      </Paper>
    </div>
  );
}