import React from 'react';
import PropTypes from 'prop-types';

// api
import { env } from 'api/'

// libs
import PixelStreaming from './lib';

// context
import ConnectionProvider, { useConnection } from './context/useConnection/';

// styles
import { styled } from 'styles/snippets'

// content
import PlayerContent from './Content'

// snippets
import BackPreloader from './snippets/BackPreloader'



const RootDiv = styled.div(theme => ({
  backgroundColor: 'rgba(0,0,0, 1)',
  height: 'var(--window-height)',
}))

const isDev = env.isDev

function PixelWrapper({ autoConnect, ...props }) {
  const connection = useConnection()

  const refPixelStreaming = React.useRef(null)
  const refContent = React.useRef(null)

  React.useEffect(() => {

    if (autoConnect) {
      connection.onRequestStream()
    }

  }, [])

  if (connection.state.auto_connect && !connection.state.loaded) {
    return (<div />);
  }

  return (
    <RootDiv>

      <BackPreloader />

      <PixelStreaming
        ref={refPixelStreaming}
        onLoad={(payload) => {
          // console.warn('loaded', payload);
        }}
        onConnect={() => {
          // console.warn('connected');
        }}
        onRestart={() => {
          // console.warn('onRestart');
        }}
        onError={(payload) => {
          // console.error('error', payload);
        }}
        onClose={(payload) => {
          // console.error('closed', payload);
        }}
        onCommand={(payload => {
          // console.warn('command', payload);
          refContent.current.onCommand(payload)
        })}
        onCallback={(payload => {
          // console.warn('callback', payload);
        })}
        onProgress={(payload) => {
          // console.warn('progress', payload);
        }}
        autoConnect={autoConnect}
        quality={1}
        isDev={isDev}
        host={connection.state.host}
        port={connection.state.port} >

        {(payload) => (
          <PlayerContent ref={refContent} />
        )}
      </PixelStreaming>

    </RootDiv>
  )
}

PixelWrapper.propTypes = {
  autoConnect: PropTypes.bool,
};

PixelWrapper.defaultProps = {
  autoConnect: false,
};


const PixelWrapperContext = (props) => (
  <ConnectionProvider>
    <PixelWrapper {...props} />
  </ConnectionProvider>
)

export default PixelWrapperContext