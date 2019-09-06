import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
}));

export default function RadioButtonsGroup(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('female');

  const [value2, setValue2] = React.useState('female');


  let handleChange = (event) => {
    setValue(event.target.value);
    props.changeColumns(event);
  }

  let generateRadioButtons = () => {
    return [1,2,3].map((buttonNum) => {
      if (buttonNum === props.numCols) {
        return <FormControlLabel key={buttonNum} value={buttonNum} control={<Radio />} label={buttonNum} checked={true}/>
      } else {
        return <FormControlLabel key={buttonNum} value={buttonNum} control={<Radio />} label={buttonNum}/>
      }
    })
  }

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <span style={{fontSize: '20px'}}><strong>Columns</strong></span>
        <RadioGroup
          name="columns"
          className={classes.group}
          value={value}
          onChange={handleChange}
        >
          {generateRadioButtons()}
        </RadioGroup>
      </FormControl>
    </div>
  );
}