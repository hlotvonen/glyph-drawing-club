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

	if (glyphPath == "M0 0" && glyphInvertedColor == false) {
		return(
			<div
				style={{ 
					width: store.cellWidth, 
					height: store.cellHeight,
				}}
				onClick={props.clickSelection}
				onMouseUp={props.handleMouseUp}
				onMouseDown={props.handleMouseDown}
				onMouseOver={props.handleMouseOver}
				data-y={props.y}
				data-x={props.x}

			>
			</div>
		)
	} else {
		return (
			<div
				style={{ 
					width: store.cellWidth, 
					height: store.cellHeight 
				}}
				onClick={props.clickSelection}
				onMouseUp={props.handleMouseUp}
				onMouseDown={props.handleMouseDown}
				onMouseOver={props.handleMouseOver}
				data-y={props.y}
				data-x={props.x}
			>
				{rawSvgCellBg({glyphInvertedColor})}
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
	}
})

export const rawSvgCellBg = ({glyphInvertedColor}) => (
	<svg
		height={store.defaultFontSize}
		viewBox={0 + " " + 0 + " " + 800 / (store.cellHeight / store.cellWidth) + " " + 800}
	>	
		<rect width="100%" height="100%" fill={glyphInvertedColor ? "black" : "white"} />
	</svg>
)
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
