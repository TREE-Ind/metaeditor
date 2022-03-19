import * as React from 'react';

// material
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// styles
import {styled} from 'styles/snippets'

// blocks
import Progress from './Progress'


const RootDiv = styled.div(theme => ({
  flexDirection: 'column',
  minWidth: 500,
  border: `solid 3px rgba(255,255,255, .3)`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(5),
  backgroundColor: 'rgba(0,0,0,.7)',
}))

const DetailsDiv = styled.div(theme => ({
  padding: theme.spacing(4, 0),
  '& > ul': {
    ...theme.typography.body1,
    display: 'flex',
    padding: theme.spacing(.5, 0),
    '& > li': {
      '&:nth-child(1)': {
        width: 130,
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:nth-child(2)': {
        flex: 1,
      },
    }
  }
}))

function RenderDialog(props) {
  const [open, setOpen] = React.useState(false);

  // The component instance will be extended
	// with whatever you return from the callback passed
	// as the second argument
	React.useImperativeHandle(props.innerRef, () => ({
    open: () => {
      setOpen(true);
    },
  }));

  const handleClose = () => {
    setOpen(false);
    props.onClose()
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const renderDetails = () => {
    const list = [
      ['Total Frames', '0 of 672'],
      ['Resolution', '1080p'],
      ['Duration', '2:31'],
    ].map(([label, value]) => ({label, value}))

    return (
      <DetailsDiv>
        {list.map((item, index) => (
          <ul key={index}>
            <li>
              {item.label}:
            </li>
            <li>
              {item.value}
            </li>
          </ul>
        ))}
      </DetailsDiv>
    );
  }

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, pointerEvents: 'all' }}
        open={open}
      >
        <RootDiv>

          <Typography variant="h2" sx={{mb: 5}}>
            Render Preview
          </Typography>

          <Progress />

          {renderDetails()}

          <Button
            onClick={handleClose}
            size="large"
            variant="outlined"
            color="inherit"
            fullWidth>
            Cancel
          </Button>

        </RootDiv>

      </Backdrop>
    </div>
  );
}


export default React.forwardRef((props, ref) => (
	<RenderDialog {...props} innerRef={ref} />
))
