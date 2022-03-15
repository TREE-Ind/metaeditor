import React from "react"

// reducers
import reducer from './reducer'

// context
import {usePS} from '../../lib'

const actions = () => {
  const PS = usePS()

  const [state, dispatch] = React.useReducer(reducer.reducer, reducer.initialState);

  const DISPATCHER = (payload) => dispatch({
    type: reducer.KEY.UPDATE,
    payload,
  })


  const commands = new class {
    constructor() {}

    _emit(type, value, verification_id=undefined) {
      PS.cls.client.emit({type, value, verification_id})
    }

    testCommand(value) {
      this._emit('test_command', value)
    }
  }

  const response = new class {
    get state() {
      return PS.state;
    }
    get cls() {
      return PS.cls;
    }
    get cmd() {
      return commands;
    }
  }

  return response
};

export default actions
