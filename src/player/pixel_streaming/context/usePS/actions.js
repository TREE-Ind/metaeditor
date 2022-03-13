import React from "react"

// hooks
import {useWindowSize} from '../../hooks/'

// libs
import moment from 'moment'

// reducers
import reducer from './reducer'
const {defaultState} = reducer

// pixel streaming
import ClientClass from '../../client/'



const actions = () => {
  const windowSize = useWindowSize();

  const [state, dispatch] = React.useReducer(reducer.reducer, reducer.initialState);

  const [commandsList, setCommandsList] = React.useState([])
  const [callbacksList, setCallbacksList] = React.useState([])

  const DISPATCHER = (payload) => dispatch({
    type: reducer.KEY.UPDATE,
    payload,
  })

  // Resizing window
  React.useEffect(() => {

    if(
      state.window_size.width !== windowSize.width ||
      state.window_size.height !== windowSize.height
    ) {
      DISPATCHER({window_size: windowSize})
      ClientClass.resize(state.resolution_multiplier)
    }

  }, [windowSize])


  // Listen debug messages
  const debugRef = React.useRef(null)
  const debugListener = ({detail}) => {
    if(typeof debugRef.current === 'function') {
      debugRef.current(detail)
    }
  }

  // Detect body click (for webrtc sound)
  const bodyClick = React.useCallback((event) => {
    if(state.loaded === null) {
      DISPATCHER({volume: true})
    }
  }, [])


  React.useEffect(() => {
    document.addEventListener('ps_debug', debugListener) // Debug messages
    document.body.addEventListener('click', bodyClick);  // Click body

    return () => {
      debugRef.current = null
      document.removeEventListener('ps_debug', debugListener)
      document.body.removeEventListener('click', bodyClick); // Remove body click listener
    }
  }, [])

  // Init original pixel streaming module
  const cls = new class {

    constructor() {
      this.client = ClientClass
    }

    get commands() {
      return {
        clear: () => setCommandsList([]),
        list: commandsList,
      };
    }

    get callbacks() {
      return {
        clear: () => setCallbacksList([]),
        list: callbacksList,
      };
    }

    init({
      host, port, quality,
      onRestart, onCommand, onCallback,
      onLoad, onConnect, onError, onClose, onDebug,
    }) {

      // Set resolution multiplier
      if(typeof quality === 'number') {
        DISPATCHER({resolution_multiplier: quality})
      }

      // Sending events listener to onDebug function
      debugRef.current = (payload) => {
        if(typeof onDebug !== 'function') return ;
        onDebug(payload)
      }

      this.client.init({
        onUserCount: (count) => {
          DISPATCHER({users_count: count})
        },
        onCommand: (payload) => {
          console.warn('::onCommand');
          payload = {
            time: moment.utc().format(),
            error: undefined, // if true the show debug message
            ...payload,
          }

          onCommand(payload)
          setCommandsList(c => [payload, ...c].filter((o,i) => i < 100))
        },
        onCallback: (detail) => {
          detail = {
            ...detail,
            time: moment.utc().format()
          }

          onCallback(detail)
          setCallbacksList(c => [detail, ...c].filter((o,i) => i < 100))

          // // Update state from click on stream
          // if(detail?.caller === 'stream') {
          //
          //   const newItem = {
          //     key: detail.type,
          //     caller: detail.caller,
          //     value: detail.payload.value,
          //   }
          //
          //   console.error('@@callback', newItem);
          //
          //   dispatch.commands.updateItem(newItem)
          //   DISPATCHER({callback_caller: 'stream'})
          //
          // }
        },
        onLoad: (stream_config) => {
          console.warn('::onLoad');
          DISPATCHER({...defaultState, loaded: true, connected: true, stream_config})

          onLoad(stream_config)
          // renewIntercation()
        },
        onConnect: () => {
          console.warn('::onConnect');
          DISPATCHER({...defaultState, connected: true})

          onConnect()
        },
        onError: ({code, reason}) => {
          console.warn('::onError', {code, reason});
          DISPATCHER({
            error: {code, reason},
            connected: false,
          })

          onError({code, reason})
        },
        onClose: async ({code, reason}) => {
          console.warn('::onClose', {code, reason});

          DISPATCHER({
            ...defaultState,
            closed: {code, reason},
            loaded: false,
            connected: false,
          })

          if(code === 4000) { // stream server closed
            await onRestart()
    			}

          onClose()
        },
        onMouseMove: (mouse_moving) => {
          DISPATCHER({mouse_moving})
          // renewIntercation()
        },
        onAggregatedStats: (aggregated_stats) => {
          DISPATCHER({aggregated_stats})
        },
        onQuality: (quality_speed) => {
          DISPATCHER({quality_speed})
        },
        // onWarnTimeout: () => {
        //
        // },
        // onCloseTimeout: () => {
        //
        // },
        credentials: {
          host,
          port,
          warnTimeout: 120,
          closeTimeout: 10,
          lockMouse: false,
          autoPlay: true,
        },
      })

    }

    get __ws_locked__() {
      if(!state.loaded || !state.connected) {
        console.error('Can\'t perform action');
        return true;
      }
      return false;
    }

    changeQuality(resolution_multiplier) {
      if(this.__ws_locked__) return ;

      this.client.resize(resolution_multiplier)
      DISPATCHER({resolution_multiplier})
    }

    changeVolume() {
      if(this.__ws_locked__) return ;

      const volume = !state.volume
      DISPATCHER({volume})

      this.client.emit({
        type: 'system_sound',
        value: volume,
        verification_id: undefined,
      })
    }

    playStop() {
      if(state.loaded !== state.connected) {
        console.error('Can\'t perform action');
        return false;
      }

      const paused = !state.loaded

      if(paused) {
        this.client.reinit()
      } else {
        this.client.exit()
        DISPATCHER({
          loaded: false,
          connected: false,
        })
      }

    }

  }

  return {
    state,
    cls,
  }
};

export default actions
