import * as React from 'react';

// api
import {env} from 'api/'

// components
import Player from 'player/'

// custom
import {useStream} from 'player/hooks/'

// const isDev = !env.isDev
const autoConnect = true

const Home = () => {
  const stream = useStream({autoConnect})

  if(!stream.loaded) {
    return (<div />)
  }

  return (
    <div>
      {/*<pre>{JSON.stringify(stream, null, 4)}</pre>*/}

      <Player
        onRestart={stream.onRestartStream}
        autoConnect={autoConnect}
        status={stream.data.status}
        host={stream.data.host || undefined}
        port={stream.data.port || undefined}
        secondsToStart={stream.data.seconds_to_start}
        secondsToKill={stream.data.seconds_to_kill}
      />
    </div>
  )

};

export default Home;
