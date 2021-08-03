import React from "react"
import store from "../models/CanvasStore"
import { observer } from "mobx-react"
import { colorBlend } from "../utils/colorConversion"
import colorStore from "../models/ColorStore"

const CellBg = observer(props => {
	const bgColor = props.cell

	if (
		colorStore.palettes[colorStore.selectedPaletteIndex].colors[bgColor][0] == 255 &&
		colorStore.palettes[colorStore.selectedPaletteIndex].colors[bgColor][1] == 255 &&
		colorStore.palettes[colorStore.selectedPaletteIndex].colors[bgColor][2] == 255
	) {
		return null
	} else {
		return(
			<div 
				style={{
					position: "absolute",
					top: (props.y * store.cellHeight), 
					left: (props.x * store.cellWidth),
				}}
			>
				{rawSvgCellBg({bgColor})}
			</div>
		)
	}
})

export const rawSvgCellBg = ({bgColor}) => (
	<svg
		height={store.defaultFontSize}
		width={store.cellWidth}
		viewBox={0 + " " + 0 + " " + 800 / (store.cellHeight / store.cellWidth) + " " + 800}
		fill={`rgb(${colorBlend(colorStore.palettes[colorStore.selectedPaletteIndex].colors[bgColor], colorStore.cohesionOverlayColor, colorStore.cohesionIntensity)})`} 
	>	
		<rect width={100 + "%"} height={100 + "%"} />
	</svg>

)

export default CellBg