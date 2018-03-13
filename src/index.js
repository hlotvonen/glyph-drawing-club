import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";
import Canvas from './components/Canvas';
import Settings from './components/Settings';

render(
  <div className="flex_wrapper">
  	<DevTools />
    <Canvas />
    <Settings />
  </div>,
  document.getElementById("root")
);
