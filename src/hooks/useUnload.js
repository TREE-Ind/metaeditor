/*
Usage:

// hooks
import {useUnload} from 'hooks/'


const MyComponent = () => {
  useUnload(e => {
    e.preventDefault();
    e.returnValue = '';
  });

  return (
    <div>
      Some content
    </div>
  );
};

*/
import React from 'react';

import { env } from 'api/'

const useUnload = fn => {
  const cb = React.useRef(fn); // init with fn, so that type checkers won't assume that current might be undefined

  React.useEffect(() => {
    cb.current = fn;
  }, [fn]);

  React.useEffect(() => {
    if (env.isDev) return;

    const onUnload = (...args) => cb.current?.(...args);

    window.addEventListener("beforeunload", onUnload);

    return () => window.removeEventListener("beforeunload", onUnload);
  }, []);
};

export default useUnload
