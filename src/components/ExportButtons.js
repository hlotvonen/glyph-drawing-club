import React from 'react';
import { exportJpg } from '../utils/Export'
import store from '../models/CanvasStore'

class ExportButtons extends React.Component {

	render() {
		return(
			<div className="exportJpg">
				<button onClick={() => exportJpg()}> {'Export JPG'} </button>
					Size:
					<input
						id="page_select_input"
						type="number"
						min="1"
						max="25"
						value={this.props.exportSizeMultiplier}
						onChange={this.props.updateExportSizeMultiplier}
					/> ({store.widthPixels * store.exportSizeMultiplier}px &times; {store.heightPixels * store.exportSizeMultiplier}px)
			</div>
		);
	}
}
export default ExportButtons
