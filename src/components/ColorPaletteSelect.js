import React from "react"
import { observer } from "mobx-react"
import colorstore from "../models/ColorStore"

class ColorPaletteSelect extends React.Component {
	render() {
		const palettes = colorstore.palettes
		const selectPaletteButtons = palettes.map((paletteNumber, x) => (
			<button
				className={x === colorstore.selectedPaletteIndex ? "active" : ""}
				type="button"
				key={x}
				onClick={() => colorstore.selectPalette(x)}
			>
				{x + 1}
			</button>
		))

		return (
			<div className="select_set">
				<button type="button" onClick={colorstore.addPalette}>
					Add
				</button>
				<button type="button" onClick={colorstore.deletePalette}>
					Delete
				</button>
				{"Select: "}
				{selectPaletteButtons}
			</div>
		)
	}
}

export default observer(ColorPaletteSelect)
