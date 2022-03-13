import React from 'react';

// material
import Container from '@mui/material/Container';

// material
import { styled } from 'styles/snippets'
// import AppBar from '@mui/material/AppBar';


const RootDiv = styled.div(theme => ({
  overflowX: 'hidden',
  overflowY: 'auto',
  maxHeight: 300,
  // padding: theme.spacing(3),
  // backgroundColor: 'rgba(255, 255, 255, .1)',
  // pointerEvents: 'all',
}))



function SimpleContainer(props) {

  return (
    <Container maxWidth="lg">
      <RootDiv>
        {props.children}
      </RootDiv>
    </Container>
  );
}


export default SimpleContainer
