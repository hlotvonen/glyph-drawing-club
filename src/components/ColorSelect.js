import React, { Component } from "react"
import { observer } from "mobx-react"
import { action } from "mobx"
import colorStore from "../models/ColorStore"
import store from "../models/CanvasStore"
import ColorPalette from "./ColorPalette"
import ColorSliders from "./ColorSliders"
import ColorPaletteSelect from "./ColorPaletteSelect"
import ColorPresetSelect from "./ColorPresetSelect"


@observer
class ColorSelect extends Component {
	render() {

		return (
			<div>
				<h3>Color tools</h3>
				{"Coloring brush: "}
				{"FG"}
				<input
					type="checkbox"
					value={colorStore.coloringModeFg}
					onChange={action(() => colorStore.coloringModeFg = !colorStore.coloringModeFg)}
				/>{" BG"}
				<input
					type="checkbox"
					value={colorStore.coloringModeBg}
					onChange={action(() => colorStore.coloringModeBg = !colorStore.coloringModeBg)}
				/>
				<br />

				{"Show only used colors:"}
				<input
					type="checkbox"
					value={colorStore.showUsedColors}
					onChange={action(() => colorStore.showUsedColors = !colorStore.showUsedColors)}
				/>
				<br />

				<ColorPresetSelect />
				<br />
				<ColorPaletteSelect />

				<div className="paletteContainer">
					<ColorPalette />
				</div>

				<ColorSliders />

				<div className="cohesiveColors">
					<h3>Create cohesive color palette</h3>
					<div className="intensitySlider">
						<input 
							type="range" 
							step=".01" 
							min="0" 
							max="1" 
							className="input-slider"
							value={colorStore.cohesionIntensity}
							onChange={e => colorStore.changeIntensity(e.target.value)}
						/>
						{(colorStore.cohesionIntensity * 100).toFixed(0)}% Intensity with color: 
					</div>
					<div 
						className="color"
						style={{
							background: "rgb(" + colorStore.cohesionOverlayColor + ")",
							border: colorStore.changingCohesionColor ? "3px solid red" : "1px solid #eee"
						}}
						onClick={() => colorStore.handleChangeCohesionColor()}
					/>
				</div>


			</div>
		)
	}
}
export default ColorSelect
