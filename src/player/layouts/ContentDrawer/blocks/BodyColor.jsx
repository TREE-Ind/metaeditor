import React from 'react';

// api
import {env} from 'api/'

// context
import {useLayout, usePlayer} from '../../../context/'

// material
import Button from '@mui/material/Button';

// components
import CardItem from '../components/CardItem';



function DrawerBlock(props) {
  const player = usePlayer()
  const layout = useLayout()

  const itm = ['Color', env.staticPath('tmp', 'carousel_wheels.jpg')]
  const items = [
    itm, itm, itm, itm, itm, itm, itm, itm, itm, itm, itm, itm, itm, itm, itm, itm,
  ].map(([name, src]) => ({name, src}))

  return (
    <div>
      {items.map((item, index) => (
        <CardItem
          key={index}
          imageSrc={item.src}
          onClick={() => {
            const title = item.name + ` #${index}`
            layout.draggableCard.open(title, (
              <Button variant="outlined" onClick={() => {
                player.cmd.testCommand({item: index})
              }}>Call</Button>
            ))
          }}>
          {item.name} #{index}
        </CardItem>
      ))}
    </div>
  );
}

export default DrawerBlock
