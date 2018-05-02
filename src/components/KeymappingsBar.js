import React from 'react'
import { observer } from 'mobx-react'
import KeyMappings from './KeyMappings'
import SelectedGlyph from './SelectedGlyph'
import store from '../models/CanvasStore'

@observer 
class KeymappingsBar extends React.Component {
	render() {
		return (
			<div className="KeyMappingsBar">
				<KeyMappings/>
				<div className="SelectedGlyphContainer">
	          		<SelectedGlyph glyphPath={store.glyphPath} svgWidth={store.svgWidth} svgHeight={store.svgHeight} svgBaseline={store.svgBaseline}/>
					<div id="properties"></div>
				</div>

			</div>
		)
	}
}

export default KeymappingsBar;


