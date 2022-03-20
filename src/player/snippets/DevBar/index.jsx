import * as React from 'react';

// api
import { env } from 'api/'

// hooks
import { useHotkeys } from 'hooks/'

// context
import { useConnection } from '../../context/';

// styles
import { styled } from 'styles/snippets'

// material
import Box from '@mui/material/Box';

// blocks
import AppBar from './AppBar';
import SystemDialog from './SystemDialog'
import StateData from './StateData'
import StateConnection from './StateConnection/'
import DebugForm from './DebugForm'
import LogsData from './LogsData/'
import CommandsList from './CommandsList/'
import PublicBar from '../PublicBar/'


// Config
const debugMode = true //env.isDev


const RootDiv = styled.ul(theme => ({
  position: 'absolute',
  zIndex: theme.zIndex.appBar + 100,
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
  const connection = useConnection()

  const refSystemDialog = React.useRef(null)

  const [show, setShow] = React.useState(debugMode)
  const [currentMenu, setCurrentMenu] = React.useState(false)

  useHotkeys('ctrl+r', async (e, ke) => {
    if (!e.repeat) {
      if (confirm('Do you want to restart the streaming server?')) {
        await connection.onRestartStream()
      }
      return;
    }
  }, [])

  useHotkeys('ctrl+z', (e, ke) => {
    if (!e.repeat) {
      setShow(c => {
        // const res = !c
        // setCurrentMenu(false)
        return !c;
      })
      return;
    }
  }, [show])

  const renderDialog = () => {

    const list = {
      state: ['State', <StateData />],
      connection: ['Connection', <StateConnection />],
      debug: ['Debug', <DebugForm />],
      logs: ['Pixel Streaming logs', <LogsData />],
      commands: ['Commands', <CommandsList />],
    }

    const item = list[currentMenu]
    let dialogTitle = ''
    let dialogObj = (<div />)

    if (list.hasOwnProperty(currentMenu)) {
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
    setCurrentMenu(name)
    refSystemDialog.current?.open()
  }

  const renderDevBar = () => {
    if (!show) return;

    return (
      <Box sx={{ ml: 1 }}>

        {renderDialog()}

        <AppBar handleMenu={handleMenu} />

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


export default DevBar;
