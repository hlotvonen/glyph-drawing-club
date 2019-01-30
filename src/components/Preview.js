import React, { Component } from "react"
import { observer } from "mobx-react"
import store from "../models/CanvasStore"
import { rawSvgCell } from "../components/Cell"
import { cellsAsSvg } from "../utils/cellsAsSvg"
import ReactDOM from "react-dom"

//This file is for debugging and testing SVG generation
//import this in Canvas.js

@observer
class Preview extends Component {
	render() {
		const transformOrigin = window.innerHeight > (store.canvasHeight * store.cellHeight) ? "center" : "top"
		return (
			<div className={"preview" + (store.togglePreview ? " showPreview" : "")}>
				<div>
						<svg style={{
							background: "white",
							transformOrigin: transformOrigin,
							transform: `scale( ${window.innerHeight / (store.canvasHeight * store.cellHeight)} )`
						}} width={store.canvasWidth * store.cellWidth} height={store.canvasHeight * store.cellHeight}>	
							{store.togglePreview ? cellsAsSvg() : null}
						</svg>
				</div>
			</div>
		)
	}
}
export default Preview
