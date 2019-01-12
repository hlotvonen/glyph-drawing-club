import React, { Component } from "react"
import { observer } from "mobx-react"
import store from "../models/CanvasStore"
import { rawSvgCell } from "../components/Cell"
import ReactDOM from "react-dom"

//This file is for debugging and testing SVG generation
//import this in Canvas.js

@observer
class Svgtest extends Component {
	render() {
		const cells = (
			<g transform={`translate(${((store.canvasWidth - 1) / 2) * store.cellWidth * -1} 0)`}>
				{store.canvas.map((row, y) => (
					<g key={y} transform={`translate(0 ${y * store.cellHeight})`}>
						{row.map((cell, x) => (
							<g key={x} transform={`translate(${(x * store.cellWidth + cell[5] / 2)})`}>
								{rawSvgCell({
									glyphPath: cell[0],
									svgWidth: cell[1],
									svgHeight: cell[2],
									svgBaseline: cell[3],
									glyphOffsetX: cell[4],
									glyphFontSizeModifier: cell[5],
									rotationAmount: cell[6],
									flipGlyph: cell[7],
									glyphInvertedColor: cell[8],
									glyphOffsetY: cell[9],
								})}
							</g>
						))}
					</g>
				))}
			</g>
		)

		return (
			<div width={store.canvasWidth * store.cellWidth} style={{position: "absolute", left: "0"}} >
					<svg style={{background: "white"}} width={store.canvasWidth * store.cellWidth} height={store.canvasHeight * store.cellHeight}>	
						{cells}
					</svg>
			</div>
		)
	}
}
export default Svgtest
