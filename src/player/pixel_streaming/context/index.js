/* Usage

***** wrapper
// context
import ContextProvider from './context/';

return (
  <ContextProvider>
    {children...}
  </ContextProvider>
)

***** injection
// context
import {usePS} from './context/';

const PS = usePS()

*/


import React from "react";
import PSProvider, { usePS } from './usePS/';

function ContextProvider(props) {
  return (
    <PSProvider>
      {props.children}
    </PSProvider>
  )
}

export {
  usePS,
}

export default ContextProvider
