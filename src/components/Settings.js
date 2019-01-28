import React from "react"
import { observer } from "mobx-react"
import CanvasHeight from "./CanvasHeight"
import CanvasWidth from "./CanvasWidth"
import CellWidth from "./CellWidth"
import CellHeight from "./CellHeight"
import FontSize from "./FontSize"
import GlyphSelect from "./GlyphSelect"
import HideGrid from "./HideGrid"
import GlyphTuning from "./GlyphTuning"
import KeyMappings from "./KeyMappings"
import SelectedGlyph from "./SelectedGlyph"
import store from "../models/CanvasStore"
import DeleteRowOrCol from "./DeleteRowOrCol"
import AddRowOrCol from "./AddRowOrCol"
import ExportButtons from "./ExportButtons"
import SaveAsButton from "./SaveAsButton"
import LoadButton from "./LoadButton"
import LoadAndPlace from "./LoadAndPlace"
import EmptyCanvas from "./EmptyCanvas"
import SaveToDropboxButton from "./SaveToDropboxButton"
import GlyphRotate from "./GlyphRotate"
import GlyphFlip from "./GlyphFlip"
import GlyphInvertColor from "./GlyphInvertColor"
import TypingMode from "./TypingMode"
import PaintMode from "./PaintMode"
import HistoryControls from "./HistoryControls"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'


