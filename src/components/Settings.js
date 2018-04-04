import React from 'react'
import { observer } from 'mobx-react'
import CanvasHeight from './CanvasHeight'
import CanvasWidth from './CanvasWidth'
import CellWidth from './CellWidth'
import CellHeight from './CellHeight'
import FontSize from './FontSize'
import GlyphSelect from './GlyphSelect'
import HideGrid from './HideGrid'
import DarkTheme from './DarkTheme'
import GlyphTuning from './GlyphTuning'
import KeyMappings from './KeyMappings'
import SelectedGlyph from './SelectedGlyph'
import store from '../models/CanvasStore'

@observer 
class Settings extends React.Component {
	render() {
		return (
			<div className={"controls_container" + (store.darkTheme ? ' darkTheme' : '')}>
				<div className="canvas_preferences">
				<h3>Settings</h3>
					<CanvasWidth addCol={store.addCol} deleteCol={store.deleteCol} canvasWidth={store.canvasWidth}/>
					<CanvasHeight addRow={store.addRow} deleteRow={store.deleteRow} canvasHeight={store.canvasHeight}/>
					<CellWidth increaseCellWidth={store.increaseCellWidth} decreaseCellWidth={store.decreaseCellWidth} cellWidth={store.cellWidth}/>
					<CellHeight increaseCellHeight={store.increaseCellHeight} decreaseCellHeight={store.decreaseCellHeight} cellHeight={store.cellHeight}/>
					<FontSize increaseFontSize={store.increaseFontSize} decreaseFontSize={store.decreaseFontSize} defaultFontSize={store.defaultFontSize}/>
					<HideGrid handleChange={store.handleChange} />
					<DarkTheme handleChangeTheme={store.handleChangeTheme} />
					<GlyphTuning/>
					<GlyphSelect/>
		          	<SelectedGlyph glyphPath={store.glyphPath} svgWidth={store.svgWidth} svgHeight={store.svgHeight} svgBaseline={store.svgBaseline}/>
					<KeyMappings/>
				</div>
			</div>
		);
	}
}

export default Settings;