import React from 'react';
import { observer } from 'mobx-react';
import store from '../models/CanvasStore.js';

class GlyphOffsetY extends React.Component {

	render() {
		return(
			<div>
				{'Glyph offset Y:'}
				<button onClick={this.props.decreaseGlyphOffsetY}> {'↑'} </button>
				<button onClick={this.props.increaseGlyphOffsetY}> {'↓'} </button> 
				<span>{this.props.glyphOffsetY}</span>
			</div>
		);
	}
}
export default observer(GlyphOffsetY);
