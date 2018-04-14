import React from 'react';
import store from '../models/CanvasStore'

class LoadButton extends React.Component {
	render() {
		return(
			<div>
				{'Load from file: '}
			 	<input type="file"
					name="myFile"
					onChange={store.fileUpload} 
				/>
			</div>
		);
	}
}
export default LoadButton
