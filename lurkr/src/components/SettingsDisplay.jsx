import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RadioSelector from './RadioSelector';
import SaveIcon from '@material-ui/icons/Save';
import ThemeSelector from './ThemeSelector'

export default function TemporaryDrawer(props) {

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  let refresh = (event) => {
    window.location.reload()
    console.log("There's got to be a way to force a re-render, but im lazy")
  }



  const sideList = side => (
    <div style={{backgroundColor: props.settings.theme.background, height: '100%'}}>
      <RadioSelector changeColumns={(event) => props.changeColumns(event, props.settings.id)} numCols={props.numCols}/>
      <ThemeSelector theme={props.settings.theme}/>
      <div style={{textAlign: 'center'}}>
        <Button variant="contained" size="small" onClick={refresh}>
          <SaveIcon/>
          Save
        </Button>
      </div>
    </div>
  );



  
  return (
    <div>
      <IconButton onClick={toggleDrawer('left', true)}>
        <img src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Ficons.iconarchive.com%2Ficons%2Fdtafalonso%2Fandroid-l%2F512%2FSettings-L-icon.png&f=1" 
        style={{maxHeight: "30px"}}/>
      </IconButton>

      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}