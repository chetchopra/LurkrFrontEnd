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
    if (props.post.img !== "" && props.post.img !== "self") {
      return <Grid item>
      <ButtonBase className={classes.image}>
        <img className={classes.img} alt="complex" src={props.post.img}/>
      </ButtonBase>
    </Grid> 
    }
  }

  return (
    
    <div className={classes.root} >
      <Paper className={classes.paper} style={{backgroundColor: "#DCDCDC"}}>
        <Grid container spacing={2}>
          {displayImage()}
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <p><strong>
                  {props.post.title}
                </strong></p>
                <Typography variant="body2" gutterBottom>
                  Posted By: {props.post.author}
                </Typography>
                {/* <Typography variant="body2" color="textSecondary">
                  {props.post.num_comments} comments
                </Typography> */}
              </Grid>
              <ExpansionPanel numComments={props.post.num_comments} linkToComments={props.post.permalink}/>

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