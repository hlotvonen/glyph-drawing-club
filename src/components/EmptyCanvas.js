import React from 'react';
import store from '../models/CanvasStore.js';

class EmptyClear extends React.Component {

	render() {
		return(
			<div>
				<button onClick={this.props.emptyCanvas}> {'Empty canvas'} </button>
			</div>
		);
	}
}
export default EmptyClear
