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
		/*
		TO-DO:
		glyphOffsetY,
		foregroundColor, //hex r,g,b
		backgroundColor, //hex
		color1, //0-100 blue
		color2, //0-100 pink
		color3  //0-100 yellow
		*/
	] = props.cell

	const clipCellsClass = store.clipCells ? "clipCells" : ""
	const glyphInvertedColorClass = glyphInvertedColor ? "invertColor" : ""
	const classes = `${clipCellsClass} ${glyphInvertedColorClass}`

	return (
		<div
			className={classes}
			style={{ width: store.cellWidth, height: store.cellHeight }}
			onClick={props.clickSelection}
			data-y={props.y}
			data-x={props.x}
		>
			{rawSvgCell({
				glyphPath,
				svgWidth,
				svgHeight,
				svgBaseline,
				glyphOffsetX,
				glyphFontSizeModifier,
				rotationAmount,
				flipGlyph,
				glyphInvertedColor,
			})}
		</div>
	)
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
}) => (
	<svg
		height={Number(store.defaultFontSize) + Number(glyphFontSizeModifier)}
		viewBox={
			glyphOffsetX + " " + svgBaseline + " " + svgWidth + " " + svgHeight
		}
		style={{
			transform: `scale(${flipGlyph}, -1) rotate(${rotationAmount}deg)`,
		}}
	>
		<path d={glyphPath} />
	</svg>
)

export default Cell
