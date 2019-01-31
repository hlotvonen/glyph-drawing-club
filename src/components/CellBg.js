import React from "react"
import store from "../models/CanvasStore"
import { observer } from "mobx-react"

const CellBg = observer(props => {
	const [
		glyphPath,
		svgWidth,
		svgHeight,
		svgBaseline,
		glyphOffsetX,
		glyphFontSizeModifier,
		rotationAmount,
		flipGlyph,
		glyphInvertedColor,
		glyphOffsetY,
	] = props.cell

	if (glyphInvertedColor == false) {
		return (null)
	} if (glyphInvertedColor == true) {
		return(
			<div 
				style={{
					position: "absolute",
					top: (props.y * store.cellHeight), 
					left: (props.x * store.cellWidth),
				}}
			>
				{rawSvgCellBg({glyphInvertedColor})}
			</div>
		)
	}
})

export const rawSvgCellBg = ({glyphInvertedColor}) => (
	<svg
		height={store.defaultFontSize}
		viewBox={0 + " " + 0 + " " + 800 / (store.cellHeight / store.cellWidth) + " " + 800}
	>	
		<rect width={800} height={800} fill={glyphInvertedColor ? "black" : "white"} />
	</svg>

)

export default CellBg