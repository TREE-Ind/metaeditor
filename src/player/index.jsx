import React from 'react';
import PropTypes from 'prop-types';

// api
import {env} from 'api/'

// libs
import PixelStreaming from './lib';

// styles
import {styled} from 'styles/snippets'

// content
import PlayerContent from './Content'

// snippets
import BackPreloader from './snippets/BackPreloader'

const RootDiv = styled.div(theme => ({
  backgroundColor: 'rgba(0,0,0, 1)',
}))

function PixelWrapper(props) {
  const refPixelStreaming = React.useRef(null)
  const refContent = React.useRef(null)

  const getHost = {host: props.host, port: props.port}
  const [serverData, setServerData] = React.useState(getHost)

  React.useEffect(() => {
    setServerData(getHost)
  }, [props.host, props.port])


  return (
    <RootDiv>

      <BackPreloader />

      <PixelStreaming
        ref={refPixelStreaming}
        onLoad={(payload) => {
          console.warn('loaded', payload);
        }}
        onConnect={() => {
          console.warn('connected');
        }}
        onRestart={() => {
          console.warn('onRestart');
        }}
        onError={(payload) => {
          console.error('error', payload);
        }}
        onClose={(payload) => {
          console.error('closed', payload);
        }}
        onCommand={(payload => {
          console.warn('command', payload);
          refContent.current.onCommand(payload)
        })}
        onCallback={(payload => {
          console.warn('callback', payload);
        })}
        onProgress={(payload) => {
          console.warn('progress', payload);
        }}
        onDebug={(payload) => {
          console.warn('debug', payload);
        }}
        autoConnect={props.autoConnect}
        quality={1}
        isDev={env.isDev}
        host={serverData.host}
        port={serverData.port} >

        {(payload) => (
          <>

            <PlayerContent
              {...payload}
              ref={refContent}
              serverData={serverData}
              setServerData={(key, value) => setServerData(c => ({
                ...c, [key]: value,
              }))}
              onRestart={props.onRestart}
              secondsToStart={props.secondsToStart || 0}
              secondsToKill={props.secondsToKill || 0}
              initConnection={payload.initConnection}
              autoConnect={props.autoConnect}
            />

          </>
        )}
      </PixelStreaming>

    </RootDiv>
  )
}

PixelWrapper.propTypes = {
  status: PropTypes.string,
	host: PropTypes.string,
  port: PropTypes.any,
  autoConnect: PropTypes.bool,
  secondsToStart: PropTypes.number,
  secondsToKill: PropTypes.number,
  onRestart: PropTypes.func.isRequired,
};

PixelWrapper.defaultProps = {
  host: undefined,
  port: undefined,
  autoConnect: false,
  secondsToStart: 0,
  secondsToKill: 0,
};

export default PixelWrapper
