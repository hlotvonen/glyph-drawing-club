import React from "react"
import { exportAs } from "../utils/Export"
import store from "../models/CanvasStore"

class ExportButtons extends React.Component {
	render() {
		return (
			<div>
			<div className="exportPng">
				<button onClick={() => exportAs("png")}> {"Export Png"} </button>	Size:
				<input
					type="number"
					min="1"
					max="25"
					value={this.props.exportSizeMultiplier}
					onChange={this.props.updateExportSizeMultiplier}
					onFocus={() => store.toggleWriting()}
					onBlur={() => store.toggleWriting()}
				/>{" "}
				({(store.cellWidth * store.canvasWidth) * store.exportSizeMultiplier}
				px &times; {store.cellHeight * store.canvasHeight * store.exportSizeMultiplier}
				px) 
			</div>
			<div className="exportSvg">
				<button onClick={() => exportAs("svg")}> {"Export Svg"} </button>
			</div>
			</div>
		)
	}
}
export default ExportButtons
