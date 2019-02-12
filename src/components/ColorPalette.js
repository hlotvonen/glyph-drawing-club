import React, { Component } from "react"
import { action } from "mobx"
import { observer } from "mobx-react"
import colorStore, { colorPreset } from "../models/ColorStore"
import { colorBlend } from "../utils/colorConversion"
import invert from 'invert-color'
import store from "../models/CanvasStore"

class ColorPalette extends Component {
	render() {

		const canvas = store.canvas
		let uniqueColors = new Set()
		const list = canvas.map((row, x) => row.map((col, y) => {
				{uniqueColors.add(col[0][10])}
				{uniqueColors.add(col[1][10])}
				{uniqueColors.add(col[2][10])}
				{uniqueColors.add(col[3][10])}
				{uniqueColors.add(col[4][0])}
			}
		))

		const colors = colorStore.palettes[colorStore.selectedPaletteIndex]

		const colorPalette = colors.map((color, i) => (
			<div
				className={`color`}
				key={i}
				style={{
					background: "rgb(" + colorBlend(color, colorStore.cohesionOverlayColor, colorStore.cohesionIntensity) + ")",
					border: i == colorStore.colorIndex ? "2px solid red" : "1px solid #eee",
					boxShadow: i == colorStore.bgColorIndex ? "inset 0 0 0 2px blue" : "",
					visibility: !colorStore.showUsedColors ? "visible" : ([...uniqueColors].includes(i) ? "visible" : "hidden")
				}}
				onClick={index => colorStore.setFgColorIndex(i)}
				onContextMenu={(e, index) => colorStore.setBgColorIndex(e, i)}
			>
				<div style={{color: invert({ r: color[0], g: color[1], b: color[2] }, true)}}>
					{store.canvas[store.selected_y][store.selected_x][0][10] == i ? "1" : ""}
					{store.canvas[store.selected_y][store.selected_x][1][10] == i ? "2" : ""}
					{store.canvas[store.selected_y][store.selected_x][2][10] == i ? "3" : ""}
					{store.canvas[store.selected_y][store.selected_x][3][10] == i ? "4" : ""}
					{store.canvas[store.selected_y][store.selected_x][4][0] == i ? "b" : ""}
				</div>
			</div>
		))
		return (
			<div className="colorPalette">
				{colorPalette}
				{list}
			</div>
		)
	}
}
export default observer(ColorPalette)
