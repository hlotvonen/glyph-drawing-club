import { observer } from "mobx-react"
import React from "react"
import colorstore from "../../../models/ColorStore"

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
			<div className="select_set flex justify-between">
				<div>{selectPaletteButtons}</div>

				<button
					onClick={e =>
						window.confirm("Are you sure you wish to delete this palette?") &&
						colorstore.deletePalette(e)
					}
				>
					Delete
				</button>
			</div>
		)
	}
}

export default observer(ColorPaletteSelect)
