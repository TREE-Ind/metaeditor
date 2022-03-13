import React from 'react';
import PropTypes from 'prop-types';

// material
import MuiBox from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';

// styles
import {styled, alpha} from 'styles/snippets'


const Box = styled.custom(MuiBox, theme => ({
  maxHeight: '100%',
  backgroundColor: alpha(theme.palette.background.paper, .9),
  pointerEvents: 'all',
  overflow: 'auto',
  padding: theme.spacing(2, 3, 3),
  borderRadius: theme.shape.borderRadius,
  zIndex: theme.zIndex.appBar + 2,
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    width: 'calc(100vw - 30px)',
  },
  [theme.breakpoints.up('md')]: {
    width: '100%',
    minWidth: 500,
    maxWidth: '40vw',
  },
}))

const HeaderList = styled.ul(theme => ({
  display: 'flex',
  alignItems: 'center',
  paddingBottom: theme.spacing(1),
  marginBottom: theme.spacing(2),
  borderBottom: `solid 1px ${theme.palette.divider}`,
  '& > [data-li="title"]': {
    flexGrow: 1,
    ...theme.typography.h6,
  }
}))




function SystemDialog(props) {
  const [open, setOpen] = React.useState(false)

  // The component instance will be extended
	// with whatever you return from the callback passed
	// as the second argument
	React.useImperativeHandle(props.innerRef, () => ({
    open: () => setOpen(c => !c),
    // close: () => setOpen(false),
  }));

  if(open === false) {
    return (<div />);
  }

  return (
    <Box>

      <HeaderList>
        <li data-li="title">
          {props.title}
        </li>
        <li>
          <IconButton onClick={() => {
            setOpen(false)
            props.onClose()
          }}>
            <Icon>close</Icon>
          </IconButton>
        </li>
      </HeaderList>

      {props.children}
    </Box>
  )
}


SystemDialog.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.forwardRef((props, ref) => (
	<SystemDialog {...props} innerRef={ref} />
))
