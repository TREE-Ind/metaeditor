import React from "react"

// api
import {env} from 'api/'

// libs
import {Request} from 'libs/'

// reducers
import reducer from './reducer'


const actions = () => {
  const refInterval = React.useRef(null)
  const refKillInterval = React.useRef(null)

  const [state, dispatch_] = React.useReducer(reducer.reducer, reducer.initialState);

  const dispatch = (payload) => dispatch_({
    type: reducer.KEY.UPDATE,
    payload,
  })

  React.useEffect(() => {

    return () => {
      handleStop()
    }

  }, [])

  const handleStop = () => {
    clearInterval(refInterval.current)
    clearInterval(refKillInterval.current)
  }

  const cls = new class {

    constructor() {
      this.MIN_SECONDS_TO_KILL = 100
      this.state = state
    }

    get request() {

      const slug = 'car-2'
      const API_URL = `https://unrealos.com/api/streamsweb/access/${slug}/`;

      return {
        delete: async () => Request.DELETE(API_URL),
        get: async () => Request.GET(API_URL),
      };
    }

    initConnection() {
      window.ps_init()
    }

    handleConnection({host, port}) {
      if(host) {
        dispatch({host})
      }
      if(port) {
        dispatch({port})
      }
    }

    manualConnection({host, port}) {
      dispatch({loaded: true, status: 'localhost', host, port})
    }

    async onRequestStream() {
      handleStop()

      dispatch({auto_connect: true})

      const onStartStream = async () => {

        await this.request.get()
        .then(res => {

          if(res.status === 200) {

            dispatch(res.body)

            if(res.body?.status === 'active') {
              clearInterval(refInterval.current)
              this.onTimeToKill()
            }

          }


        })
        .catch(err => {
          console.log(err)
        });
      }

      await onStartStream()
      dispatch({loaded: true})

      refInterval.current = setInterval(() => onStartStream(), 1000 * 3)
    }

    async onRestartStream() {

      await this.request.delete()
      .then(res => {
        // setTimeout(onRequestStream, 1000 * 1) // Delay: hack for stream server
        document.location.reload();
      })
      .catch(err => {
        console.log(err)
        this.onRestartStream()
      });

    }

    async onTimeToKill() {
      clearInterval(refKillInterval.current)

      const init = async () => {
        await this.request.get()
        .then(json => {

          // console.warn('onTimeToKill()', json);
          dispatch(json)

        })
        .catch(err => {
          console.log(err)
        });
      }

      refKillInterval.current = setInterval(init, 1000 * 10)
    }

  }

  return cls
};

export default actions
