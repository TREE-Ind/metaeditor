import React from 'react';
import PropTypes from 'prop-types';

// context
import {usePlayer, useLayout} from '../context/'

// layouts
import AppBar from './AppBar'
import Panels from './Panels/'

// player components
import DraggableCard from 'player/components/DraggableCard'

// styles
import {styled} from 'styles/snippets'

const RootList = styled.ul(theme => ({
  position: 'absolute',
  zIndex: theme.zIndex.appBar,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  height: 'var(--window-height)',
  display: 'flex',
  flexDirection: 'column',

  '& [data-layout-hide]': {
    transition: theme.transitions.create(['opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  '& [data-layout-hide="true"]': {
    opacity: .0,
    pointerEvents: 'none',
  },

  '& > [data-li="content"]': {
    flex: 1,
  },

  '& > li > [data-list="bottom"]': {
    background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)',

    '& > [data-li="appbar"]': {
      pointerEvents: 'all',
    },
  }

}))


function Content(props) {
  const player = usePlayer()
  const layout = useLayout()

  const hideInterfaceAll = player.state.mouse_moving
  const hideInterface = !layout.state.ui_visible

  return (
    <div>
      <RootList>
        <li data-li="content">
          <DraggableCard />
        </li>
        <li data-layout-hide={hideInterfaceAll}>
          <ul data-list="bottom">
            <li data-layout-hide={hideInterface}>
              <Panels />
            </li>
            <li data-li="appbar">
              <AppBar />
            </li>
          </ul>
        </li>
      </RootList>
    </div>
  )
}

Content.propTypes = {
	// onEmit: PropTypes.object.isRequired,
};

Content.defaultProps = {
};

export default Content
