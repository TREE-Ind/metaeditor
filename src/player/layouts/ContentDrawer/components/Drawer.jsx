import React from 'react';
import PropTypes from 'prop-types';


// material
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';

// styles
import {styled} from 'styles/snippets'


const RootDiv = styled.div(theme => ({

  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  minWidth: 600,

  '&[data-expanded]': {
    transition: theme.transitions.create(['width', 'padding-right'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  '&[data-expanded="true"]': {
    // width: '30vw',
    // minWidth: 300,
    paddingRight: theme.spacing(20),
  },

  '&[data-expanded="false"]': {
    width: 100,
  },

}))


const ShadowList = styled.ul(theme => ({

  transition: theme.transitions.create(['opacity'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  '&[data-hover="false"]': {
    opacity: .8,
  },
  '&[data-hover="true"]': {
    opacity: 1,
  },

  '& > li': {
    zIndex: theme.zIndex.appBar - 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 'var(--window-height)',
  },

  '& > li:nth-child(1)': {
    background: 'linear-gradient(90deg, rgba(255,255,255,.9) 0%, rgba(255,255,255,.3) 40%, rgba(255,255,255,0) 60%)',
    opacity: .2,
  },
  '& > li:nth-child(2)': {
    background: 'linear-gradient(90deg, rgba(0,0,0,.9) 0%, rgba(0,0,0,.6) 30%, rgba(0,0,0,0) 100%)',
  },
}))

const SlideDiv = styled.div(theme => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  paddingRight: theme.spacing(0),
  display: 'flex',
  flexDirection: 'column',
}))

const HeaderList = styled.ul(theme => ({
  // pointerEvents: 'all',
  display: 'flex',
  alignItems: 'center',
  paddingBottom: theme.spacing(3),
  zIndex: theme.zIndex.appBar,
  '& > [data-li="title"]': {
    flex: 1,
    ...theme.typography.h4,
  }
}))

const ContentDiv = styled.ul(theme => ({
  zIndex: theme.zIndex.appBar,
  pointerEvents: 'all',
  height: '100%',
  overflow: 'auto',
}))


const ExpandButton = styled.custom(IconButton, theme => ({
  pointerEvents: 'all',
  border: `solid 1px rgba(255,255,255, .3)`,
}))



function ContentDrawer(props) {

  const [hover, setHover] = React.useState(false)
  // const [expanded, setExpanded] = React.useState(true)

  const isExpanded = props.show // && expanded

  const expandSwitcher = () => {
    props.onClose()
    // setExpanded(c => {
    //   const active = !c
    //   if(!active) {
    //     props.onClose()
    //   }
    //   return active;
    // })
  }

  const renderContent = () => {
    return (
      <>
        <ShadowList data-hover={hover}>
          <li /><li />
        </ShadowList>

        <HeaderList>
          <li data-li="title">
            {props.title}
          </li>
          <li>
            <ExpandButton onClick={expandSwitcher}>
              <Icon>close</Icon>
            </ExpandButton>
          </li>
        </HeaderList>

        <ContentDiv
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}>
          {props.children}
        </ContentDiv>

      </>
    )
  }

  return (
    <RootDiv data-expanded={isExpanded}>

      <Slide
        in={isExpanded}
        direction="right"
        mountOnEnter={false}
        unmountOnExit={false}
        >
        <SlideDiv style={{
          height: props.height,
        }}>
          {renderContent()}
        </SlideDiv>
      </Slide>
      
    </RootDiv>
  );
}

ContentDrawer.propTypes = {
	show: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

ContentDrawer.defaultProps = {
  show: false,
  height: 0,
};

export default ContentDrawer
