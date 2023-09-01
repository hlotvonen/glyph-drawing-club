import { observer } from "mobx-react"
import React from "react"
import store from "../../../models/CanvasStore.js"

const CanvasSizeModification = () => {
	return (
		<>
			<section data-tooltip="Resize Canvas: Adjust the drawing grid dimensions">
				<h3>Canvas size</h3>
				<div>
					Width:
					<button onClick={store.deleteCol}>-</button>
					<button onClick={store.addCol}>+</button>
					{store.canvasWidth} columns
				</div>

				<div>
					Height:
					<button onClick={store.deleteRow}>-</button>
					<button onClick={store.addRow}>+</button> 
					{store.canvasHeight} rows
				</div>
			</section>

			<section>
				<h3>Modify size at cursor</h3>
					<div>
						<button onClick={store.addRowAtSelection} data-tooltip="Add Row: Insert a new row just above the cursor position">
							Add Row {"\u2191"}
						</button>
						<button onClick={store.deleteRowAtSelection} data-tooltip="Delete Current Row: Remove the row at the cursor position">
							Delete Row
						</button>
					</div>
					<div>
						<button onClick={store.addColAtSelection} data-tooltip="Add Column: Insert a new column to the immediate left of the cursor.">
							Add Col {"\u2190"}
						</button>
						<button onClick={store.deleteColAtSelection} data-tooltip="Delete Current Column: Remove the column at the cursor position">
							Delete Col
						</button>
					</div>
			</section>
		</>
	)
}

export default observer(CanvasSizeModification)
