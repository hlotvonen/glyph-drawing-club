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
import KeymappingsBar from './KeymappingsBar'
import DeleteRowOrCol from './DeleteRowOrCol'
import AddRowOrCol from './AddRowOrCol'
import ExportButtons from './ExportButtons'
import SaveAsButton from './SaveAsButton'
import LoadButton from './LoadButton'
import EmptyCanvas from './EmptyCanvas'

@observer 
class Settings extends React.Component {
	render() {
		return (
			<div className={"controls_container" + (store.darkTheme ? ' darkTheme' : '')}>
				<div className="canvas_preferences">

					<h3><a href="https://github.com/hlotvonen/unicode-art-editor" target="_blank">READ A TUTORIAL</a></h3>
					<hr/>

					<h3>Save / Load</h3>
					<SaveAsButton fileName={store.fileName} updateFileName={store.updateFileName} />
					<LoadButton />
					
					<h3>Canvas Settings</h3>
					<CanvasWidth addCol={store.addCol} deleteCol={store.deleteCol} canvasWidth={store.canvasWidth}/>
					<CanvasHeight addRow={store.addRow} deleteRow={store.deleteRow} canvasHeight={store.canvasHeight}/>
					<EmptyCanvas emptyCanvas={store.emptyCanvas} />
					<br/>
					<CellWidth increaseCellWidth={store.increaseCellWidth} decreaseCellWidth={store.decreaseCellWidth} cellWidth={store.cellWidth}/>
					<CellHeight increaseCellHeight={store.increaseCellHeight} decreaseCellHeight={store.decreaseCellHeight} cellHeight={store.cellHeight}/>
					<FontSize increaseFontSize={store.increaseFontSize} decreaseFontSize={store.decreaseFontSize} defaultFontSize={store.defaultFontSize}/>
					
					<h3>Tools</h3>
					<DeleteRowOrCol deleteRowAtSelection={store.deleteRowAtSelection} deleteColAtSelection={store.deleteColAtSelection} />
					<AddRowOrCol addRowAtSelection={store.addRowAtSelection} addColAtSelection={store.addColAtSelection} />
					<HideGrid hideGrid={store.hideGrid} handleChangeHideGrid={store.handleChangeHideGrid} />
					<DarkTheme handleChangeTheme={store.handleChangeTheme} />

					<h3>Export</h3>
					<ExportButtons exportSizeMultiplier={store.exportSizeMultiplier} updateExportSizeMultiplier={store.updateExportSizeMultiplier}/>

					<GlyphTuning/>
					<GlyphSelect/>
					<hr/>
					<p>Follow development at <a href="https://github.com/hlotvonen/unicode-art-editor" target="_blank">Github</a></p>

				</div>
			</div>
		);
	}
}

export default Settings;