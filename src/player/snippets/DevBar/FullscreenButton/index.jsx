
// context
import {usePlayer} from '../../../context/'
import useFullscreen from './useFullscreen'

// styles
import {styled} from 'styles/snippets'

// material
import Icon from '@mui/material/Icon';
import MuiButton from '@mui/material/Button';


const Button = styled.custom(MuiButton, theme => ({
  width: 48,
  height: 48,
  minWidth: 'auto',
}))



function FullscreenButton() {
  const player = usePlayer()
  const fullscreen = useFullscreen();

  const bodyClicked = player.state.body_clicked

  return (
    <Button
      onClick={() => {
        if(fullscreen.active) {
          fullscreen.close()
        } else {
          fullscreen.open()
        }
      }}
      variant={fullscreen.active ? 'outlined' : 'contained'}
      color="primary"
      disabled={!bodyClicked}
      >
      <Icon>
        {fullscreen.active ? 'close' : 'fullscreen'}
      </Icon>
    </Button>
  )
}

export default FullscreenButton
