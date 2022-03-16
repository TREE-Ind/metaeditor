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
import {usePlayer} from './context/';

const player = usePlayer()

*/


import React from "react";
import PlayerProvider, {usePlayer} from './usePlayer/';
import LayoutProvider, {useLayout} from './useLayout/';
import {useConnection} from './useConnection/';


function ContextProvider(props) {
  return (
    <PlayerProvider>
      <LayoutProvider>
        {props.children}
      </LayoutProvider>
    </PlayerProvider>
  )
}

export {
  usePlayer,
  useLayout,
  useConnection,
}

export default ContextProvider
