import * as React from 'react';

// hooks
import {useStorage} from 'hooks/'

// context
import {useConnection} from 'player/context/';

// material
import Box from '@mui/material/Box';

// components
import CustomDialog from 'components/Dialog/'

// blocks
import Form from './Form'
import Content from './Content'



function CustomizedDialogs() {
  const connection = useConnection()
  const refDialog = React.useRef(null)

  const storage = useStorage()
  const storageKey = 'welcomeDialogForm'

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    handleOpen()
  }, [])

  const handleOpen = () => {
    if(mounted || connection.state.auto_connect === false) return ;

    const stored_data = storage.getItem(storageKey, 'local')
    if(typeof stored_data !== 'object') {
      setMounted(true)
      setTimeout(() => {
        refDialog.current.open()
      }, 1000 * 5)
    }
  }

  return (
    <div>

      <CustomDialog
        ref={refDialog}
        title="Welcome!"
        subtitle={undefined}
        defaultOpen={false}
        closeIcon
        showActions={false}
        disableEscape
      >

        <Box sx={{p: 2}}>
          <Content />
          <Form
            storageKey={storageKey}
            onDialogClose={() => refDialog.current.close()} />
        </Box>
      </CustomDialog>

    </div>
  );
}

export default CustomizedDialogs
