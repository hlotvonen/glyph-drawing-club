//import domtoimage from "dom-to-image"
import { saveSvgAsPng } from "save-svg-as-png"
import { Dropbox } from "dropbox"
import store from "../models/CanvasStore"
import React from "react"
import ReactDOM from "react-dom"
import { rawSvgCell } from "../components/Cell"

export function saveToDropbox() {
	let scale = "scale(" + store.exportSizeMultiplier + ")"
	let style = {
		transform: scale,
		"transform-origin": "top left",
	}

	const ACCESS_TOKEN = "6epNSr0tHAQAAAAAAAAdD86QBYJlisfk9uIkgYSH6FZ5fSvBoPvKFEq3vqqxR1uv"
	const dbx = new Dropbox({
		accessToken: ACCESS_TOKEN,
	})

	if (
		store.userFullName.trim() == "" ||
		store.userEmail.trim() == "" ||
		store.userCountry.trim() == ""
	) {
		document.getElementById("dropbox-response").innerText =
			"Please fill in your info."
		return
	}

	store.hideGrid = true


	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
	svg.setAttribute("width", Number(store.widthPixels))
	svg.setAttribute("height", Number(store.heightPixels))
	svg.setAttributeNS(
		"http://www.w3.org/2000/xmlns/",
		"xmlns:xlink",
		"http://www.w3.org/1999/xlink"
	)

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

	ReactDOM.render(cells, svg)

	const blob = new Blob([
		`<?xml version="1.0" standalone="no"?>${svg.outerHTML}`,
	])

	dbx
		.filesUpload({
			path:
				"/" +
				store.fileName +
				" " +
				store.userFullName +
				" " +
				store.userEmail +
				" " +
				store.userCountry +
				".svg",
			contents: blob,
		})
		.then(function(response) {
			document.getElementById("dropbox-response").innerText =
				"Sent successfully! Thank you!"
			console.log(response)
		})
		.catch(function(error) {
			document.getElementById("dropbox-response").innerText =
				"Sorry something went wrong! Contact hlotvonen@gmail.com"
			console.error(error)
		})
}
