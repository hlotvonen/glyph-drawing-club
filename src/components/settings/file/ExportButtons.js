import { observer } from "mobx-react"
import store from "../../../models/CanvasStore"
import { exportAs } from "../../../utils/Export"

const ExportButtons = (props) => (
	<section>
		<h3>Export</h3>
		<div className="exportPng">
			<button onClick={() => exportAs("png")}>Export Png</button>
			Size:
			<input
				type="number"
				min="1"
				max="25"
				value={props.exportSizeMultiplier}
				onChange={props.updateExportSizeMultiplier}
				onFocus={() => store.toggleWriting(true)}
				onBlur={() => store.toggleWriting(false)}
			/>
			({store.cellWidth * store.canvasWidth * store.exportSizeMultiplier} px &times; {store.cellHeight * store.canvasHeight * store.exportSizeMultiplier} px)
		</div>
		<div className="exportSvg">
			<button onClick={() => exportAs("svg")}>Export Svg</button>
			<a
				href="https://blog.glyphdrawing.club/how-to-clean-up-your-drawing-in-adobe-illustrator"
				target="_blank"
				rel="noreferrer noopener"
			>
				Read how to clean up SVG files
			</a>
		</div>
	</section>
)

export default observer(ExportButtons)
