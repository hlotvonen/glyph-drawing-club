import React from "react"
import store from "../models/CanvasStore"
import { observer } from "mobx-react"

const Cell = observer(props => {
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

	if (glyphPath == "M0 0") {
		return (null)
	} else {
		return (
			rawSvgCell({
				glyphPath,
				svgWidth,
				svgHeight,
				svgBaseline,
				glyphOffsetX,
				glyphFontSizeModifier,
				rotationAmount,
				flipGlyph,
				glyphInvertedColor,
				glyphOffsetY
			})
		)
	}
})

export const rawSvgCell = ({
	glyphPath,
	svgWidth,
	svgHeight,
	svgBaseline,
	glyphOffsetX,
	glyphFontSizeModifier,
	rotationAmount,
	flipGlyph,
	glyphInvertedColor,
	glyphOffsetY
}) => (
	<svg
		height={Number(store.defaultFontSize) + Number(glyphFontSizeModifier)}
		viewBox={0 + " " + 0 + " " + 800 / (store.cellHeight / store.cellWidth) + " " + 800}
		style={{ overflow: "visible" }}
	>	
		<g transform={`translate(${Number(400) + Number(glyphOffsetX)} ${Number(400) + Number(glyphOffsetY)})`}> 
			<g transform={`
				scale(${flipGlyph * (800 / svgHeight) } -${800 / svgHeight}) 
				rotate(${rotationAmount}) 
				translate(0 ${-svgBaseline})
			`}>
				<path 
					fill={glyphInvertedColor ? "white" : "black"}
					d={glyphPath} 
					transform={`translate(${-(svgHeight / 2)} ${-(svgHeight / 2)})`} 
				/>
			</g>
		</g>
	</svg>
)

export default Cell