import React, { Component } from "react"
import { observer } from "mobx-react"
import store from "../models/CanvasStore"
import { cellsAsSvg } from "../utils/cellsAsSvg"
import ReactDOM from "react-dom"

@observer
class Preview extends Component {
	render() {
		if(store.togglePreview) {
			const transformOrigin = window.innerHeight > (store.canvasHeight * store.cellHeight) ? "center" : "top"
			const canvasWidth = store.canvasWidth * store.cellWidth
			const canvasHeight = store.canvasHeight * store.cellHeight
			return (
				<div className={"preview"}>
					<div>
							<svg style={{
								background: "white",
								transformOrigin: transformOrigin,
								transform: `scale( ${
									window.innerWidth / canvasWidth < window.innerHeight / canvasHeight 
										? window.innerWidth / canvasWidth //if wide
										: window.innerHeight / canvasHeight //if tall
								} )`
							}} width={store.canvasWidth * store.cellWidth} height={store.canvasHeight * store.cellHeight}>	
								{store.togglePreview ? cellsAsSvg() : null}
							</svg>
					</div>
				</div>
			)
		} else {
			return (
				<></>
			)
		}
	}
}
export default Preview
