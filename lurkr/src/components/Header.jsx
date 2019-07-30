import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CustomizeModal from './CustomizeModal'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import '../css/header.css'
// import '../css/inputbar.css'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: "auto",
    marginRight: "auto",
    // align: "center",
    // mx: "auto",
  },
  
}));


export default function Header(props) {
  const classes = useStyles();

  let test = () => {
    console.log("fdshgjv")
  }

    return (
      <div className={classes.root}>
        <AppBar position="sticky" style={{ background: `${props.theme.header}` }}>
          <Toolbar style={{paddingLeft: '0%', paddingRight: '0%'}}>
            <div id="container">
              <div id="one">
                {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton> */}
                
              </div>
              <div id="two">
                <span style={{fontSize: '30px'}}><strong>Lurkr</strong></span>
              </div>
              <div id="three">
                <form style={{float: "right", paddingBottom: '8%'}} onSubmit={event => props.findSubreddit(event)}>
                  <input type="text" style={{width: '150%', height: '25px', fontSize: '20px', fontWeight: 'bold'}}
                  value={props.searchFieldValue}
                  onChange={props.searchFieldChange}
                  />
                

                </form>
              </div>
              <div id="four">
                <Button variant="contained" color="secondary" className={classes.button}>
                  <span><strong>Login</strong></span>
                </Button>
                {/* <Button color="inherit">Login</Button>  */}
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
}