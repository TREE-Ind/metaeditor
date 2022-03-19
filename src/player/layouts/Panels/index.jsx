import React from 'react';

// context
import {useLayout} from '../../context/';

// components
import ContentSlider from '../../components/ContentSlider'

// panels
import Description from './Description/'
import Contacts from './Contacts/'
import Configurator from './Configurator/'


function PanelsList() {
  const layout = useLayout();

  const list = [
    {
      slug: 'description',
      children: Description,
      container: true,
      noPadding: false,
    },
    {
      slug: 'configurator',
      children: Configurator,
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
