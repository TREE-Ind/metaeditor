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

  const tmp = ['Name']
  const items = Array(4).fill(tmp)
  .map(([name], index) => ({
    name,
    src: env.staticPath('tmp', 'configurator', `leather_${index+1}.png`)
  }))

  return (
    <div>
      {items.map((item, index) => (
        <CardItem
          key={index}
          imageSrc={item.src}
          onClick={() => {
            // const title = item.name + ` #${index}`
            // layout.draggableCard.open(title, (
            //   <Button variant="outlined" onClick={() => {
            //     player.cmd.testCommand({item: index})
            //   }}>Call</Button>
            // ))
          }}>
          {item.name} #{index}
        </CardItem>
      ))}
    </div>
  );
}

export default DrawerBlock
