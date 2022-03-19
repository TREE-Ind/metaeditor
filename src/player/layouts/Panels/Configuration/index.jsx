import React from 'react';

// api
import {env} from 'api/'

// context
import {usePlayer, useLayout} from 'player/context/';

// player components
import CarouselItems from 'player/components/CarouselItems'

function Panel() {
  const layout = useLayout()

  const renderItems = () => {

    const tmp = ['Demo', 'default', undefined]

    const items = [
      ['Body Color', 'body_color', env.staticPath('tmp', 'carousel_wheels.jpg')],
      ['Interior Color', 'interior_color', env.staticPath('tmp', 'interior.jpg')],

      tmp, tmp, tmp, tmp, tmp, tmp, tmp, tmp,

    ].map(([name, slug, src]) => ({name, slug, src}))

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
              {item.name}
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
