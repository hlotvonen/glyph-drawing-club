import { observer } from "mobx-react"
import React from "react"
import store from "../models/CanvasStore.js"
import SelectedGlyph from "./toolbar/SelectedGlyph.js"


const layerGlyph = (layer) => (
	<div>
		<div className="selectedGlyph"
			onClick={() => store.layerSelect(layer)}
		>
			<div className={store.selectedLayer === layer ? "current vector" : "vector"}>
				<SelectedGlyph
					glyphPath={store.canvas[store.selected_y][store.selected_x][layer][0]}
					svgWidth={store.canvas[store.selected_y][store.selected_x][layer][1]}
					svgHeight={store.canvas[store.selected_y][store.selected_x][layer][2] || 1}
					svgBaseline={store.canvas[store.selected_y][store.selected_x][layer][3]}
					glyphFontSizeModifier={store.canvas[store.selected_y][store.selected_x][layer][5]}
					rotationAmount={store.canvas[store.selected_y][store.selected_x][layer][6]}
					flipGlyph={store.canvas[store.selected_y][store.selected_x][layer][7]}
					glyphInvertedShape={store.canvas[store.selected_y][store.selected_x][layer][8]}
					colorIndex={store.canvas[store.selected_y][store.selected_x][layer][10]}
					bgColorIndex={store.canvas[store.selected_y][store.selected_x][4][0]}
					defaultFontSize={store.defaultFontSize}
					showBg={true}
				/>
			</div>
		</div>
		<input
			type="checkbox"
			name={`hideLayer-${layer}`}
			value={store.hiddenLayers[layer]}
			onChange={() => store.hideLayer(layer)}
		/>
		<label htmlFor={`hideLayer-${layer}`}>hide</label>
	</div>
)

const LayerSelect = () => ( 
	<div>
  
		<div className="settings-header">
		  LAYERS
		</div>
  
		<div className="flex justify-between">

			{layerGlyph(0)}

			<div>
				<button onClick={event => store.switchLayersDown(event)} value="1">{"⇆"}</button>
			</div>

			{layerGlyph(1)}

			<div>
				<button onClick={event => store.switchLayersDown(event)} value="2">{"⇆"}</button>
			</div>

			{layerGlyph(2)}

			<div>
				<button onClick={event => store.switchLayersDown(event)} value="3">{"⇆"}</button>
			</div>

			{layerGlyph(3)} 
		</div>
	</div>
)

export default observer(LayerSelect)