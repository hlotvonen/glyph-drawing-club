import React from 'react';
import saveAsImage from '../utils/SaveAsImage'

class ExportImage extends React.Component {

	render() {
		return(
			<div>
				<button onClick={() => saveAsPng()}> {'Save as PNG'} </button>
				<button onClick={() => saveAsSvg()}> {'Save as SVG'} </button>
			</div>
		);
	}
}
export default ExportImage
