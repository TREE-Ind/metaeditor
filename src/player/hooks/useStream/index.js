import * as React from 'react';

// use
import useApi from './useApi'

// config
const API_URL_BUILDER = (slug) => `https://unrealos.com/api/streamsweb/access/${slug}/`
const API_URL = API_URL_BUILDER('car-2')


export default function useStream(props) {

  const refInterval = React.useRef(null)
  const refKillInterval = React.useRef(null)

  const [loaded, setLoaded] = React.useState(false)
  const [data, setData] = React.useState({
    status: 'localhost',
    host: undefined,
    port: undefined,

    entry_id: undefined,
    host: undefined,
    port: undefined,
    que: undefined,
    seconds_to_kill: undefined,
    seconds_to_start: undefined,
    status: undefined,
  })

  React.useEffect(() => {

    if(props.autoConnect) {
      onStartInterval()
    } else {
      setLoaded(true)
    }

    return () => {
      clearInterval(refInterval.current)
      clearInterval(refKillInterval.current)
    }

  }, [])

  const onStartInterval = async () => {
    clearInterval(refInterval.current)
    clearInterval(refKillInterval.current)

    await onStartStream()
    setLoaded(true)

    refInterval.current = setInterval(onStartStream, 1000 * 3)
  }

  const onTimeToKill = async () => {
    clearInterval(refKillInterval.current)

    const init = async () => {
      await useApi.get(API_URL)
      .then(json => {

        // console.warn('onTimeToKill()', json);
        setData(json)

      })
      .catch(err => {
        console.log(err)
      });
    }

    refKillInterval.current = setInterval(init, 1000 * 10)
  }

  const onStartStream = async () => {

    await useApi.get(API_URL)
    .then(json => {

      setData(json)

      if(json?.status === 'active') {
        clearInterval(refInterval.current)
        onTimeToKill()
      }

    })
    .catch(err => {
      console.log(err)
    });
  }

  const onRestartStream = async () => {

    await useApi.delete(API_URL)
    .then(json => {
      // setTimeout(onStartInterval, 1000 * 1) // Delay: hack for stream server
      document.location.reload();
    })
    .catch(err => {
      console.log(err)
      onRestartStream()
    });

  }

  return {
    onRestartStream,
    loaded,
    data,
  }

}
