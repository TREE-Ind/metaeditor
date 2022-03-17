import React from 'react';

// context
import {useConnection} from '../../../context/'

// material
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Icon from '@mui/material/Icon';

// components
import JsonEditor from 'components/JsonEditor/'

// blocks
import ConnectionForm from './ConnectionForm'


function StateConnection() {
  const connection = useConnection()
  const refConnectionForm = React.useRef(null)

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
