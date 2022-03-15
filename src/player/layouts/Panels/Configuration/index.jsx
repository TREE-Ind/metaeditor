import React from 'react';

// api
import {env} from 'api/'

// context
import {usePlayer, useLayout} from '../../../context/'

// player components
import CarouselItems from 'player/components/CarouselItems'

function Panel() {
  const layout = useLayout()

  const renderItems = () => {
    const itm = ['Name', env.staticPath('tmp', 'carousel_wheels.jpg')]
    const items = [
      itm, itm, itm, itm, itm, itm, itm, itm
    ].map(([name, src], index) => ({name, slug: `slug-${index}`, src}))

    return (
      <CarouselItems
        image={(item) => item.src}
        onClickItem={(item, index) => {
          layout.handleDrawer.open(item.slug)
        }}
        items={items}>
        {(item, index) => {
          return (
            <div>
              {item.name} #{index}
            </div>
          )
        }}
      </CarouselItems>
    )
  }

  return (
    <div>
      {renderItems()}
    </div>
  );
}


export default Panel
