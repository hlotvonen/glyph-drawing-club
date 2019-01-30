import store from "../models/CanvasStore"
import React, { Component } from "react"
import { rawSvgCell } from "../components/Cell"
import { rawSvgCellBg } from "../components/CellBg"

export const cellsAsSvg = () => (

	<g transform={`translate(${((store.canvasWidth - 1) / 2) * store.cellWidth * -1} 0)`}>
		
		{store.canvas.map((row, y) => (
			<g key={"bg"+y} transform={`translate(0 ${y * store.cellHeight})`}>
				{row.map((cell, x) => (
					<g key={"bg"+x} transform={`translate(${(x * store.cellWidth)})`}>
						{rawSvgCellBg({
							glyphInvertedColor: cell[8],
						})}
					</g>
				))}
			</g>
		))}

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