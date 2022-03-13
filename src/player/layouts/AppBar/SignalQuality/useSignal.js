
// hooks
import {useHelpers} from 'hooks/'

// context
import {usePlayer} from '../../../context/'


function useSignal(props) {
  const player = usePlayer()
  const helpers = useHelpers();

	const bitrate = player.state.aggregated_stats?.bitrate || 0
  const bytesReceived = player.state.aggregated_stats?.bytesReceived || 0

	const getStrength = () => {
		if(bitrate < 1000) {
			return 1;
		} else if(bitrate < 3000) {
			return 2;
		} else {
			return 3;
		}
	}

	const signal = getStrength()

	const bitrate_hint = helpers.format.formatNumber(bitrate, {
		decimal: 0,
		separator: '.',
	})

  const received_hint = helpers.format.formatBytes(bytesReceived)

  return {
    signal,
    bitrate_hint,
    received_hint,
  };

}

export default useSignal
