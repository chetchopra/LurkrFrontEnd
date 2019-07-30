import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import ExpansionPanel from '../components/ExpansionPanel';


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
  const classes = useStyles();

  let displayImage = () => {
    // console.log(props)
    if (props.img !== "" && props.img !== "self" && props.img !== "default") {
      return <Grid item>
      <ButtonBase className={classes.image}>
        <img className={classes.img} alt="complex" src={props.img} style={{borderRadius: "10px"}}/>
      </ButtonBase>
    </Grid> 
    }
  }

  return (

    // One -- "#D5D5D5"
    // Two -- "#EAC67A"
    // Three -- "#DCC7AA"
    // Four -- "#8EAEBD"
    // Ugly -- #FFFFFF
    
    <div className={classes.root} >
      <Paper className={classes.paper} style={{backgroundColor: "#FFFFFF"}}>  
        <Grid container spacing={2}>
          {displayImage()}
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <p style={{whiteSpace: "nowrap", overflow: "hidden"}}><strong>
                  {props.title}
                </strong></p>
                {/* <Typography variant="body2" gutterBottom>
                  Posted By: {props.author}
                </Typography> */}
                <Typography variant="body2" color="textSecondary">
                  {props.num_comments} comments
                </Typography>
              </Grid>

              {/* <ExpansionPanel numComments={props.post.num_comments} linkToComments={props.post.permalink}/> */}

              {/* <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Remove
                </Typography>
              </Grid> */}
            </Grid>
            {/* <Grid item>
              <Typography variant="subtitle1">{props.post.up_votes}</Typography>
            </Grid> */}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}