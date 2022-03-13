import React from 'react';

// context
import {usePlayer} from '../context/';

// styles
import {styled} from 'styles/snippets'

// material
import CircularProgress from '@mui/material/CircularProgress';
import MuiBackdrop from '@mui/material/Backdrop';

const Backdrop = styled.custom(MuiBackdrop, theme => ({
  zIndex: theme.zIndex.modal + 1,
  background: 'rgba(255,255,255, .2)',
  cursor: 'wait',

  pointerEvents: 'all',

  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',

  padding: theme.spacing(2),
}))


function CallbackLoader(props) {
  const player = usePlayer()
  const [open, setOpen] = React.useState(false);

  const playerLoaded = player.state.loaded

  // The component instance will be extended
	// with whatever you return from the callback passed
	// as the second argument
	React.useImperativeHandle(props.innerRef, () => ({
    onShow: (payload) => {
      handleOpen(payload)
    },
    onClose: () => {
      handleClose()
    },
  }));

  const handleOpen = (payload) => {
    if(!playerLoaded) return ;
    if(['console_command'].includes(payload?.type)) {
      return ;
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Backdrop open={open} onClick={handleClose}>
      <CircularProgress color="inherit" size={20} />
    </Backdrop>
  );
}

export default React.forwardRef((props, ref) => (
	<CallbackLoader {...props} innerRef={ref} />
))
