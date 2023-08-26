import { observer } from "mobx-react"
import store from "../../models/CanvasStore.js"
import SelectedGlyph from "./SelectedGlyph.js"


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

		<fieldset>
			<input
				type="checkbox"
				name={`hideLayer-${layer}`}
				value={store.hiddenLayers[layer]}
				onChange={() => store.hideLayer(layer)}
				checked={store.hiddenLayers[layer]}
			/>
			<label 
				htmlFor={`hideLayer-${layer}`}
				onClick={() => store.hideLayer(layer)}
				className={`buttonlike ${store.hiddenLayers[layer] ? "" : "active"}`}
				>
					{store.hiddenLayers[layer] ? "off" : "on"}
				</label>
		</fieldset>

	</div>
)

const LayerSelect = () => ( 
	<div className="toolbar toolbar-layers">
  
	<svg viewBox="0 0 60 60" height="60" className="toolbar-title-svg">
			<defs><path id="textOnPath-layers" d="m0 30ZA1 1 30 0160 30" /></defs>
			<text>
				<textPath xlinkHref="#textOnPath-layers">
					Layers
				</textPath>
			</text>
		</svg>
		
		{layerGlyph(0)}
		<button onClick={event => store.switchLayersDown(event)} value="1">{"⇆"}</button>

		{layerGlyph(1)}
		<button onClick={event => store.switchLayersDown(event)} value="2">{"⇆"}</button>

		{layerGlyph(2)}
		<button onClick={event => store.switchLayersDown(event)} value="3">{"⇆"}</button>

		{layerGlyph(3)} 
	
	</div>
)

export default observer(LayerSelect)