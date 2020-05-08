import React from "react"
import { observer } from "mobx-react"
import { action } from "mobx"
import colorstore from "../models/ColorStore"

class ColorPaletteSelect extends React.Component {
	render() {
		return (
			<div className="select_set">
				Replace with:
				<select
					value={colorstore.selectedPresetPalette}
					onBlur={action(() => (colorstore.selectedPresetPalette = ""))}
					onChange={e => colorstore.handlePresetSelectChange(e.target.value)}
				>
					<option disabled defaultValue value="">
						-- select a preset --
					</option>
					<option value="0">Deluxe Paint</option>
					<option value="1">AtariST (Reduced To 256)</option>
					<option value="2">Eclipse icon 256</option>
					<option value="3">Fornax Void Official Palette No.1</option>
					<option value="4">DOOM</option>
					<option value="5">Riso Blue, Yellow, FluoroPink (Preview)</option>
					<option value="6">Riso Blue, Yellow, FluoroPink (Blue Plate)</option>
					<option value="7">
						Riso Blue, Yellow, FluoroPink (FluoroPink Plate)
					</option>
					<option value="8">
						Riso Blue, Yellow, FluoroPink (Yellow Plate)
					</option>
					<option value="9">Riso FluoroPink and Teal (Preview)</option>
					<option value="10">
						Riso FluoroPink and Teal (FluoroPink Plate)
					</option>
					<option value="11">Riso FluoroPink and Teal (Teal Plate)</option>
					<option value="12">Liero Level Palette</option>
				</select>
			</div>
		)
	}
}

export default observer(ColorPaletteSelect)
