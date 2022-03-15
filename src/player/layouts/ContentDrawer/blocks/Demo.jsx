import React from 'react';

// api
import {env} from 'api/'

// context
import {useLayout, usePlayer} from '../../../context/'

// material
import Button from '@mui/material/Button';

// components
import Card from '../components/Card';

// styles
import {styled} from 'styles/snippets'


const ContentList = styled.ul(theme => ({
  display: 'flex',
  height: 100 + 5,
  overflow: 'hidden',
  padding: 5,
  '& > [data-li="image"]': {
    width: 100,
    backgroundColor: 'rgba(0,0,0, .4)',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    borderRadius: theme.shape.borderRadius,
  },
  '& > [data-li="content"]': {
    flexGrow: 1,
    padding: theme.spacing(1, 0, 1, 3),
  },
}))

function DrawerBlock(props) {
  const player = usePlayer()
  const layout = useLayout()

  const itm = ['Name', env.staticPath('tmp', 'carousel_wheels.jpg')]
  const items = [
    itm, itm, itm, itm, itm, itm, itm, itm
  ].map(([name, src]) => ({name, src}))

  return (
    <div>
      {items.map((item, index) => (
        <Card key={index}>
          <ContentList onClick={() => {
            const title = item.name + ` #${index}`
            layout.draggableCard.open(title, (
              <Button variant="outlined" onClick={() => {
                player.cmd.testCommand({item: index})
              }}>Call</Button>
            ))
          }}>
            <li data-li="image" style={{
              backgroundImage: `url(${item.src})`,
            }} />
            <li data-li="content">
              {item.name} #{index}
            </li>
          </ContentList>
        </Card>
      ))}
    </div>
  );
}

export default DrawerBlock
