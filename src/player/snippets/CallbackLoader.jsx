import React from 'react';

// context
import {usePlayer} from 'player/context/';

// styles
import {styled} from 'styles/snippets'

// material
import MuiLinearProgress from '@mui/material/LinearProgress';
import MuiBox from '@mui/material/Box';


const Box = styled.custom(MuiBox, theme => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,

  zIndex: theme.zIndex.modal + 1,
}))

const LinearProgress = styled.custom(MuiLinearProgress, theme => ({
  // backgroundColor: 'rgba(255,255,255, .1)',
}))

function CallbackLoader(props) {
  const player = usePlayer()
  const refInteval = React.useRef(null)

  const [progress, setProgress] = React.useState(0);
  const playerLoaded = player.state.loaded

  React.useEffect(() => {
    return () => {
      handleClose()
    };
  }, []);

  // The component instance will be extended
	// with whatever you return from the callback passed
	// as the second argument
	React.useImperativeHandle(props.innerRef, () => ({
    onShow: (payload) => {
      handleOpen(payload)
    },
    onClose: () => {
      handleClose()
    },
  }));

  const handleOpen = (payload) => {
    if(!playerLoaded || ['console_command'].includes(payload?.type)) return ;

    handleClose()

    refInteval.current = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(refInteval.current);
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
  };

  const handleClose = () => {
    clearInterval(refInteval.current);
    setProgress(0)
  };

  if(progress <= 0 || progress >= 100) {
    return (<div />);
  }

  return (
    <Box>
      <LinearProgress variant="determinate" color="inherit" value={progress} />
    </Box>
  );
}

export default React.forwardRef((props, ref) => (
	<CallbackLoader {...props} innerRef={ref} />
))
