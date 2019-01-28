import React, { Component } from 'react';
import { observer } from "mobx-react"
import store from "../models/CanvasStore"

@observer
class UiGrid extends React.Component {
  render() {
    return (
        <svg className="UiGrid" width={store.canvasWidth * store.cellWidth + "px"} height={store.canvasHeight * store.cellHeight + "px"} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width={store.cellWidth} height={store.cellHeight} patternUnits="userSpaceOnUse">
              <path d={`M ${store.cellWidth} 0 L 0 0 0 ${store.cellHeight}`} fill="none" stroke="grey" strokeWidth="0.5" />
            </pattern>
          </defs>
        <rect width="100%" height="100%" fill="url(#smallGrid)" stroke="black" strokeWidth="0.5"/>
        </svg>
    )
  }
}
export default UiGrid