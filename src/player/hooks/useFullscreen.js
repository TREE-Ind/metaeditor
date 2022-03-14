import React from "react";

// hooks
import {useHotkeys} from 'hooks/'

// context
import {usePlayer} from '../context/';


function useFullscreen() {
  const {state} = usePlayer()

  // Hot key
  useHotkeys('ctrl+f', (e, ke) => {
     if(!e.repeat) {
       cls.open()
       return ;
     }
   }, [])

  // Set fullscreen mode
  React.useEffect(() => {

    if(state.loaded && state.body_clicked && confirm('useFullscreen?')) {
      cls.open()
    }

  }, [state.loaded])


  const cls = new class {

    constructor() {
      // Get the documentElement (<html>) to display the page in fullscreen
      this.elem = document.documentElement
    }

    /* View in fullscreen */
    open() {

      if(!state.body_clicked) return ;

      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen()
        .then(() => {
      		// element has entered fullscreen mode successfully
      	})
      	.catch((error) => {
      		console.error({error});
      	});
      } else if (this.elem.webkitRequestFullscreen) { /* Safari */
        this.elem.webkitRequestFullscreen()
        .then(() => {
      		// element has entered fullscreen mode successfully
      	})
      	.catch((error) => {
      		console.error({error});
      	});
      } else if (this.elem.msRequestFullscreen) { /* IE11 */
        this.elem.msRequestFullscreen().then(() => {
      		// element has entered fullscreen mode successfully
      	})
      	.catch((error) => {
      		console.error({error});
      	});
      }
    }

    /* Close fullscreen */
    close() {
      if(!state.body_clicked) return ;
      
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
    }
  }

  return cls
};

export default useFullscreen
