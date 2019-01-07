import React from "react"
import ReactDOM from "react-dom"
import domtoimage from "dom-to-image"
import FileSaver from "file-saver"
import store from "../models/CanvasStore"
import { rawSvgCell } from "../components/Cell"
import { saveSvgAsPng } from "save-svg-as-png"

export function exportAsSvg() {
	//Create SVG element
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
	svg.setAttribute("width", Number(store.widthPixels))
	svg.setAttribute("height", Number(store.heightPixels))
	svg.setAttributeNS(
		"http://www.w3.org/2000/xmlns/",
		"xmlns:xlink",
		"http://www.w3.org/1999/xlink"
	)

	const cells = (
		<g transform={`translate(${((Number(store.canvasWidth) - 2) / 2) * store.cellWidth * -1})`}>
			{store.canvas.map((row, y) => (
				<g key={y} transform={`translate(${-(store.cellWidth / 2)} ${y * store.cellHeight})`}>
					{row.map((cell, x) => (
						<g key={x} transform={`translate(${(x * store.cellWidth)})`}>
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

	ReactDOM.render(cells, svg)

	const blob = new Blob([
		`<?xml version="1.0" standalone="no"?>${svg.outerHTML}`,
	])

	FileSaver.saveAs(blob, store.fileName + ".svg")
}
export function exportAsPng() {
	//Create SVG element
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
	svg.setAttribute("width", Number(store.widthPixels))
	svg.setAttribute("height", Number(store.heightPixels))
	svg.setAttributeNS(
		"http://www.w3.org/2000/xmlns/",
		"xmlns:xlink",
		"http://www.w3.org/1999/xlink"
	)

	const cells = (
		<g transform={`translate(${((Number(store.canvasWidth) - 2) / 2) * store.cellWidth * -1})`}>
			{store.canvas.map((row, y) => (
				<g key={y} transform={`translate(${-(store.cellWidth / 2)} ${y * store.cellHeight})`}>
					{row.map((cell, x) => (
						<g key={x} transform={`translate(${(x * store.cellWidth)})`}>
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

	ReactDOM.render(cells, svg)

	const blob = new Blob([
		`<?xml version="1.0" standalone="no"?>${svg.outerHTML}`,
	])
	saveSvgAsPng(svg, store.fileName + ".png", {
		backgroundColor: "white",
		scale: store.exportSizeMultiplier / 2
	})
}

//Old & Slow, saves the image from the html dom
/*export function exportPng() {
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
}*/