import React from "react";

// context
import {usePlayer} from 'player/context/'
import useSignal from 'player/layouts/AppBar/SignalQuality/useSignal.js'

// libs
import useOnlineStatus from 'react-online-hook';

// hooks
import {useNotify} from 'hooks/'

function useSlowConnection() {
  const signal = useSignal()
  const notify = useNotify()
  const player = usePlayer()

  React.useEffect(() => {

    if(!player.state.loaded) return ;

    const notifyKey = 'is-slow-connection'

    if(signal.strength > 1) {
      notify.closeByKey(notifyKey)
      return ;
    }

    notify.warning(`Very slow connection`, {
      key: notifyKey,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center"
      },
      autoHideDuration: 1000 * 3,
      // resumeHideDuration: 1000 * 10,
    })

  }, [player.state.loaded, signal.strength])

  return ;
}

export default useSlowConnection
