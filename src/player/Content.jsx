import React from 'react';

// context
import ContextProvider from './context/';

// hooks
import { useUnload } from 'hooks/'
import { useNotifyController } from './hooks/'

// snippets
import Preloader from './snippets/Preloader/'
import CallbackLoader from './snippets/CallbackLoader'
import RippleClick from './snippets/RippleClick'
import KeyboardHelper from './snippets/KeyboardHelper'
import DevBar from './snippets/DevBar/'
import WelcomeBar from './snippets/WelcomeBar'

// layouts
import Content from './layouts/Content'


function PlayerContent(props) {

  const notifyController = useNotifyController()
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
      notifyController.sendCommand(payload)
      refCallback.current.onShow(payload)
    },
  }));


  return (
    <div>

      <WelcomeBar />

      <CallbackLoader ref={refCallback} />
      <Preloader />
      <RippleClick />
      <KeyboardHelper />
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
