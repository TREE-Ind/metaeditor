import React from 'react';
import PropTypes from 'prop-types';

// material
import Box from '@mui/material/Box';

// styles
import {styled} from 'styles/snippets'

const RootDiv = styled.custom(Box, theme => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(0,0,0, .3)',
  marginBottom: 5,

  pointerEvents: 'all',

  transition: theme.transitions.create(['background-color', 'border-color'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  cursor: 'pointer',
  border: `solid 1px rgba(255,255,255, .15)`,
  '&:hover': {
    backgroundColor: 'rgba(0,0,0, .4)',
    borderColor: 'rgba(255,255,255, .4)',
  },
  
}))

function DrawerCard(props) {

  return (
    <RootDiv>
      {props.children}
    </RootDiv>
  );
}

DrawerCard.propTypes = {
	children: PropTypes.node.isRequired,
};


export default DrawerCard
