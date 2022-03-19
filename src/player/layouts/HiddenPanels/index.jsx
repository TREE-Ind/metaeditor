import React from 'react';

// context
import {useLayout} from '../../context/';

// material
import MuiChip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// styles
import {styled} from 'styles/snippets'

// components
import Container from 'player/components/Container'


const RootDiv = styled.div(theme => ({

  padding: theme.spacing(3, 0),
  opacity: .4,
  pointerEvents: 'all',
  transition: theme.transitions.create(['opacity'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  '&:hover': {
    opacity: 1,
  },

}))

const ContentDiv = styled.div(theme => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const Chip = styled.custom(MuiChip, theme => ({
  borderColor: `rgba(255,255,255, .2)`,
  pointerEvents: 'all',
}))


function PanelsList() {

  const list = [
    ['Intro'],
    ['Exterior'],
    ['Side View'],
    ['Front View'],
    ['Wheels'],
    ['Back View'],
    ['Driver'],
    ['Passenger'],
    ['Interior'],
  ].map(([label]) => ({label}))

  return (

    <RootDiv>
      <Container>

        <ContentDiv>
          <Typography variant="h6" sx={{mr: 3, cursor: 'default'}}>
            Quick view:
          </Typography>

          <Stack direction="row" spacing={1}>
            {list.map((item, index) => (
              <Chip
                key={index}
                label={item.label}
                variant="outlined"
                color="default"
                onClick={() => {}} />
            ))}
          </Stack>

        </ContentDiv>

      </Container>
    </RootDiv>
  );
}


export default PanelsList
