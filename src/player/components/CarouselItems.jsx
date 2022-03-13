import PropTypes from 'prop-types';

// styles
import {styled} from 'styles/snippets'

// components
import CarouselItems from 'components/CarouselItems/'


const RootDiv = styled.div(theme => ({

  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(0, 2, 2),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(2, 10),
  },
}))

const ItemList = styled.ul(theme => ({
  display: 'flex',
  pointerEvents: 'all',
  cursor: 'pointer',
  border: `solid 2px transparent`,
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['border-color']),
  backgroundColor: 'rgba(0,0,0,.9)',
  padding: theme.spacing('2px'),
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '& > [data-li="image"]': {
    minWidth: 100,
    maxWidth: 100,
    height: 100,
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius / 1.2,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  '& > [data-li="content"]': {
    flex: 1,
    padding: theme.spacing(.5, 2, 0, 2),
  },
}))

function CustomCarousel(props) {
  return (
    <RootDiv>
      <CarouselItems
        numberOfCards={{xs: 1, sm: 2, md: 3, lg: 4, default: 4}}
        infiniteLoop
        gutter={10}
        items={props.items}>
        {(item, index) => (
          <ItemList key={index} onClick={() => props.onClickItem(item, index)}>
            <li data-li="image" style={{
              backgroundImage: `url(${props.image(item)})`,
            }} />
            <li data-li="content">
              {props.children(item, index)}
            </li>
          </ItemList>
        )}
      </CarouselItems>
    </RootDiv>
  )
}

CustomCarousel.propTypes = {
  items: PropTypes.array.isRequired,
  image: PropTypes.func.isRequired,
  onClickItem: PropTypes.func.isRequired,
};

CustomCarousel.defaultProps = {
};

export default CustomCarousel
