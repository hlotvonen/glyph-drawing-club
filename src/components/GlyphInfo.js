import React from "react"
import { observer } from "mobx-react"
import store from "../models/CanvasStore.js"

const GlyphInfo = () => ( 
  <div className="info">
  		 width: {store.canvas[store.selected_y][store.selected_x][1]}
  	<br/>height: {store.canvas[store.selected_y][store.selected_x][2]}
  	<br/>baseline: {store.canvas[store.selected_y][store.selected_x][3]}
  	<br/>offset X: {store.canvas[store.selected_y][store.selected_x][4]}
  	<br/>offset Y: {store.canvas[store.selected_y][store.selected_x][9]}
  	<br/>font size modifier: +{store.canvas[store.selected_y][store.selected_x][5]}px
  	<br/>rotation: {store.canvas[store.selected_y][store.selected_x][6]}&deg;
  	<br/>mirrored: {store.canvas[store.selected_y][store.selected_x][7] === 1 ? "no" : "yes"}
  	<br/>inverted shape: {store.canvas[store.selected_y][store.selected_x][8] === false ? "no" : "yes"}
  </div>
);

export default observer(GlyphInfo)