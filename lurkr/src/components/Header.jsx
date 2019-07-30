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
    // marginLeft: "auto",
    // marginRight: "auto",
    align: "center",
    mx: "auto",
  },
  
}));


export default function Header(props) {
  const classes = useStyles();

  let test = () => {
    console.log("fdshgjv")
  }

    return (
      <div className={classes.root}>
      <AppBar position="sticky" style={{ background: '#2E3B55' }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          {/* <CustomizeModal/> */}
          <Typography variant="h6" className={classes.title}>
            Lurkr
          </Typography>

          

          {/* <TextField
          id="outlined-name"
          label="Name"
          className={classes.textField}
          // value={values.name}
          // onChange={handleChange('name')}
          margin="normal"
          variant="outlined"
          onEnter={test}
          /> */}

          <form onSubmit={event => props.findSubreddit(event)}>
            <input type="text"
            value={props.searchFieldValue}
            onChange={props.searchFieldChange}
            />
          </form>



          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
    )
}