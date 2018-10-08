import React from "react"
import ReactDOM from "react-dom"

import domtoimage from "dom-to-image"
import FileSaver from "file-saver"
import store from "../models/CanvasStore"
import { rawSvgCell } from "../components/Cell"

export function exportJpg() {
	let scale = "scale(" + store.exportSizeMultiplier + ")"
	let style = {
		transform: scale,
		"transform-origin": "top left",
	}

	domtoimage
		.toBlob(document.getElementById("canvas"), {
			style: style,
			height: Number(store.heightPixels) * Number(store.exportSizeMultiplier),
			width: Number(store.widthPixels) * Number(store.exportSizeMultiplier),
		})
		.then(function(blob) {
			FileSaver.saveAs(blob, store.fileName + ".png")
		})
}

export function exportSvg() {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
	svg.setAttribute("style", "border: 1px solid black")
	svg.setAttribute("width", "600")
	svg.setAttribute("height", "250")
	svg.setAttributeNS(
		"http://www.w3.org/2000/xmlns/",
		"xmlns:xlink",
		"http://www.w3.org/1999/xlink"
	)

	const cells = (
		<g>
			{store.canvas.map((row, y) => (
				<g key={y} transform={`translate(0 ${y * store.cellHeight})`}>
					{row.map((cell, x) => (
						<g key={x} transform={`translate(${x * store.cellWidth})`}>
							{rawSvgCell({
								glyphPath: cell[0],
								svgWidth: cell[1],
								svgHeight: cell[2],
								svgBaseline: cell[3],
								glyphOffsetX: cell[4],
								glyphFontSizeModifier: cell[5],
								rotationAmount: cell[6],
								flipGlyph: cell[7],
							})}
						</g>
					))}
				</g>
			))}
		</g>
	)

	ReactDOM.render(cells, svg)

	const blob = new Blob([
		`<?xml version="1.0" standalone="no"?>${svg.outerHTML}`,
	])

	FileSaver.saveAs(blob, store.fileName + ".svg")
}
