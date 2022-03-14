import React from "react"

// api
import {env} from 'api/'

// context
import {usePlayer} from '../';

// reducers
import reducer from './reducer'

// hooks
import {useSound} from 'hooks/'

const actions = () => {
  const player = usePlayer()
  const [state, dispatch] = React.useReducer(reducer.reducer, reducer.initialState);

  const soundClick = useSound(env.staticPath('sounds', 'mouse_click.mp3'));

  const DISPATCHER = (payload) => dispatch({
    type: reducer.KEY.UPDATE,
    payload,
  })

  const cls = new class {
    get state() {
      return state;
    }

    get sounds() {
      const play = obj => {
        if(player.state.sounds) {
          obj.play()
        }
      }
      
      return {
        click: () => play(soundClick),
      }
    }

    handleMenu(current_menu) {
      this.sounds.click()
      this.draggableCard.close() //hack for draggable component

      current_menu = state.current_menu === current_menu ? false : current_menu
      DISPATCHER({current_menu, ui_visible: true})
    }

    handleUiVisible() {
      this.sounds.click()
      this.draggableCard.close() //hack for draggable component

      DISPATCHER({ui_visible: !state.ui_visible})
    }

    get draggableCard() {

      const _dispatch = (draggableCard) => dispatch({
        type: reducer.KEY.COMPONENT,
        payload: {draggableCard},
      })

      return {
        data: state.components.draggableCard.data,
        active: state.components.draggableCard.active,
        close: () => {
          _dispatch({active: false})
          setTimeout(() => _dispatch({data: false}), 300)
        },
        open: (title, body) => {
          this.sounds.click()

          const data = {title, body}
          _dispatch({active: false})
          setTimeout(() => _dispatch({active: true, data}), 300)
        }
      };
    }

  }

  return cls
};

export default actions
