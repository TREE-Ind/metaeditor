
// styles
import {styled} from 'styles/snippets'

// block
import FullscreenButton from './FullscreenButton/'
import VolumeButton from './VolumeButton'


const RootDiv = styled.div((theme) => ({
  '& > button': {
    marginLeft: theme.spacing(1)
  }
}))

function PublicBar() {
  return (
    <RootDiv>
      <VolumeButton />
      <FullscreenButton />
    </RootDiv>
  )
}

export default PublicBar
