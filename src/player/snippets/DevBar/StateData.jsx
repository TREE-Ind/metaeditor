
// context
import { usePlayer } from 'player/context/';

// components
import JsonEditor from 'components/JsonEditor/'

function StateData() {
  const player = usePlayer()

  return (
    <div>
      <JsonEditor
        label="State data"
        content={player.state}
        height={'50vh'}
        onChange={() => { }}
        viewOnly
      />
    </div>
  )
}

export default StateData
