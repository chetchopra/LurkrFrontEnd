import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import '../css/header.css'
import _ from 'lodash'
import SettingsDisplay from './SettingsDisplay'
// import '../css/inputbar.css'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },  
}));


export default function Header(props) {
  const classes = useStyles();


    return (
      <div className={classes.root}>
        <AppBar position="sticky" style={{ background: `${props.settings.theme.header}` }}>
          <Toolbar style={{paddingLeft: '0%', paddingRight: '0%'}}>
            <div id="container">
              <div id="one">

                
              </div>

              <SettingsDisplay settings={props.settings} changeColumns={props.changeColumns} numCols={props.settings.num_cols}/>

              <div id="two">
                <span style={{fontSize: '30px'}}><strong>Lurkr</strong></span>
              </div>
              <div id="three">
                <form style={{float: "right", paddingBottom: '8%'}} onSubmit={props.findSubreddit}>
                  
                {/* <TextField
                  id="outlined-with-placeholder"
                  label="Label"
                  placeholder="Container.."
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  style={{width: '150%', height: '25px', fontSize: '20px', fontWeight: 'bold'}}
                  onChange={props.searchFieldChange}
                /> */}
                  
                  
                  <input type="text" style={{width: '150%', height: '25px', fontSize: '20px', fontWeight: 'bold'}}
                  value={props.searchFieldValue}
                  // onChange={props.searchFieldChange}
                  
                  onChange={props.searchFieldChange}
                    
                
                  />
                

                </form>
              </div>
              <div id="four">
                <Button variant="contained" color="secondary" onClick={props.handleLogout}>
                  <span><strong>Logout</strong></span>
                </Button>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
}