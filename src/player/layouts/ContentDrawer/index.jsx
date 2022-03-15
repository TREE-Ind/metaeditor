import React from 'react';
import PropTypes from 'prop-types';

// context
import {useLayout} from '../../context/'

// blocks
import BodyColor from './blocks/BodyColor'
import InteriorColor from './blocks/InteriorСolor'
import DefaultBlock from './blocks/DefaultBlock'


// components
import Drawer from './components/Drawer'


function ContentDrawer(props) {
  const layout = useLayout()

  const streamDrawer = layout.state.components.streamDrawer
  const showDrawer = streamDrawer.active && props.show
  const slug = streamDrawer.slug


  const list = {
    body_color: ['Body Color', BodyColor],
    interior_color: ['Interior Color', InteriorColor],
    default: ['Default', DefaultBlock],
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
