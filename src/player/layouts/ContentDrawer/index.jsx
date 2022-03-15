import React from 'react';
import PropTypes from 'prop-types';

// context
import {useLayout} from '../../context/'

// blocks
import DemoBlock from './blocks/Demo'

// components
import Drawer from './components/Drawer'


function ContentDrawer(props) {
  const layout = useLayout()

  const streamDrawer = layout.state.components.streamDrawer
  const showDrawer = streamDrawer.active && props.show

  return (
    <div>
      <Drawer
        show={showDrawer}
        onClose={() => {
          layout.handleDrawer.close()
        }}
        title="Demo title"
        height={props.height}>
        <DemoBlock />
      </Drawer>
    </div>
  );
}

ContentDrawer.propTypes = {
	show: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
};

ContentDrawer.defaultProps = {
  show: false,
  height: 0,
};

export default ContentDrawer
