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
      ['Paint', 'body_color', env.staticPath('tmp', 'carousel_wheels.jpg')],
      ['Wheels', 'interior_color', env.staticPath('tmp', 'interior.jpg')],
      ['Trime', 'interior_color', env.staticPath('tmp', 'interior.jpg')],
      ['Leather', 'interior_color', env.staticPath('tmp', 'interior.jpg')],
      ['Seat', 'interior_color', env.staticPath('tmp', 'interior.jpg')],
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
