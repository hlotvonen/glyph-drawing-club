import React from "react"
import { exportSvg as exportJpg } from "../utils/Export"
import store from "../models/CanvasStore"

class ExportButtons extends React.Component {
	render() {
		return (
			<div className="exportJpg">
				<button onClick={() => exportJpg()}> {"Export PNG"} </button>
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
		)
	}
}
export default ExportButtons
