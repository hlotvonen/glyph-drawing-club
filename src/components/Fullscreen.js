import React from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function Fullscreen(props) {
  const handle = useFullScreenHandle();

  return (
    <>
        <button onClick={handle.enter} style={{position:"absolute", top:"2px", left:"2px", zIndex:100}}>
            Enter fullscreen
        </button>

        <FullScreen handle={handle}>
            {props.children}
        </FullScreen>
    </>
  );
}

export default Fullscreen;