import React from 'react';

// context
import {useLayout} from '../../context/';

// components
import ContentSlider from '../../components/ContentSlider'

// panels
import About from './About/'
import Contacts from './Contacts/'
import Configuration from './Configuration/'


function PanelsList() {
  const layout = useLayout();

  const list = [
    {
      slug: 'about',
      children: About,
      container: true,
      noPadding: false,
    },
    {
      slug: 'сonfiguration',
      children: Configuration,
      container: false,
      noPadding: false,
    },
    {
      slug: 'contacts',
      children: Contacts,
      container: true,
      noPadding: false,
    },
  ]

  const slug = layout.state.current_menu

  return (
    <div>

      <ContentSlider
        list={list}
        slug={slug}
      />

    </div>
  );
}


export default PanelsList
