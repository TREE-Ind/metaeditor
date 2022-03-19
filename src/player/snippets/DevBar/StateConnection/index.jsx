import React from 'react';

// context
import {usePlayer, useConnection} from '../../../context/'

// material
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Icon from '@mui/material/Icon';

// components
import JsonEditor from 'components/JsonEditor/'

// blocks
import ConnectionForm from './ConnectionForm'


function StateConnection() {
  const player = usePlayer()
  const connection = useConnection()
  const refConnectionForm = React.useRef(null)

  const openStreamingPage = () => {
    const {host, port} = connection.state
    const port_ = port != 80 ? `:${port}` : ''
    const streamingUrl = `${host}${port_}`

    player.cls.playStop()
    window.open(streamingUrl)
  }

  return (
    <div>

      <ButtonGroup
        sx={{mb: 2}}
        fullWidth
        variant="outlined"
        color="inherit">
        <Button onClick={() => refConnectionForm.current.open()}>
          Manual connection
        </Button>
        <Button sx={{width: 50}} onClick={() => {
          if(confirm('Restart streaming server?')) {
            connection.onRestartStream()
          }
        }}>
          <Icon>refresh</Icon>
        </Button>
      </ButtonGroup>

      <Button
        sx={{mb: 2}}
        fullWidth
        variant="outlined"
        color="inherit"
        disabled={!connection.state.loaded}
        onClick={openStreamingPage}>
        Streaming page
      </Button>

      <ConnectionForm ref={refConnectionForm} />

      <JsonEditor
        label="Connection data"
        content={connection.state}
        height={'50vh'}
        onChange={() => {}}
        viewOnly
       />

    </div>
  )
}

export default StateConnection
