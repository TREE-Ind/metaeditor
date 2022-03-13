import React from 'react';
import PropTypes from 'prop-types';

// context
import {usePlayer} from '../../context/'

// blocks
import Offline from './Offline'
import KillStream from './KillStream'
import Command from './Command'


function Messages(props) {
  const refCommand = React.useRef(null)
  const player = usePlayer()

  // The component instance will be extended
	// with whatever you return from the callback passed
	// as the second argument
	React.useImperativeHandle(props.innerRef, () => ({
    onCommand: (payload) => {
      refCommand.current.onCommand(payload)
    }
  }));

  return (
    <>
      <Offline />

      {player.state.loaded && (
        <KillStream secondsToKill={props.secondsToKill} />
      )}

      <Command ref={refCommand} />
    </>
  )
}

Messages.propTypes = {
  secondsToKill: PropTypes.number.isRequired,
};

Messages.defaultProps = {
  secondsToKill: 0,
};

export default React.forwardRef((props, ref) => (
	<Messages {...props} innerRef={ref} />
))
