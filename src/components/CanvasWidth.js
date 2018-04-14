import React from 'react';
import { observer } from 'mobx-react';
import store from '../models/CanvasStore.js';

class CanvasWidth extends React.Component {

	render() {
		return(
			<div>
				{'Canvas width:'}
				<button onClick={this.props.deleteCol}> {'-1'} </button>
				<button onClick={this.props.addCol}> {'+1'} </button> 
				<span>{this.props.canvasWidth} {'cells'} ({store.widthPixels} px)</span>
			</div>
		);
	}
}
export default observer(CanvasWidth);
