import invert from 'invert-color'
import { observer } from "mobx-react"
import { Component } from "react"
import store from "../../../models/CanvasStore"
import colorStore from "../../../models/ColorStore"

const setGradient = (steps) => {
	let gradientString = "linear-gradient(to right,"
	let stepSize = 100 / (steps.length - 1);
	for(var i = 0; i < steps.length; i++) {
		gradientString +=  (i > 0 ? "," : "") + steps[i] + (i * stepSize) + "%"
	}
	return (
		gradientString + ")"
	)
}
const rgb = (r, g, b) => {
	return "rgb(" + r + "," + g + "," + b +")";
}

class ColorSliders extends Component {
	render() {

		if (!colorStore.palettes.length) {
			return <span>Loading...</span>;
		}

		const rgbSlider = (name, index, gradient) => {
			return (
				<div className="rgbSlider">
					<input 
						className={name}
						type="range" 
						min="0" 
						max="255"
						step="1"
						value={colorStore.changingCohesionColor ? colorStore.cohesionOverlayColor[index] : colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.colorIndex][index]}
						onChange={e => colorStore.colorSelect(index, e.target.value)}
						style={{
							background: setGradient(gradient)
						}}
					/>
					<input 
						type="number" 
						min="0" 
						max="255"
						value={colorStore.changingCohesionColor ? colorStore.cohesionOverlayColor[index] : colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.colorIndex][index]} 
						onChange={e => colorStore.colorSelect(index, e.target.value)}
						onFocus={() => store.toggleWriting(true)}
          			onBlur={() => store.toggleWriting(false)}
					/>
					{name}
				</div>
			)
		}
		return (
			<div className="colorSliders">
				<div className="rgbSliders">
					{rgbSlider(
						"R", 
						0, 
						colorStore.changingCohesionColor 
						? [rgb(0, colorStore.cohesionOverlayColor[1], colorStore.cohesionOverlayColor[2]),rgb(255, colorStore.cohesionOverlayColor[1], colorStore.cohesionOverlayColor[2])]
						: [rgb(0, colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.colorIndex][1], colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.colorIndex][2]),rgb(255, colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.colorIndex][1], colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.colorIndex][2])]
					)}
					{rgbSlider(
						"G", 
						1, 
						colorStore.changingCohesionColor 
						? [rgb(colorStore.cohesionOverlayColor[0], 0, colorStore.cohesionOverlayColor[2]),rgb(colorStore.cohesionOverlayColor[0], 255, colorStore.cohesionOverlayColor[2])]
						: [rgb(colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.colorIndex][0], 0, colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.colorIndex][2]),rgb(colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.colorIndex][0], 255, colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.colorIndex][2])]
					)}
					{rgbSlider(
						"B", 
						2,
						colorStore.changingCohesionColor 
						? [rgb(colorStore.cohesionOverlayColor[0], colorStore.cohesionOverlayColor[1], 0), rgb(colorStore.cohesionOverlayColor[0], colorStore.cohesionOverlayColor[1], 255)]
						: [rgb(colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.colorIndex][0], colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.colorIndex][1], 0), rgb(colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.colorIndex][0], colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.colorIndex][1], 255)]
					)}
				</div>
				<div className="colorPreview" 
					 style={{
					 	background: "rgb(" + 
					 		(colorStore.changingCohesionColor 
					 		? colorStore.cohesionOverlayColor
					 		: colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.colorIndex])
							 + ")",
						color: invert({ r: colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.colorIndex][0], g: colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.colorIndex][1], b: colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.colorIndex][2] }, true)
					 }}
				>FG #{colorStore.colorIndex}</div>
				<div className="colorPreview" 
					 style={{
					 	background: "rgb(" + 
					 		(colorStore.changingCohesionColor 
					 		? colorStore.cohesionOverlayColor
					 		: colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.bgColorIndex])
						+ ")",
						color: invert({ r: colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.bgColorIndex][0], g: colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.bgColorIndex][1], b: colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorStore.bgColorIndex][2] }, true)
					 }}
				>BG #{colorStore.bgColorIndex}</div>
			</div>
		)
	}
}
export default observer(ColorSliders)
