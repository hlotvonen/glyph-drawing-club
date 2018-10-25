import React from "react"
import { exportPng, exportSvg } from "../utils/Export"
import store from "../models/CanvasStore"

class ExportButtons extends React.Component {
	render() {
		return (
			<div>
			<div className="exportPng">
				<button onClick={() => exportPng()}> {"Export PNG"} </button>
				Size:
				<input
					type="number"
					min="1"
					max="25"
					value={this.props.exportSizeMultiplier}
					onChange={this.props.updateExportSizeMultiplier}
					onFocus={() => store.toggleWriting()}
					onBlur={() => store.toggleWriting()}
				/>{" "}
				({store.widthPixels * store.exportSizeMultiplier}
				px &times; {store.heightPixels * store.exportSizeMultiplier}
				px)
			</div>
			<div className="exportSvg">
				<button onClick={() => exportSvg()}> {"Export Svg"} </button>
			</div>
			</div>
		)
	}
}
export default ExportButtons
