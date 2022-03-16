import React from 'react';

// context
import {useConnection} from '../../../context/'

// material
import Button from '@mui/material/Button';

// components
import JsonEditor from 'components/JsonEditor/'

// blocks
import ConnectionForm from './ConnectionForm'


function StateConnection() {
  const connection = useConnection()
  const refConnectionForm = React.useRef(null)

  return (
    <div>

      <Button
        sx={{mb: 2}}
        fullWidth
        color="inherit"
        variant="outlined"
        size="large"
        onClick={() => refConnectionForm.current.open()}>
        Manual connection
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
