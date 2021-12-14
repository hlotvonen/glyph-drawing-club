import { observer } from "mobx-react"
import React from "react"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import store from "../../models/CanvasStore"
import LayerSelect from "../LayerSelect"
import HideGrid from "../toolbar/HideGrid"
import HistoryControls from "../toolbar/HistoryControls"
import PaintMode from "../toolbar/PaintMode"
import TypingMode from "../toolbar/TypingMode"
import CanvasSizeInMillimeters from "./CanvasSizeInMillimeters"
import CanvasSizeModification from "./CanvasSizeModification"
import CellHeight from "./CellHeight"
import CellWidth from "./CellWidth"
import ColorSelect from "./color/ColorSelect"
import EmptyCanvas from "./EmptyCanvas"
import ExportButtons from "./ExportButtons"
import FontSize from "./FontSize"
import GlyphClear from "./GlyphClear"
import GlyphFontSizeModifier from "./GlyphFontSizeModifier"
import GlyphOffset from "./GlyphOffset"
import GlyphSelect from "./glyphs/GlyphSelect"
import KeyMappings from "./keymapping/KeyMappings"
import LoadAndPlace from "./LoadAndPlace"
import LoadButton from "./LoadButton"
import SaveAsButton from "./SaveAsButton"

@observer
class Settings extends React.Component {
	render() {

		if (!store.canvas) {
			return (
				<div className={"controls_container"}>
					Loading settings...
				</div>
			)
		}

		return (
			<div className="controls_container">
				<Tabs forceRenderTabPanel={true} defaultIndex={0}>
					<TabList>
						<Tab>Glyphs</Tab>
						<Tab>Color</Tab>
						<Tab>Settings</Tab>
						<Tab>Save/Load</Tab>
						<Tab>Help</Tab>
					</TabList>

					<TabPanel>
						<KeyMappings />

						<LayerSelect />

						<GlyphSelect />

						<div className="settings-header">
							MODES & OTHER TOOLS
						</div>
						<HistoryControls />
						<TypingMode/>
						<PaintMode />
						<HideGrid />

						<GlyphFontSizeModifier />
						<GlyphOffset />
						<GlyphClear glyphClear={store.glyphClear} resetOffset={store.resetOffset}/>
					</TabPanel>

					<TabPanel>
						<ColorSelect />
					</TabPanel>

					<TabPanel>
						<div className="settings-header">
							CANVAS SIZE
						</div>
						<CanvasSizeModification />
						<EmptyCanvas />

						<div className="settings-header">
							Canvas size in millimeters
						</div>
						<CanvasSizeInMillimeters />

						<div className="settings-header">
							Cell size
						</div>
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
						<div className="settings-header">
							SAVE / LOAD
						</div>
						<SaveAsButton
							fileName={store.fileName}
							updateFileName={store.updateFileName}
						/>

						<LoadButton />
						<LoadAndPlace />
						<div className="settings-header mt-2">
							EXPORT
						</div>
						<ExportButtons
							exportSizeMultiplier={store.exportSizeMultiplier}
							updateExportSizeMultiplier={store.updateExportSizeMultiplier}
						/>
						<div className="settings-header mt-2">
							LICENCE:
						</div>
						<p>
							You are free to use anything you make with GlyphDrawingClub
							anywhere (private or commercial), without credits or licensing
							info.
						</p>
						
						<div className="settings-header mt-2">
							Community links & project development:
						</div>
						<a
							href="https://github.com/hlotvonen/glyph-drawing-club"
							target="_blank" rel="noreferrer"
						>
							Github
						</a>
						<br />
						<br />
						<a href="https://www.instagram.com/heikkiveikko/" target="_blank" rel="noreferrer">
							Instagram for examples & development updates
						</a>
						<br />
						<br />
						<a href="https://blog.glyphdrawing.club/" target="_blank" rel="noreferrer">
							Glyph Drawing Club blog
						</a>
						<br />
						<br />
						<a href="https://discord.gg/gJNDZ2M" target="_blank" rel="noreferrer">
							Glyph Drawing Club discord channel for sharing, help, inspiration, community etc! Join now :)
						</a>
					</TabPanel>

					<TabPanel>
						<div className="settings-header">BASICS</div>
						<ol className="instructions">
							<li>
								Select the <kbd>Draw</kbd> tab from the
								sidebar
							</li>
							<li>
								<kbd>Click</kbd> on any shape/letter under GLYPHS.
							</li>
							<li>
								Press <kbd>q</kbd> to draw.
							</li>
							<li>
								Move around the canvas with <kbd>arrow keys</kbd>.
							</li>
							<li>
								Press <kbd>f</kbd> to flip, <kbd>r</kbd> to rotate or <kbd>i</kbd> to invert a glyph.
							</li>
						</ol>

						<div className="settings-header mt-2">COMPLETE REFERENCE</div>
						<p>
							You can find a complete tutorial & more at the{" "}
							<a
								href="https://blog.glyphdrawing.club/usage-tutorial-for-glyph-drawing-club"
								target="_blank" rel="noreferrer"
							>
								Glyph Drawing Club Blog
							</a>
						</p>

						<div className="settings-header mt-2">KEYBOARD SHORTCUTS</div>
						<h4>Move</h4>
						<table>
							<tbody>
								<tr>
									<td><kbd>Arrow keys or WASD</kbd></td>
									<td>Move</td>
								</tr>
								<tr>
									<td><kbd>Alt+Arrow keys</kbd></td>
									<td>Quickly move around the canvas</td>
								</tr>
							</tbody>
						</table>

						<h4>Draw</h4>
						<em>Hold down <kbd>CTRL</kbd> if you want to affect all layers</em>
						<table>
							<tbody>
								<tr>
									<td><kbd>q</kbd></td>
									<td>Draw (Place selected glyph)</td>
								</tr>
								<tr>
									<td><kbd>e</kbd> or <kbd>space</kbd></td>
									<td>Delete</td>
								</tr>
								<tr>
									<td><kbd>r</kbd></td>
									<td>Rotate</td>
								</tr>
								<tr>
									<td><kbd>f</kbd></td>
									<td>Flip</td>
								</tr>
								<tr>
									<td><kbd>i</kbd></td>
									<td>Invert</td>
								</tr>
							</tbody>
						</table>

						<h4>Extra</h4>
						<table>
							<tbody>
								<tr>
									<td><kbd>Cmd/Ctrl+z</kbd></td>
									<td>Undo</td>
								</tr>
								<tr>
									<td><kbd>Cmd/Ctrl+Shift+z</kbd></td>
									<td>Redo</td>
								</tr>
								<tr>
									<td><kbd>h</kbd></td>
									<td>Hide Grid</td>
								</tr>
								<tr>
									<td>(hold) <kbd>p</kbd></td>
									<td>Preview</td>
								</tr>
								<tr>
									<td><kbd>c</kbd></td>
									<td>Copy current glyph</td>
								</tr>
							</tbody>
						</table>

						<h4>Area selection</h4>
						<em>Hold down <kbd>CTRL</kbd> if you want to affect all layers</em>
						<table>
							<tbody>
								<tr>
									<td><kbd>Shift + s</kbd></td>
									<td>
										Start selection area. Use <kbd>arrows keys</kbd> to change the
										selection area. Press <kbd>Shift + s</kbd> again to lock selection area
									</td>
								</tr>
								<tr>
									<td><kbd>Shift + d</kbd></td>
									<td>Deselect area</td>
								</tr>
								<tr>
									<td><kbd>Shift + a</kbd></td>
									<td>Select all</td>
								</tr>
								<tr>
									<td><kbd>Shift + c</kbd></td>
									<td>Paste selected area</td>
								</tr>
								<tr>
									<td><kbd>Shift + m</kbd></td>
									<td>Mirror selected area</td>
								</tr>
								<tr>
									<td><kbd>Shift + f</kbd></td>
									<td>Flip selected area</td>
								</tr>
								<tr>
									<td><kbd>Shift + q</kbd></td>
									<td>Fill selected area with selected glyph</td>
								</tr>
								<tr>
									<td><kbd>Shift + e</kbd></td>
									<td>Empty selected area</td>
								</tr>
								<tr>
									<td><kbd>Shift + i</kbd></td>
									<td>Invert the colors of selected area</td>
								</tr>
								<tr>
									<td><kbd>Shift + y</kbd></td>
									<td>Rotate glyphs individually in selected area</td>
								</tr>
								<tr>
									<td><kbd>Shift + u</kbd></td>
									<td>Flip glyphs individually in selected area</td>
								</tr>
								<tr>
									<td><kbd>Shift + r</kbd></td>
									<td>
										Rotate selected area. Selection area has to be square
									</td>
								</tr>
								<tr>
									<td><kbd>Shift + t</kbd></td>
									<td>
										Transpose selected area. Selection area has to be square
									</td>
								</tr>
								<tr>
									<td><kbd>Shift + h</kbd></td>
									<td>Move selected area left</td>
								</tr>
								<tr>
									<td><kbd>Shift + j</kbd></td>
									<td>Move selected area down</td>
								</tr>
								<tr>
									<td><kbd>Shift + k</kbd></td>
									<td>Move selected area up</td>
								</tr>
								<tr>
									<td><kbd>Shift + l</kbd></td>
									<td>Move selected area right</td>
								</tr>
							</tbody>
						</table>

						<h4>Coloring tools</h4>
						<table>
							<tbody>
								<tr>
									<td><kbd>x</kbd></td>
									<td>Color palette quick access</td>
								</tr>
								<tr>
									<td><kbd>v</kbd></td>
									<td>Color foreground</td>
								</tr>
								<tr>
									<td><kbd>b</kbd></td>
									<td>Color background</td>
								</tr>
								<tr>
									<td><kbd>Shift + v</kbd></td>
									<td>Color selected area foreground</td>
								</tr>
								<tr>
									<td><kbd>Shift + b</kbd></td>
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
