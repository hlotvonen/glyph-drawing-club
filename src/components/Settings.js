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
import ExportButtons from './ExportButtons'
import SaveAsButton from './SaveAsButton'
import LoadButton from './LoadButton'

@observer 
class Settings extends React.Component {
	render() {
		return (
			<div className={"controls_container" + (store.darkTheme ? ' darkTheme' : '')}>
				<div className="canvas_preferences">

					<h3>Save / Load</h3>
					<SaveAsButton fileName={store.fileName} updateFileName={store.updateFileName} />
					<LoadButton />
					
					<h3>Settings</h3>
					<CanvasWidth addCol={store.addCol} deleteCol={store.deleteCol} canvasWidth={store.canvasWidth}/>
					<CanvasHeight addRow={store.addRow} deleteRow={store.deleteRow} canvasHeight={store.canvasHeight}/>
					<DeleteRowOrCol deleteRowAtSelection={store.deleteRowAtSelection} deleteColAtSelection={store.deleteColAtSelection} />
					<br/>
					<CellWidth increaseCellWidth={store.increaseCellWidth} decreaseCellWidth={store.decreaseCellWidth} cellWidth={store.cellWidth}/>
					<CellHeight increaseCellHeight={store.increaseCellHeight} decreaseCellHeight={store.decreaseCellHeight} cellHeight={store.cellHeight}/>
					<FontSize increaseFontSize={store.increaseFontSize} decreaseFontSize={store.decreaseFontSize} defaultFontSize={store.defaultFontSize}/>
					<HideGrid hideGrid={store.hideGrid} handleChangeHideGrid={store.handleChangeHideGrid} />
					<DarkTheme handleChangeTheme={store.handleChangeTheme} />
					
					<h3>Export</h3>
					<ExportButtons exportSizeMultiplier={store.exportSizeMultiplier} updateExportSizeMultiplier={store.updateExportSizeMultiplier}/>

					<GlyphTuning/>
					<GlyphSelect/>
				    <KeymappingsBar />
				</div>
			</div>
		);
	}
}

export default Settings;