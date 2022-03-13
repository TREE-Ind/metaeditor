import React from 'react';
import PropTypes from 'prop-types';

// context
import {usePlayer} from '../../context/'

// material
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// components
import CustomDialog from 'components/Dialog/'

// hooks
import {useStorage} from 'hooks/'


const STORAGE_KEY = 'DEV_SERVER_DATA'


function ConnectionForm({serverData, setServerData, initConnection, ...props}) {
  const player = usePlayer()

  const refDialog = React.useRef(null)
  const storage = useStorage()

  // The component instance will be extended
	// with whatever you return from the callback passed
	// as the second argument
	React.useImperativeHandle(props.innerRef, () => ({
    open: () => {
      refDialog.current.open()
    }
  }));

  // Initial dialog
  React.useEffect(() => {
    if(!props.autoConnect) {
      refDialog.current.open()

      // Restore local server data
      const stored_data = storage.getItem(STORAGE_KEY)
      if(stored_data?.host) {
        setServerData('host', stored_data.host)
      }
      if(stored_data?.port) {
        setServerData('port', stored_data.port)
      }

    }
  }, [])

  React.useEffect(() => {

    if(!props.autoConnect) {
      storage.setItem(STORAGE_KEY, serverData)
      console.error('serverData', serverData);
    }

  }, [serverData])

  // // Reopen dialog if lost connection
  // React.useEffect(() => {
  //
  //   if(info.isDev) {
  //     if(state.connected) {
  //
  //       // Update storage with new server credentials
  //       storage.setItem(STORAGE_KEY, serverData)
  //
  //       // Close dialog if stream loaded
  //       refDialog.current.close()
  //
  //     } else {
  //       refDialog.current.open()
  //     }
  //   }
  //
  // }, [state.connected])

  const handleInput = key => event => {
    const value = event.target.value
    setServerData(key, value)
  }

  const setDefault = () => {
    return (
      <a href="#" onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        setServerData('host', 'http://127.0.0.1')
        setServerData('port', 80)
      }}>
        Set default: http://127.0.0.1:80
      </a>
    );
  }

  const renderForm = () => {

    const is_disabled = player.state.connected

    return (
      <form onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()

        initConnection()
      }}>

        <Box sx={{ flexGrow: 1, pt: 2, pb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>

              <TextField
                disabled={is_disabled}
                autoFocus
                fullWidth
                label="Host"
                type="url"
                placeholder="http://127.0.0.1"
                value={serverData.host}
                onChange={handleInput('host')}
                helperText={setDefault()}
                 />

            </Grid>
            <Grid item xs={4}>

              <TextField
                disabled={is_disabled}
                fullWidth
                label="Port"
                type="number"
                placeholder="80"
                value={serverData.port}
                onChange={handleInput('port')} />

            </Grid>
          </Grid>
        </Box>

        <Button
          disabled={is_disabled}
          fullWidth
          type="submit"
          size="large"
          variant="contained">
          Connect
        </Button>

      </form>
    )
  }

  return (
    <div>
      <CustomDialog
        ref={refDialog}
        title="Development: Connection form"
        subtitle="Run STUN and TURN Servers and a project with Unreal Engine."
        closeIcon={false}
        showActions={false}
      >
        <div>
          {renderForm()}
        </div>
      </CustomDialog>
    </div>
  )
}


ConnectionForm.propTypes = {
  autoConnect: PropTypes.bool.isRequired,
  serverData: PropTypes.object.isRequired,
  setServerData: PropTypes.func.isRequired,
  initConnection: PropTypes.func.isRequired,
};


export default React.forwardRef((props, ref) => (
	<ConnectionForm {...props} innerRef={ref} />
))
