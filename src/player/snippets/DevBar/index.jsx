import * as React from 'react';
import PropTypes from 'prop-types';

// api
import {env} from 'api/'

// hooks
import {useHotkeys} from 'hooks/'

// styles
import {styled} from 'styles/snippets'

// material
import Box from '@mui/material/Box';

// blocks
import AppBar from './AppBar';
import SystemDialog from './SystemDialog'
import ConnectionForm from './ConnectionForm'
import StateData from './StateData'
import DebugForm from './DebugForm'
import LogsData from './LogsData'
import CommandsList from './CommandsList/'
import PublicBar from '../PublicBar/'


// Config
const debugMode = true //env.isDev


const RootDiv = styled.ul(theme => ({
  position: 'absolute',
  zIndex: theme.zIndex.appBar + 1,
  top: theme.spacing(2),
  right: theme.spacing(2),
  pointerEvents: 'all',
  display: 'flex',
  // width: 'max-content',

  // [theme.breakpoints.down('sm')]: {
  //   right: theme.spacing(2),
  // },
}))

function DevBar(props) {
  const refSystemDialog = React.useRef(null)
  const refConnectionForm = React.useRef(null)

  const [show, setShow] = React.useState(debugMode)
  const [currentMenu, setCurrentMenu] = React.useState(false)

  useHotkeys('ctrl+r', async (e, ke) => {
     if(!e.repeat) {
       if(confirm('Do you want to restart the streaming server?')) {
         await props.onRestart()
       }
       return ;
     }
   }, [])

  useHotkeys('ctrl+z', (e, ke) => {
     if(!e.repeat) {
       setShow(c => {
         // const res = !c
         // setCurrentMenu(false)
         return !c;
       })
       return ;
     }
   }, [show])

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

  const renderDevBar = () => {
    if(!show) return ;

    return (
      <Box sx={{ml: 1}}>

        {renderDialog()}

        <ConnectionForm
          ref={refConnectionForm}
          autoConnect={props.autoConnect}
          serverData={props.serverData}
          setServerData={props.setServerData}
          initConnection={props.initConnection}
        />

        <AppBar
          onRestart={props.onRestart}
          handleMenu={handleMenu} />

      </Box>
    )
  }
  return (
    <div>

      <RootDiv>
        <PublicBar />
        {renderDevBar()}
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
