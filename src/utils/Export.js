import React from "react"
import ReactDOM from "react-dom"
import FileSaver from "file-saver"
import store from "../models/CanvasStore"
import { rawSvgCell } from "../components/Cell"
import { saveSvgAsPng } from "save-svg-as-png"
import { cellsAsSvg } from "./cellsAsSvg"

export function exportAs(type) {
	//Create SVG element
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
	svg.setAttribute("width", (store.cellWidth * store.canvasWidth))
	svg.setAttribute("height", (store.cellHeight * store.canvasHeight))
	svg.setAttributeNS(
		"http://www.w3.org/2000/xmlns/",
		"xmlns:xlink",
		"http://www.w3.org/1999/xlink"
	)

	ReactDOM.render(React.createElement(cellsAsSvg), svg)

	const blob = new Blob([
		`<?xml version="1.0" standalone="no"?>${svg.outerHTML}`,
	])

	if(type == "svg") {
		FileSaver.saveAs(blob, store.fileName + ".svg")
	} 
	else if(type == "png") {
		saveSvgAsPng(svg, store.fileName + ".png", {
			backgroundColor: "white",
			scale: store.exportSizeMultiplier / 2
		})
	} else {
		return false
	} 
}