@observer
class Settings extends React.Component {
	render() {
		return (
			<div className="controls_container">
			<Tabs>				
				<TabList>
					<Tab>Draw</Tab>
					<Tab disabled>Color</Tab>
					<Tab>Settings</Tab>
					<Tab>Save</Tab>
					<Tab>Help</Tab>

				</TabList>

					<TabPanel>

						<h3>Glyph sets</h3>
						<KeyMappings />

						<GlyphSelect />

						<h3>Modes & Tools</h3>
						<HistoryControls />
						<TypingMode
							typingMode={store.typingMode}
							handleChangeTypingMode={store.handleChangeTypingMode}
						/>
						<PaintMode
							paintMode={store.paintMode}
							handleChangePaintMode={store.handleChangePaintMode}
						/>
						<HideGrid
							hideGrid={store.hideGrid}
							handleChangeHideGrid={store.handleChangeHideGrid}
						/>

						<GlyphTuning />

					</TabPanel>

					<TabPanel>
					</TabPanel>

					<TabPanel>
						<h3>Canvas Settings</h3>
						<CanvasWidth
							addCol={store.addCol}
							deleteCol={store.deleteCol}
							canvasWidth={store.canvasWidth}
						/>
						<CanvasHeight
							addRow={store.addRow}
							deleteRow={store.deleteRow}
							canvasHeight={store.canvasHeight}
						/>
						<DeleteRowOrCol
							deleteRowAtSelection={store.deleteRowAtSelection}
							deleteColAtSelection={store.deleteColAtSelection}
						/>
						<AddRowOrCol
							addRowAtSelection={store.addRowAtSelection}
							addColAtSelection={store.addColAtSelection}
						/>
						<EmptyCanvas emptyCanvas={store.emptyCanvas} />

						<CellWidth
							increaseCellWidth={store.increaseCellWidth}
							decreaseCellWidth={store.decreaseCellWidth}
							cellWidth={store.cellWidth}
						/>
						<CellHeight
							increaseCellHeight={store.increaseCellHeight}
							decreaseCellHeight={store.decreaseCellHeight}
							cellHeight={store.cellHeight}
						/>
						<FontSize
							increaseFontSize={store.increaseFontSize}
							decreaseFontSize={store.decreaseFontSize}
							defaultFontSize={store.defaultFontSize}
						/>	

						<br />
					</TabPanel>

					<TabPanel>
						<h3>Save / Load / Export</h3>
						<SaveAsButton
							fileName={store.fileName}
							updateFileName={store.updateFileName}
						/>

						<LoadButton />
						<LoadAndPlace />
						<ExportButtons
							exportSizeMultiplier={store.exportSizeMultiplier}
							updateExportSizeMultiplier={store.updateExportSizeMultiplier}
						/>
						<hr />

						<h3>Contribute to the new issue of GDC User Guide!</h3>
						<p>
							If you would like to contribute your artwork to the upcoming
							GD.C User Guide v.2.0.0. zine, use the form below to submit your work. All contributions will be included to the zine. No limits!
							<br /><br />
							Last day to submit: 30.2.2019. The zine will be published during the late spring (date TBA) at Kosminen gallery in Helsinki.
							<br /><br />
							Contributors will receive a scanned pdf of the zine sent to email and can get the physical copy for the price of postage. 
							The zines will be sold but only to cover printing costs and/or to fund future issues.
						</p>
						<br />
						<SaveToDropboxButton
							userFullName={store.userFullName}
							updateFullName={store.updateFullName}
							userEmail={store.userEmail}
							updateEmail={store.updateEmail}
							userCountry={store.userCountry}
							updateCountry={store.updateCountry}
						/>
						<p>
						<br />
						By clicking the button above, you give permission to use your artwork in the zine and social media. 
						Only your name and country will be published.
						</p>

						<h3>Licence:</h3>
						<p>You are free to use anything you make with GlyphDrawingClub anywhere (private or commercial), without credits or licencing info.</p>

					</TabPanel>

					<TabPanel>
						<h3>How do I use this editor? Get started with this:</h3>
						<ol className="instructions">
							<li>
								Click the <span className="hotkey">Draw</span> tab from the sidebar
							</li>
							<li>
								<span className="hotkey">Click</span> on any glyph under Glyph selection.
							</li>
							<li>
								Press <span className="hotkey">q</span> to draw.
							</li>
							<li>
								Move around the canvas with <span className="hotkey">arrow keys</span>.
							</li>
							<li>
								Press <span className="hotkey">f</span> to flip, <span className="hotkey">r</span> to rotate or <span className="hotkey">i</span> to invert a glyph.
							</li>
							<li>
								Check the rest of the keyboard shortcuts below:
							</li>
						</ol>

						<h3>Keyboard Shortcuts</h3>
						<h4>Basics</h4>
						<table><tbody>
							<tr>
								<td>Arrow keys</td>
								<td>Move</td>
							</tr>
							<tr>
								<td>q</td>
								<td>Draw (Place selected glyph)</td>
							</tr>
							<tr>
								<td>Spacebar</td>
								<td>Delete</td>
							</tr>
							<tr>
								<td>r</td>
								<td>Rotate</td>
							</tr>
							<tr>
								<td>f</td>
								<td>Flip</td>
							</tr>
							<tr>
								<td>i</td>
								<td>Invert</td>
							</tr>
							<tr>
								<td>Cmd/Ctrl+z</td>
								<td>Undo</td>
							</tr>
							<tr>
								<td>Cmd/Ctrl+Shift+z</td>
								<td>Redo</td>
							</tr>
						</tbody></table>
						
						<h4>Extra</h4>
						<table><tbody>
							<tr>
								<td>Alt+Arrow keys</td>
								<td>Quickly move around the canvas</td>
							</tr>
							<tr>
								<td>Enter</td>
								<td>Line break</td>
							</tr>
							<tr>
								<td>Backspace</td>
								<td>Delete</td>
							</tr>
							<tr>
								<td>Number keys 1–10</td>
								<td>Insert glyph from set</td>
							</tr>
							<tr>
								<td>h</td>
								<td>Hide Grid</td>
							</tr>
						</tbody></table>

						<h4>Typing mode</h4>
						<table><tbody>
							<tr>
								<td>t</td>
								<td>Start typing mode</td>
							</tr>
							<tr>
								<td>ESC</td>
								<td>End typing mode</td>
							</tr>
						</tbody></table>
						
						<h4>Paint mode</h4>
						<table><tbody>
							<tr>
								<td>b</td>
								<td>Start/end paint mode</td>
							</tr>
							<tr>
								<td>LMB</td>
								<td>Hold left mouse button to paint with selected glyph</td>
							</tr>
							<tr>
								<td>Alt+LMB</td>
								<td>Erase</td>
							</tr>
						</tbody></table>

						<h4>Area selection</h4>
						<table><tbody>
							<tr>
								<td>Shift + s</td>
								<td>Start selection area. Use arrows keys to change the selection area. Press Shift + s again to release selection area</td>
							</tr>
							<tr>
								<td>x or Shift + x</td>
								<td>Deselect area</td>
							</tr>
							<tr>
								<td>Shift + a</td>
								<td>Select all</td>
							</tr>
							<tr>
								<td>Shift + c</td>
								<td>Paste selected area</td>
							</tr>
							<tr>
								<td>Shift + m</td>
								<td>Mirror selected area</td>
							</tr>
							<tr>
								<td>Shift + f</td>
								<td>Flip selected area</td>
							</tr>
							<tr>
								<td>Shift + q</td>
								<td>Fill selected area with selected glyph</td>
							</tr>
							<tr>
								<td>Shift + e</td>
								<td>Empty selected area</td>
							</tr>
							<tr>
								<td>Shift + i</td>
								<td>Invert the colors of selected area</td>
							</tr>
							<tr>
								<td>Shift + o</td>
								<td>Rotate glyphs individually in selected area</td>
							</tr>
							<tr>
								<td>Shift + p</td>
								<td>Flip glyphs individually in selected area</td>
							</tr>
							<tr>
								<td>Shift + r</td>
								<td>Rotate selected area. Selection area has to be square (same amount of cells width & height)</td>
							</tr>
							<tr>
								<td>Shift + t</td>
								<td>Transpose selected area. Selection area has to be square (same amount of cells width & height)</td>
							</tr>
							<tr>
								<td>Shift + h</td>
								<td>Move selected area left</td>
							</tr>
							<tr>
								<td>Shift + j</td>
								<td>Move selected area down</td>
							</tr>
							<tr>
								<td>Shift + k</td>
								<td>Move selected area up</td>
							</tr>
							<tr>
								<td>Shift + l</td>
								<td>Move selected area right</td>
							</tr>
						</tbody></table>

						<h4>Make glyph sets</h4>
						<table><tbody>
							<tr>
								<td>m</td>
								<td>Start mapping glyph sets. This disables all other shortcuts. Press again to end mapping.</td>
							</tr>
							<tr>
								<td>Number keys 1–10</td>
								<td>Add selected glyph to set</td>
							</tr>
						</tbody></table>

						<h3>Follow project:</h3>
							<a href="https://github.com/hlotvonen/glyph-drawing-club" target="_blank">
								Github
							</a>
							<br />
							<a href="https://www.instagram.com/heikkiveikko/" target="_blank">
								Examples & development updates
							</a>
					</TabPanel>

				</Tabs>
			</div>

		)
	}
}

export default Settings
