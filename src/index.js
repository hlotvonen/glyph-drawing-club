import React from "react";
import { render } from "react-dom";
import Canvas from './components/Canvas';
import Settings from './components/Settings';

render(
  <div className="flex_wrapper">
    <Canvas />
    <Settings />
  </div>,
  document.getElementById("root")
);
