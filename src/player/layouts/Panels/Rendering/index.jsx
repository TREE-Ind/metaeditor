import React from 'react';

// context
import {useLayout} from 'player/context/';

// material
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';

// styles
import { styled } from 'styles/snippets'

// blocks
import RenderDialog from './RenderDialog/'



const RootList = styled.ul(theme => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 0, 5),
  '& > li': {
    padding: theme.spacing(3, 5),
  },
  '& > [data-li="heading"]': {
    fontSize: '2.5rem',
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'right',

    width: '33%',
    maxWidth: 500,
    borderRight: `solid 1px ${theme.palette.divider}`,
    paddingLeft: 0,
    marginRight: theme.spacing(3),
  },
  '& > [data-li="content"]': {
    flex: 1,
  },
}))

const ActionsContainer = styled.div(theme => ({
  display: 'flex',
  flexWrap: 'wrap',
  paddingTop: theme.spacing(3),
  '& > button': {
    marginRight: theme.spacing(2),
  }
}))



const RESOLUTIONS = [
  '720p', '1080p', '1440p',
]

function Panel() {
  const layout = useLayout()
  const refRenderDialog = React.useRef(null)
  const [resolution, setResolution] = React.useState(RESOLUTIONS[0])
  const [showPanel, setShowPanel] = React.useState(true)

  const handleResolution = (event, newRes) => {
    setResolution(newRes);
  };

  const renderForm = () => {
    return (
      <div>

        <ToggleButtonGroup
          value={resolution}
          exclusive
          color="primary"
          onChange={handleResolution}
        >
          {RESOLUTIONS.map((item, index) => (
            <ToggleButton value={item} key={index}>
              {item}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <ActionsContainer>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={() => {
              refRenderDialog.current.open()
              setShowPanel(false)
            }}>
            Render video
          </Button>
          <Button color="inherit" variant="outlined" size="large">
            Screenshot
          </Button>
        </ActionsContainer>

      </div>
    );
  }

  return (
    <div>
      <RenderDialog
        onClose={() => setShowPanel(true)}
        ref={refRenderDialog} />

      {showPanel && (
        <RootList>
          <li data-li="heading">
            Want to download a video with your design?
          </li>
          <li data-li="content">
            <Typography sx={{mb: 4}} variant="h5">
              Select a resolution and click «Render Video»
            </Typography>
            {renderForm()}
          </li>
        </RootList>
      )}

    </div>
  );
}


export default Panel
