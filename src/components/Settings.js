import React from "react"
import { observer } from "mobx-react"
import store from "../models/CanvasStore"
import CanvasSizeModification from "./CanvasSizeModification"
import CellWidth from "./CellWidth"
import CellHeight from "./CellHeight"
import FontSize from "./FontSize"
import GlyphSelect from "./GlyphSelect"
import HideGrid from "./HideGrid"
import KeyMappings from "./KeyMappings"
import SelectedGlyph from "./SelectedGlyph"
import ExportButtons from "./ExportButtons"
import SaveAsButton from "./SaveAsButton"
import LoadButton from "./LoadButton"
import LoadAndPlace from "./LoadAndPlace"
import EmptyCanvas from "./EmptyCanvas"
import SaveToDropboxButton from "./SaveToDropboxButton"
import TypingMode from "./TypingMode"
import PaintMode from "./PaintMode"
import HistoryControls from "./HistoryControls"
import GlyphOffset from "./GlyphOffset"
import GlyphFontSizeModifier from "./GlyphFontSizeModifier"
import GlyphClear from "./GlyphClear"
import CanvasSizeInMillimeters from "./CanvasSizeInMillimeters"
import LayerSelect from "./LayerSelect"
import ColorSelect from "./ColorSelect"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"

@observer
class Settings extends React.Component {
	render() {
		return (
			<div className="controls_container">
				<Tabs forceRenderTabPanel={true} defaultIndex={0}>
					<TabList>
						<Tab>Draw</Tab>
						<Tab>Color</Tab>
						<Tab>Settings</Tab>
						<Tab>Save</Tab>
						<Tab>Help</Tab>
					</TabList>

					<TabPanel>
						<h3>Glyph sets</h3>
						<KeyMappings />

						<h3>Select Layer</h3>
						<LayerSelect />

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

						<h3>Glyph fine tuning</h3>
						<GlyphFontSizeModifier />
						<GlyphOffset />
						<GlyphClear glyphClear={store.glyphClear} resetOffset={store.resetOffset}/>
					</TabPanel>

					<TabPanel>
						<ColorSelect />
					</TabPanel>

					<TabPanel>
						<h3>Canvas size</h3>
						<CanvasSizeModification />
						<EmptyCanvas />

						<h3>Canvas size in millimeters</h3>
						<CanvasSizeInMillimeters />

						<h3>Cell size</h3>
						<CellWidth />
						<CellHeight />
						<FontSize
							increaseFontSize={store.increaseFontSize}
							decreaseFontSize={store.decreaseFontSize}
							defaultFontSize={store.defaultFontSize}
						/>

						<br />
					</TabPanel>

					<TabPanel>
						<h3>Save / Load</h3>
						<SaveAsButton
							fileName={store.fileName}
							updateFileName={store.updateFileName}
						/>

						<LoadButton />
						<LoadAndPlace />
						<h3>Export</h3>
						<ExportButtons
							exportSizeMultiplier={store.exportSizeMultiplier}
							updateExportSizeMultiplier={store.updateExportSizeMultiplier}
						/>
						<hr />
						{/*
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
						*/}
						<h3>License:</h3>
						<p>
							You are free to use anything you make with GlyphDrawingClub
							anywhere (private or commercial), without credits or licensing
							info.
						</p>
						<h3>Community links & project development:</h3>
						<a
							href="https://github.com/hlotvonen/glyph-drawing-club"
							target="_blank"
						>
							Github
						</a>
						<br />
						<br />
						<a href="https://www.instagram.com/heikkiveikko/" target="_blank">
							Instagram for examples & development updates
						</a>
						<br />
						<br />
						<a href="https://blog.glyphdrawing.club/" target="_blank">
							Glyph Drawing Club blog
						</a>
						<br />
						<br />
						<a href="https://discord.gg/gJNDZ2M" target="_blank">
							Glyph Drawing Club discord channel for sharing, help, inspiration, community etc! Join now :)
						</a>
					</TabPanel>

					<TabPanel>
						<h3>Basic tutorial</h3>
						<ol className="instructions">
							<li>
								Select the <span className="hotkey">Draw</span> tab from the
								sidebar
							</li>
							<li>
								<span className="hotkey">Click</span> on any glyph under Glyph
								selection.
							</li>
							<li>
								Press <span className="hotkey">q</span> to draw.
							</li>
							<li>
								Move around the canvas with{" "}
								<span className="hotkey">arrow keys</span>.
							</li>
							<li>
								Press <span className="hotkey">f</span> to flip,{" "}
								<span className="hotkey">r</span> to rotate or{" "}
								<span className="hotkey">i</span> to invert a glyph.
							</li>
						</ol>
						<em>
							Glyph Drawing Club is meant to be used with the keyboard, so check
							out all the shortcuts below!
						</em>

						<h3>Complete tutorial</h3>
						<p>
							You can find a complete tutorial & more at the{" "}
							<a
								href="https://blog.glyphdrawing.club/usage-tutorial-for-glyph-drawing-club"
								target="_blank"
							>
								Glyph Drawing Club Blog
							</a>
						</p>

						<h3>Keyboard Shortcuts</h3>
						<h4>Move</h4>
						<table>
							<tbody>
								<tr>
									<td>Arrow keys or WASD</td>
									<td>Move</td>
								</tr>
								<tr>
									<td>Alt+Arrow keys</td>
									<td>Quickly move around the canvas</td>
								</tr>
							</tbody>
						</table>

						<h4>Draw</h4>
						<em>Hold down CTRL if you want to affect all layers</em>
						<table>
							<tbody>
								<tr>
									<td>q</td>
									<td>Draw (Place selected glyph)</td>
								</tr>
								<tr>
									<td>e or space</td>
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
							</tbody>
						</table>

						<h4>Make glyph sets</h4>
						<table>
							<tbody>
								<tr>
									<td>m</td>
									<td>Start mapping glyph sets. Press again to end mapping.</td>
								</tr>
								<tr>
									<td>Number keys 1–10</td>
									<td>Add selected glyph to set (when mapping is on)</td>
								</tr>
								<tr>
									<td>Number keys 1–10</td>
									<td>Insert glyph from set (when mapping is off)</td>
								</tr>
							</tbody>
						</table>

						<h4>Extra</h4>
						<table>
							<tbody>
								<tr>
									<td>Cmd/Ctrl+z</td>
									<td>Undo</td>
								</tr>
								<tr>
									<td>Cmd/Ctrl+Shift+z</td>
									<td>Redo</td>
								</tr>
								<tr>
									<td>h</td>
									<td>Hide Grid</td>
								</tr>
								<tr>
									<td>(hold) p</td>
									<td>Preview</td>
								</tr>
								<tr>
									<td>c</td>
									<td>Copy current glyph</td>
								</tr>
							</tbody>
						</table>

						<h4>Area selection</h4>
						<em>Hold down CTRL if you want to affect all layers</em>
						<table>
							<tbody>
								<tr>
									<td>Shift + s</td>
									<td>
										Start selection area. Use arrows keys to change the
										selection area. Press Shift + s again to lock selection area
									</td>
								</tr>
								<tr>
									<td>Shift + d</td>
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
									<td>Shift + y</td>
									<td>Rotate glyphs individually in selected area</td>
								</tr>
								<tr>
									<td>Shift + u</td>
									<td>Flip glyphs individually in selected area</td>
								</tr>
								<tr>
									<td>Shift + r</td>
									<td>
										Rotate selected area. Selection area has to be square (same
										amount of cells width & height)
									</td>
								</tr>
								<tr>
									<td>Shift + t</td>
									<td>
										Transpose selected area. Selection area has to be square
										(same amount of cells width & height)
									</td>
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
							</tbody>
						</table>

						<h4>Coloring tools</h4>
						<table>
							<tbody>
								<tr>
									<td>x</td>
									<td>Color palette quick access</td>
								</tr>
								<tr>
									<td>v</td>
									<td>Color foreground</td>
								</tr>
								<tr>
									<td>b</td>
									<td>Color background</td>
								</tr>
								<tr>
									<td>Shift + v</td>
									<td>Color selected area foreground</td>
								</tr>
								<tr>
									<td>Shift + b</td>
									<td>Color selected area background</td>
								</tr>
							</tbody>
						</table>
					</TabPanel>
				</Tabs>
			</div>
		)
	}
}

export default Settings
