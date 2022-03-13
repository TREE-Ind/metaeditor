import React from "react";
import PropTypes from 'prop-types';

// libs
import moment from 'moment'

// hooks
import {useNotify} from 'hooks/'
import {useCountdown} from '../../hooks/'

// context
import {usePlayer} from '../../context/'


function KillStream(props) {
  const notify = useNotify()
  const player = usePlayer()

  const [time, setTime] = React.useState(false)

  const countdown = useCountdown({
		seconds: props.secondsToKill,
		onProgress: (payload) => {
      // console.error('>>> secondsToKill', payload);

      // const newTime = moment.utc(props.secondsToKill*1000).format('HH:mm:ss');
      const newTime = moment().add(props.secondsToKill, 'seconds').format('HH:mm')

      setTime(newTime)
    },
	})

  React.useEffect(() => {

    if(!player.loaded) {
      countdown.stop()
      cls.hide()
    }

	}, [player.loaded])

  React.useEffect(() => {

    if(player.loaded) {
      if(props.secondsToKill > 60) {
        countdown.stop()
        cls.hide()
  		} else {
        countdown.start()
        cls.show()
      }
    }

	}, [player.loaded, props.secondsToKill])

  const cls = new class {
    constructor() {
      this.key = 'kill-stream'
    }

    show() {
      notify.warning('No activity. The connection will be closed in '+time, {
        key: this.key,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        },
        autoHideDuration: 1000 * 100,
        // resumeHideDuration: 1000 * 10,
      })
    }
    hide() {
      notify.classByKey(this.key)
    }
  }

  return (<div />)
}

KillStream.propTypes = {
  secondsToKill: PropTypes.number.isRequired,
};

KillStream.defaultProps = {
  secondsToKill: 0,
};

export default KillStream
