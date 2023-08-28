import { observer } from "mobx-react"
import React from "react"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import store from "../../models/CanvasStore"
import { Help } from "./Help"
import ColorSelect from "./color/ColorSelect"
import ExportCanvas from "./file/ExportCanvas"
import LoadCanvas from "./file/LoadCanvas"
import SaveCanvas from "./file/SaveCanvas"
import { Font } from "./glyphs/Glyphs"
import CanvasSizeInMillimeters from "./options/CanvasSizeInMillimeters"
import CanvasSizeModification from "./options/CanvasSizeModification"
import { CellSize } from "./options/CellSize"
import EmptyCanvas from "./options/EmptyCanvas"
import FontSize from "./options/FontSize"
import { SetReferenceImage } from "./options/SetReferenceImage"

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
						<Tab>Options</Tab>
						<Tab>File</Tab>
						<Tab>Help</Tab>
					</TabList>

					<TabPanel>
						<Font />
					</TabPanel>

					<TabPanel>
						<ColorSelect />
					</TabPanel>

					<TabPanel>
						<section>
							<h3>CANVAS SIZE</h3>
							<CanvasSizeModification />
							<EmptyCanvas />
						</section>
						
						<SetReferenceImage/> 

						<section>
							<h3>SIZE CALCULATOR</h3>
							<CanvasSizeInMillimeters />
						</section>
						
						<section>
							<h3>CELL SIZE</h3>
							<CellSize />
							<FontSize
								increaseFontSize={store.increaseFontSize}
								decreaseFontSize={store.decreaseFontSize}
								defaultFontSize={store.defaultFontSize}
							/>
						</section>

						<section>
							<h3>GLYPH OFFSET</h3>
							<div>
								Amount:
								<input
									type="number"
									min="1"
									value={store.offsetAmount}
									onChange={evt => store.handleChangeOffsetAmount(evt)}
									onFocus={() => store.toggleWriting(true)}
         					onBlur={() => store.toggleWriting(false)}
								/>
							</div>
						</section>

					</TabPanel>

					<TabPanel>
						<section>
							<h3>SAVE & LOAD</h3>
							<SaveCanvas/>
							<LoadCanvas />
						</section>

						<ExportCanvas
							exportSizeMultiplier={store.exportSizeMultiplier}
							updateExportSizeMultiplier={store.updateExportSizeMultiplier}
						/>

						<section>
							<h3>
								LICENCE:
							</h3>
							<p>
								You are free to use anything you make with GlyphDrawingClub
								anywhere (private or commercial), without credits or licensing
								info.
							</p>
						</section>

						<section>
							<h3>
								Community links & project development:
							</h3>
							<ul>
								<li><a href="https://github.com/hlotvonen/glyph-drawing-club" target="_blank" rel="noreferrer">Github</a></li>							
								<li><a href="https://www.instagram.com/heikkiveikko/" target="_blank" rel="noreferrer">Instagram for examples & development updates</a></li>
								<li><a href="https://blog.glyphdrawing.club/" target="_blank" rel="noreferrer">Glyph Drawing Club blog</a></li>
								<li><a href="https://discord.gg/gJNDZ2M" target="_blank" rel="noreferrer">Glyph Drawing Club discord channel for sharing, help, inspiration, community etc! Join now :)</a></li>
							</ul>
						</section>
					</TabPanel>

					<TabPanel>
						<Help />
					</TabPanel>
				</Tabs>
			</div>
		)
	}
}

export default Settings
