import React from 'react';

// api
import {env} from 'api/'

// context
import {usePlayer, useLayout} from 'player/context/';

// styles
import { styled } from 'styles/snippets'

// player components
import CarouselItems from 'player/components/CarouselItems'



const ContentDiv = styled.div(theme => ({
  flex: 1,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  ...theme.typography.h6,
  borderLeft: `solid 1px ${theme.palette.divider}`,
  paddingLeft: theme.spacing(2),
  marginLeft: theme.spacing(-2),
}))


function Panel() {
  const layout = useLayout()

  const renderItems = () => {

    const tmp = ['Demo', 'default', undefined]

    const items = [
      ['Paint', 'paint'],
      ['Wheels', 'wheels'],
      ['Trim', 'trim'],
      ['Leather', 'leather'],
      ['Seats', 'seats'],
    ].map(([name, slug]) => ({name, slug, src: env.staticPath('tmp', 'icons', `car_${slug}.svg`)}))

    return (
      <CarouselItems
        image={(item) => item.src}
        onClickItem={(item, index) => {
          layout.handleDrawer.open(item.slug)
        }}
        items={items}>
        {(item, index) => {
          return (
            <ContentDiv>
              {item.name}
            </ContentDiv>
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
