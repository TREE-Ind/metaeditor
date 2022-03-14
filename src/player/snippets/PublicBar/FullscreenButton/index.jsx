
// context
import useFullscreen from './useFullscreen'

// material
import Icon from '@mui/material/Icon';

// components
import Button from '../components/Button';


function FullscreenButton() {
  const fullscreen = useFullscreen();

  return (
    <Button
      tooltip="Fullscreen"
      onClick={() => {
        if(fullscreen.active) {
          fullscreen.close()
        } else {
          fullscreen.open()
        }
      }}
      active={fullscreen.active} >
      <Icon>
        {fullscreen.active ? 'close' : 'fullscreen'}
      </Icon>
    </Button>
  )
}

export default FullscreenButton
