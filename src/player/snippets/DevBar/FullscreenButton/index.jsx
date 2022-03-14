
// context
import {usePlayer} from '../../../context/'
import useFullscreen from './useFullscreen'

// material
import Button from '@mui/material/Button';



function FullscreenButton() {
  const player = usePlayer()
  const fullscreen = useFullscreen();

  if(!fullscreen.active) {
    return (<div />);
  }

  return (
    <Button
      onClick={() => {
        fullscreen.open()
      }}
      disabled={!player.state.body_clicked}
      variant="contained" color="primary" sx={{mr: 2}} >
      Fullscreen
    </Button>
  )
}

export default FullscreenButton
