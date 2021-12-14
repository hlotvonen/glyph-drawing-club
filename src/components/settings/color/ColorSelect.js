import { action } from "mobx"
import { observer } from "mobx-react"
import React, { Component } from "react"
import store from "../../../models/CanvasStore"
import colorStore from "../../../models/ColorStore"
import ColorPalette from "./ColorPalette"
import ColorPaletteSelect from "./ColorPaletteSelect"
import ColorPresetSelect from "./ColorPresetSelect"
import ColorSliders from "./ColorSliders"


@observer
class ColorSelect extends Component {

	constructor(props) {
		super(props)
		this.state = {
			fromIndex: 0,
			toIndex: 1,
		}
		this.handleRecolorChange = this.handleRecolorChange.bind(this)
		this.handleRecolorSubmit = this.handleRecolorSubmit.bind(this)
	}

	handleRecolorChange(e) {
		const name = e.target.name
		e.target.value = e.target.value > 255 ? 255 : e.target.value < 0 ? 0 : e.target.value
		this.setState({ [name]: e.target.value })
	}

	handleRecolorSubmit(e) {
		store.swapColorIndexes(this.state.fromIndex, this.state.toIndex)
		e.preventDefault()
	}

	render() {

		return (
			<div>				
				<ColorPresetSelect />
				<div className="settings-header mt-2 flex justify-between">
					<span>PALETTES</span>
					<div className="relative">
						<input
							type="checkbox"
							name="usedcolors"
							checked={colorStore.showUsedColors}
							value={colorStore.showUsedColors}
							onChange={action(() => colorStore.showUsedColors = !colorStore.showUsedColors)}
						/>
						<label htmlFor="usedcolors">Show only used colors</label>
					</div>
				</div>
				<ColorPaletteSelect />

				<div className="paletteContainer">

					<ColorPalette />
				</div>

				<ColorSliders />

				<button onClick={() => colorStore.swapColors()}>Swap FG/BG</button>
				<button onClick={() => colorStore.shuffleColors()}>Shuffle colors</button>
				<button onClick={() => colorStore.duplicatePalette()}>Duplicate palette</button>
				<button onClick={() => colorStore.randomColors()}>Random colors</button>
				<button onClick={() => colorStore.chromatest()}>chroma</button>
				<button onClick={() => colorStore.magicPalette()}>magicPalette</button>
				<button onClick={() => colorStore.magicRange()}>magicRange</button>


				<div className="settings-header mt-2">Recolor (assign new color index)</div>
				<div className="cohesiveColors flex">
					<form onSubmit={this.handleRecolorSubmit}>
						<label>
						From:
							<input
								name="fromIndex"
								value={Number(this.state.fromIndex)}
								onChange={this.handleRecolorChange}
								onFocus={() => store.toggleWriting()}
								onBlur={() => store.toggleWriting()}
								type="number"
								min="0"
								max="255"
							/>
						</label>
						<label>
						To:
							<input
								type="number"
								min="0"
								max="255"
								name="toIndex"
								value={Number(this.state.toIndex)}
								onChange={this.handleRecolorChange}
								onFocus={() => store.toggleWriting()}
								onBlur={() => store.toggleWriting()}
							/>
						</label>
						<input type="submit" value="Recolor" />
					</form>
				</div>
				
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
				<br />
				<br />
				<br />
				<br />



			</div>
		)
	}
}
export default ColorSelect
