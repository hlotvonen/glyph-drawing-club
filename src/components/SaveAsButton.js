import React from 'react';
import store from '../models/CanvasStore'
import { saveAs } from '../utils/SaveAs'

class SaveAsButton extends React.Component {

	render() {
		return(
			<div className="exportJpg">
					Filename:
					<input 
						type="text" 
						name="name" 
						value={this.props.fileName}
						onChange={this.props.updateFileName}
						onFocus={() => store.toggleWriting()}
						onBlur={() => store.toggleWriting()}
					/>
					<button onClick={() => saveAs()}> {'Save'} </button>

			</div>
		);
	}
}
export default SaveAsButton
