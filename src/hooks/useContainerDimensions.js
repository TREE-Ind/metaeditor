/* Usage

// hooks
import {useContainerDimensions} from 'hooks/'

const MyComponent = () => {
  const componentRef = React.useRef(null);
  const { width, height, scrollTop, scrollLeft } = useContainerDimensions(componentRef);

  return (
    <div ref={componentRef}>
      <p>width: {width}px</p>
      <p>height: {height}px</p>
      <p>scrollTop: {scrollTop}px</p>
      <p>scrollLeft: {scrollLeft}px</p>
    <div/>
  )
}

*/

import React from 'react';

const useContainerDimensions = myRef => {

  const getDimensions = () => ({
    width: myRef.current.offsetWidth,
    height: myRef.current.offsetHeight,
    scrollTop: myRef.current.scrollTop,
    scrollLeft: myRef.current.scrollLeft,
  })

  const [dimensions, setDimensions] = React.useState({
    width: 0,
    height: 0,
    scrollTop: 0,
    scrollLeft: 0,
  })

  React.useEffect(() => {
    if(!myRef.current) return ;

    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if(myRef.current) {
      setDimensions(getDimensions())
    }

    myRef.current.addEventListener("scroll", handleResize)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      myRef.current?.removeEventListener("scroll", handleResize)
    }
  }, [myRef.current])

  return dimensions;
};

export default useContainerDimensions
