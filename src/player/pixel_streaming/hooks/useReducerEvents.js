/* Usage

// hooks
import {useReducerEvents} from 'hooks/'

function Demo() {

  const [state, dispatch] = useReducerEvents(reducer, initialState)

  React.useEffect(() => {

    document.addEventListener('demo_key', (e) => {
      console.log(e.detail)
      dispatch({...})
    })

  }, [])

  return (<div />)

}

*/

import React from 'react';


function useReducerEvents(reducer, initialState) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const ref = React.useRef(state);

  React.useEffect(() => {
    ref.current = state;
  }, [state]);

  return [state, dispatch, ref];
}

export default useReducerEvents
