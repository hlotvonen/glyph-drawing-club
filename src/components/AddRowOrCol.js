import React from 'react';
import store from '../models/CanvasStore.js';

class AddRowOrCol extends React.Component {

	render() {
		return(
			<div>
				{'At selection:'}
				<button onClick={this.props.addRowAtSelection}> {'Add Row'} </button>
				<button onClick={this.props.addColAtSelection}> {'Add Col'} </button>
			</div>
		);
	}
}
export default AddRowOrCol
