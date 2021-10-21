import React from "react"
import { observer, action } from "mobx-react"
import store from "../models/CanvasStore.js"
import SelectedGlyph from "./toolbar/SelectedGlyph.js"
import colorstore from "../models/ColorStore.js"

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

const layerGlyph2 = (layer) => (
  <div className="selectedGlyph">
    <div className="vector">
      <SelectedGlyph
        glyphPath={store.canvas[store.selected_y][store.selected_x][layer][0]}
        svgWidth={store.canvas[store.selected_y][store.selected_x][layer][1]}
        svgHeight={store.canvas[store.selected_y][store.selected_x][layer][2] || 1}
        svgBaseline={store.canvas[store.selected_y][store.selected_x][layer][3]}
        rotationAmount={store.canvas[store.selected_y][store.selected_x][layer][6]}
        flipGlyph={store.canvas[store.selected_y][store.selected_x][layer][7]}
        glyphInvertedShape={store.canvas[store.selected_y][store.selected_x][layer][8]}
        colorIndex={store.canvas[store.selected_y][store.selected_x][layer][10]}
        bgColorIndex={store.canvas[store.selected_y][store.selected_x][4][0]}
        showBg={true}
      />
    </div>
  </div>
)





const LayerSelect = () => ( 
  <div className="layerSelect">
    <div>
      <input type="radio" onChange={event => store.layerSelect(event)} value="0" name="layerSelect" checked={store.selectedLayer === 0}/>
    	1
     {layerGlyph2(0)}
     {'Hide'}
      <input type="checkbox" onClick={event => store.hideLayer(event)} value="0" />
      <br/> 
      <button onClick={event => store.switchLayersUp(event)} value="0">{">"}</button>
    </div>

    <div>
	    <input type="radio" onChange={event => store.layerSelect(event)} value="1" name="layerSelect" checked={store.selectedLayer === 1}/>
	    2
     {layerGlyph2(1)}
     {'Hide'}
      <input type="checkbox" onClick={event => store.hideLayer(event)} value="1" />
      <br/> 
      <button onClick={event => store.switchLayersDown(event)} value="1">{"<"}</button>
      <button onClick={event => store.switchLayersUp(event)} value="1">{">"}</button>
    </div>

    <div>
   		<input type="radio" onChange={event => store.layerSelect(event)} value="2" name="layerSelect" checked={store.selectedLayer === 2}/>
   		3
     {layerGlyph2(2)}
     {'Hide'}
      <input type="checkbox" onClick={event => store.hideLayer(event)} value="2" />
      <br/> 
      <button onClick={event => store.switchLayersDown(event)} value="2">{"<"}</button>
      <button onClick={event => store.switchLayersUp(event)} value="2">{">"}</button>
    </div>

    <div>
    	<input type="radio" onChange={event => store.layerSelect(event)} value="3" name="layerSelect" checked={store.selectedLayer === 3}/>
    	4
     {layerGlyph2(3)}
     {'Hide'}
      <input type="checkbox" onClick={event => store.hideLayer(event)} value="3" />
      <br/> 
      <button onClick={event => store.switchLayersDown(event)} value="3">{"<"}</button>
  	</div>

  </div>
);

export default observer(LayerSelect)