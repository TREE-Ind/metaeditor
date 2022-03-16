import React from 'react';
import PropTypes from 'prop-types';

// context
import ContextProvider, {usePlayer, useConnection} from './context/';

// hooks
import {useUnload} from 'hooks/'

// material
import Button from '@mui/material/Button';

// snippets
import Preloader from './snippets/Preloader'
import CallbackLoader from './snippets/CallbackLoader'
import RippleClick from './snippets/RippleClick'
import KeyboardHelper from './snippets/KeyboardHelper'
import DevBar from './snippets/DevBar/'

// layouts
import Content from './layouts/Content'

// snippets
import Messages from './snippets/Messages'


function PlayerContent(props) {
  const player = usePlayer()
  const connection = useConnection()

  const refMessages = React.useRef(null)
  const refCallback = React.useRef(null)

  useUnload(e => {
    e.preventDefault();
    e.returnValue = '';
  });

  // The component instance will be extended
	// with whatever you return from the callback passed
	// as the second argument
	React.useImperativeHandle(props.innerRef, () => ({
    onCommand: (payload) => {
      refMessages.current.onCommand(payload)
      refCallback.current.onShow(payload)
    },
  }));


  return (
    <div>

      <CallbackLoader ref={refCallback} />
      <Preloader />
      <RippleClick />
      <KeyboardHelper />
      <Messages ref={refMessages} />
      <DevBar />

      <Content />

    </div>
  )
}

const PlayerContext = (props) => (
  <ContextProvider>
    <PlayerContent {...props} />
  </ContextProvider>
)

export default React.forwardRef((props, ref) => (
	<PlayerContext {...props} innerRef={ref} />
))
