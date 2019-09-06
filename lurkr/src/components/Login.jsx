import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


export default function Login(props) {
  const classes = useStyles();


  return (
    <form className={classes.container}
          noValidate autoComplete="off"
          onSubmit={props.handleLogin} >
      <TextField
        id="standard-name"
        label="Username"
        className={classes.textField}
        value={props.usernameFieldValue}
        margin="normal"
        onChange={props.usernameFieldChange}
      />
    </form>
  );
}