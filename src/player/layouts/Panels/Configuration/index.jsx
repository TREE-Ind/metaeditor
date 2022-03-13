import React from 'react';

// api
import {env} from 'api/'

// context
import {usePlayer, useLayout} from '../../../context/'

// material
import Button from '@mui/material/Button';

// player components
import CarouselItems from 'player/components/CarouselItems'

function Panel() {
  const player = usePlayer()
  const layout = useLayout()

  const renderItems = () => {
    const itm = ['Name', env.staticPath('tmp', 'carousel_wheels.jpg')]
    const items = [
      itm, itm, itm, itm, itm, itm, itm, itm
    ].map(([name, src]) => ({name, src}))

    return (
      <CarouselItems
        image={(item) => item.src}
        onClickItem={(item, index) => {
          const title = item.name + ` #${index}`
          layout.draggableCard.open(title, (
            <Button variant="outlined" onClick={() => {
              player.cmd.testCommand({item: index})
            }}>Call</Button>
          ))
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
