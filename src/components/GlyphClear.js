import React from 'react';
import store from '../models/CanvasStore.js';

class GlyphClear extends React.Component {

	render() {
		return(
			<div>
				<button onClick={this.props.glyphClear}> {'Reset to default'} </button>
			</div>
		);
	}
}
export default GlyphClear
