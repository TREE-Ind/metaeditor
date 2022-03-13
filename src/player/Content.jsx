import React from 'react';
import PropTypes from 'prop-types';

// context
import ContextProvider, {usePlayer} from './context/';

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
  const refMessages = React.useRef(null)
  const refCallback = React.useRef(null)

  const player = usePlayer()

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
      <Preloader secondsToStart={props.secondsToStart} />
      <RippleClick />
      <KeyboardHelper />

      <Messages
        ref={refMessages}
        secondsToKill={props.secondsToKill} />

      <DevBar
        onRestart={props.onRestart}
        serverData={props.serverData}
        setServerData={props.setServerData}
        autoConnect={props.autoConnect}
        initConnection={props.initConnection}
      />

      <Content />

    </div>
  )
}


PlayerContent.propTypes = {
  onRestart: PropTypes.func.isRequired,
  secondsToStart: PropTypes.number.isRequired,
  secondsToKill: PropTypes.number.isRequired,
  serverData: PropTypes.exact({
    host: PropTypes.string,
    port: PropTypes.any,
  }),
  setServerData: PropTypes.func.isRequired,
  initConnection: PropTypes.func.isRequired,
  autoConnect: PropTypes.bool.isRequired,
};

PlayerContent.defaultProps = {
  secondsToStart: 0,
  secondsToKill: 0,
};

const PlayerContext = (props) => (
  <ContextProvider>
    <PlayerContent {...props} />
  </ContextProvider>
)

export default React.forwardRef((props, ref) => (
	<PlayerContext {...props} innerRef={ref} />
))
