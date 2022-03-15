import React from 'react';
import PropTypes from 'prop-types';

// hooks
import {useContainerDimensions} from 'hooks/'

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

  [theme.breakpoints.down('sm')]: {
    right: 0,
    width: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    minWidth: 600,
  },

  '&[data-expanded]': {
    transition: theme.transitions.create(['width', 'padding-right'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  '&[data-expanded="true"]': {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(20),
    },
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

  [theme.breakpoints.up('sm')]: {
    '&[data-hover="false"]': {
      opacity: .8,
    },
    '&[data-hover="true"]': {
      opacity: 1,
    },
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

  [theme.breakpoints.down('sm')]: {
    '& > li:nth-child(1)': {
      zIndex: theme.zIndex.appBar + 1,
      background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,.8) 15%, rgba(0,0,0,.6) 30%)',
    },
  },
  [theme.breakpoints.up('sm')]: {
    '& > li:nth-child(1)': {
      background: 'linear-gradient(90deg, rgba(255,255,255,.9) 0%, rgba(255,255,255,.3) 40%, rgba(255,255,255,0) 60%)',
      opacity: .2,
    },
    '& > li:nth-child(2)': {
      background: 'linear-gradient(90deg, rgba(0,0,0,.9) 0%, rgba(0,0,0,.6) 30%, rgba(0,0,0,0) 100%)',
    },
  },

}))

const SlideDiv = styled.div(theme => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
    paddingRight: theme.spacing(0),
  },
}))

const HeaderList = styled.ul(theme => ({
  display: 'flex',
  alignItems: 'center',
  zIndex: theme.zIndex.appBar + 1,
  '& > [data-li="title"]': {
    flex: 1,
    ...theme.typography.h4,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 0, 2),
  },
  [theme.breakpoints.up('sm')]: {
    paddingBottom: theme.spacing(3),
  },
}))

const ContentDiv = styled.ul(theme => ({
  zIndex: theme.zIndex.appBar + 10,
  pointerEvents: 'all',
  height: '100%',
  overflow: 'auto',
}))

const ContentArrowDiv = styled.div(theme => ({
  position: 'relative',
  backgroundColor: 'rgba(0,0,0, .6)',
  height: 50,
  zIndex: theme.zIndex.appBar + 10,
  marginTop: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `solid 1px rgba(255,255,255, .15)`,
  pointerEvents: 'all',
  cursor: 'pointer',

  transition: theme.transitions.create(['background-color', 'border-color'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  '&:hover': {
    backgroundColor: 'rgba(0,0,0, .8)',
    borderColor: 'rgba(255,255,255, .4)'
  },
}))

const ExpandButton = styled.custom(IconButton, theme => ({
  pointerEvents: 'all',
  border: 0,
  outline: `solid 1px rgba(255,255,255, .3)`,
}))



function ContentDrawer(props) {

  const contentDownRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const contentDimensions = useContainerDimensions(contentRef);

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


  const renderContentArrow = () => {

    const isVisible = contentDimensions.scrollTop <= contentDimensions.scrollHeight - 50

    if(!isVisible) return ;

    return (
      <ContentArrowDiv onClick={() => {
        contentDownRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
      }}>
        <Icon>expand_more</Icon>
      </ContentArrowDiv>
    );
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
          ref={contentRef}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}>
          {props.children}
          <div ref={contentDownRef} />
        </ContentDiv>

        {renderContentArrow()}

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
        <SlideDiv style={{height: props.height}}>
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
