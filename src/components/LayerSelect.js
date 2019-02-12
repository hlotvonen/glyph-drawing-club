import React from "react"
import { observer } from "mobx-react"
import store from "../models/CanvasStore.js"

const layerGlyph = (layer) => (
  <div className="vector">
    <svg
      height={20}
      viewBox={"0 " + store.canvas[store.selected_y][store.selected_x][layer][3] + " " + store.canvas[store.selected_y][store.selected_x][layer][1] + " " + store.canvas[store.selected_y][store.selected_x][layer][2]}
      style={{ transform: "scale(1, -1)" }}
    >
      <path d={store.canvas[store.selected_y][store.selected_x][layer][0]} />
    </svg>
  </div>
)

const LayerSelect = () => ( 
  <div className="layerSelect">
    <div>
    	<input type="radio" onClick={event => store.layerSelect(event)} value="0" name="layerSelect" defaultChecked />
    	1
     {layerGlyph(0)}
     {'Hide'}
      <input type="checkbox" onClick={event => store.hideLayer(event)} value="0" />
      <br/> 
      <button onClick={event => store.switchLayersUp(event)} value="0">{">"}</button>
    </div>

    <div>
	    <input type="radio" onClick={event => store.layerSelect(event)} value="1" name="layerSelect"/>
	    2
     {layerGlyph(1)}
     {'Hide'}
      <input type="checkbox" onClick={event => store.hideLayer(event)} value="1" />
      <br/> 
      <button onClick={event => store.switchLayersDown(event)} value="1">{"<"}</button>
      <button onClick={event => store.switchLayersUp(event)} value="1">{">"}</button>
    </div>

    <div>
   		<input type="radio" onClick={event => store.layerSelect(event)} value="2" name="layerSelect"/>
   		3
     {layerGlyph(2)}
     {'Hide'}
      <input type="checkbox" onClick={event => store.hideLayer(event)} value="2" />
      <br/> 
      <button onClick={event => store.switchLayersDown(event)} value="2">{"<"}</button>
      <button onClick={event => store.switchLayersUp(event)} value="2">{">"}</button>
    </div>

    <div>
    	<input type="radio" onClick={event => store.layerSelect(event)} value="3" name="layerSelect"/>
    	4
     {layerGlyph(3)}
     {'Hide'}
      <input type="checkbox" onClick={event => store.hideLayer(event)} value="3" />
      <br/> 
      <button onClick={event => store.switchLayersDown(event)} value="3">{"<"}</button>
  	</div>

  </div>
);

export default observer(LayerSelect)