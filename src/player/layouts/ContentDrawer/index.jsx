import React from 'react';
import PropTypes from 'prop-types';

// context
import {useLayout} from '../../context/'

// blocks
import BlockPaint from './blocks/BlockPaint'
import BlockWheels from './blocks/BlockWheels'
import BlockTrim from './blocks/BlockTrim'
import BlockLeather from './blocks/BlockLeather'
import BlockSeats from './blocks/BlockSeats'


// components
import Drawer from './components/Drawer'


function ContentDrawer(props) {
  const layout = useLayout()

  const streamDrawer = layout.state.components.streamDrawer
  const showDrawer = streamDrawer.active && props.show
  const slug = streamDrawer.slug


  const list = {
    paint: ['Paint', BlockPaint],
    wheels: ['Wheels', BlockWheels],
    trim: ['Trim', BlockTrim],
    leather: ['Leather', BlockLeather],
    seats: ['Seats', BlockSeats],
  }

  const renderContent = () => {
    if(!list.hasOwnProperty(slug)) return ;
    return list[slug][1]();
  }

  return (
    <div>
      <Drawer
        show={showDrawer}
        onClose={() => {
          layout.handleDrawer.close()
        }}
        title={list.hasOwnProperty(slug) && list[slug][0]}
        height={props.height}>
        {renderContent()}
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
