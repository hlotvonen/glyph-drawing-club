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
		/*
		TO-DO:
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
				glyphOffsetY,
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
	glyphInvertedColor,
	glyphOffsetY
}) => (
	<svg
		height={Number(store.defaultFontSize) + Number(glyphFontSizeModifier)}
		viewBox={
			0 + " " + 0 + " " + svgWidth + " " + svgHeight
		}
	>	
		<g transform={`translate(${svgWidth / 2} ${svgHeight / 2})`}>
			<g transform={`translate(${glyphOffsetX} ${glyphOffsetY})`}>
				<rect fill={glyphInvertedColor ? "" : "white"} fillOpacity={glyphInvertedColor ? "1" : "0"} width={svgWidth} height={svgHeight} transform={`translate(${-(svgWidth / 2)} ${-(svgHeight / 2)})`}/>
				<g transform={`scale(${flipGlyph} -1) rotate(${rotationAmount}) translate(0 ${-svgBaseline})`}>
					<path fill={glyphInvertedColor ? "white" : "black"} d={glyphPath} transform={`translate(${-(svgWidth / 2)} ${-(svgHeight / 2)})`} />
				</g>
			</g>
		</g>
	</svg>
)

export default Cell
