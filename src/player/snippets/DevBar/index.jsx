import * as React from 'react';
import PropTypes from 'prop-types';

// material
import MuiBox from '@mui/material/Box';

// blocks
import AppBar from './AppBar';
import SystemDialog from './SystemDialog'
import ConnectionForm from './ConnectionForm'
import StateData from './StateData'
import DebugForm from './DebugForm'
import LogsData from './LogsData'
import CommandsList from './CommandsList/'



// styles
import {styled} from 'styles/snippets'

const RootDiv = styled.ul(theme => ({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  maxHeight: '100%',
  padding: theme.spacing(2),
  zIndex: theme.zIndex.appBar + 1,
  // [theme.breakpoints.up('md')]: {
  //   maxWidth: '50vw',
  // },
}))

function DevBar(props) {
  const refSystemDialog = React.useRef(null)
  const refConnectionForm = React.useRef(null)

  const [currentMenu, setCurrentMenu] = React.useState(false)

  const renderDialog = () => {

    const list = {
      state: ['State', <StateData />],
      debug: ['Debug', <DebugForm />],
      logs: ['Logs', <LogsData />],
      commands: ['Commands', <CommandsList />],
    }

    const item = list[currentMenu]
    let dialogTitle = ''
    let dialogObj = (<div />)

    if(list.hasOwnProperty(currentMenu)) {
      dialogTitle = item[0]
      dialogObj = item[1]
    }

    return (
      <SystemDialog
        ref={refSystemDialog}
        title={dialogTitle}
        onClose={() => {
          setCurrentMenu(false)
        }}>
        {dialogObj}
      </SystemDialog>
    )
  }

  const handleMenu = (name) => {

    // const closeDialog = () => refSystemDialog.current.close()

    setCurrentMenu(name)

    switch (name) {

      case 'connection':
        refConnectionForm.current?.open()
        // closeDialog()
        break;

      // case 'state':
      // case 'debug':
      // case 'logs':
      // case 'commands':
      default:
        refSystemDialog.current?.open()
        // break;

    }

  }

  return (
    <div>

      <ConnectionForm
        ref={refConnectionForm}
        autoConnect={props.autoConnect}
        serverData={props.serverData}
        setServerData={props.setServerData}
        initConnection={props.initConnection}
      />

      <RootDiv>
        <AppBar
          onRestart={props.onRestart}
          handleMenu={handleMenu} />
        {renderDialog()}
      </RootDiv>

    </div>
  )
};


DevBar.propTypes = {
  autoConnect: PropTypes.bool.isRequired,
  onRestart: PropTypes.func.isRequired,
  setServerData: PropTypes.func.isRequired,
  serverData: PropTypes.object.isRequired,
  initConnection: PropTypes.func.isRequired,
};

export default DevBar;
