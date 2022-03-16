import React from 'react';
import PropTypes from 'prop-types';

// api
import {env} from 'api/'

// context
import {usePlayer, useConnection} from '../context/'

// hooks
import {useCountdown} from '../hooks/'

// material
import Typography from '@mui/material/Typography';
import MuiBox from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import MuiLinearProgress from '@mui/material/LinearProgress';

// styles
import {styled} from 'styles/snippets'

// config
const videoUrl = env.staticUrl('videos', 'intro.mp4')
const logoUnrealEngine = env.staticUrl('player', 'logo_ue.svg')


const LogoDiv = styled.div(theme => ({
  paddingBottom: theme.spacing(4),
  '& > img': {
    maxWidth: 100,
  }
}))

const RootBox = styled.custom(MuiBox, theme => ({
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  height: 'var(--window-height)',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}))

const ProgressBox = styled.custom(MuiBox, theme => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'relative',
}))

const LinearProgress = styled.custom(MuiLinearProgress, theme => ({
  height: 1,
  width: '20vw',
  [theme.breakpoints.down('sm')]: {
    width: '50vw',
  },
}))

const VideoCover = styled.div(theme => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  backgroundColor: 'rgba(0,0,0, 1)',
  '& > video': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: .4,

    position: 'absolute',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    objectFit: 'cover',
  },

}))

function Preloader() {
  const player = usePlayer()
  const connection = useConnection()

  const secondsToStart = connection.state.seconds_to_start

  const countdown = useCountdown({
		seconds: secondsToStart,
		onProgress: (payload) => {
      // console.error('>>> onProgress', payload);
    },
	})

	React.useEffect(() => {

		if(player.state.loaded) {
      countdown.stop()
		}

	}, [player.state.loaded])

  const renderInner = () => {

    if(player.state.connected && player.state.loaded) {
      return (<div />);
    }

    const renderPreloader = () => {

      if(countdown.value === 0 || countdown.value >= 100) {
        return (
          <CircularProgress
            color="inherit"
            size={30} />
        );
      }

      return (
        <ProgressBox>

          <LogoDiv>
            <img src={logoUnrealEngine} />
          </LogoDiv>

          <LinearProgress
            variant="determinate"
            value={countdown.value}
            color="inherit" />

          <Typography variant="body1" sx={{mt: 3}}>
            Loading 3D
          </Typography>

        </ProgressBox>
      );
    }

    return (
      <div>

        <VideoCover>
          <video loop autoPlay muted>
            <source src={videoUrl} type="video/mp4" />
          </video>
        </VideoCover>

        {renderPreloader()}
      </div>
    )
  }

  if(player.state.loaded) {
    return (<div />);
  }

  return (
    <RootBox sx={{ flexGrow: 1 }}>
      {renderInner()}
    </RootBox>
  )
}


export default Preloader
