
// context
import {usePlayer} from '../../context/';


// material
import Icon from '@mui/material/Icon';

// components
import Button from './components/Button';


function VolumeButton() {
  const player = usePlayer()

  const isDisabled = !player.state.loaded || !player.state.body_clicked

  return (
    <Button
      tooltip="Volume"
      disabled={isDisabled}
      onClick={() => player.cls.changeVolume()}
      active={false} >
      <Icon>
        {player.state.volume ? 'volume_up' : 'volume_off'}
      </Icon>
    </Button>
  )
}

export default VolumeButton
