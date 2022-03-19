import React from 'react';
import PropTypes from 'prop-types';

// blocks
import useOffline from './useOffline'
import useSlowConnection from './useSlowConnection'
import useKillStream from './useKillStream'
import useCommand from './useCommand'


function NotifyController(props) {
  const refCommand = React.useRef(null)

  const offline = useOffline()
  const slowConnection = useSlowConnection()
  const killStream = useKillStream()
  const command = useCommand()

  return {
    sendCommand: payload => command.sendCommand(payload)
  }
}

export default NotifyController
