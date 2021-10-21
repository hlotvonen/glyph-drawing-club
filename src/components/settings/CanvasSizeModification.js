import React from "react"
import { observer } from "mobx-react"
import store from "../../models/CanvasStore.js"

class CanvasHeight extends React.Component {
	render() {
		return (
			<div>

				<div className="settingsBlock">
					{"Canvas height:"}
					<button onClick={store.deleteRow}> {"-1"} </button>
					<button onClick={store.addRow}> {"+1"} </button>
					<span>
						{store.canvasHeight} {"cells"} ({store.cellHeight * store.canvasHeight} px)
					</span>
					<br />
					{"Canvas width:"}
					<button onClick={store.deleteCol}> {"-1"} </button>
					<button onClick={store.addCol}> {"+1"} </button>
					<span>
						{store.canvasWidth} {"cells"} ({store.cellWidth * store.canvasWidth} px)
					</span>
					<br />
				</div>

				<div className="settingsBlock">
					{"At selection:"}
					<br />
					<button onClick={store.addRowAtSelection}>
						{"Add Row \u2191"}
					</button>
					<button onClick={store.deleteRowAtSelection}>
						{"Delete Row"}
					</button>
					<br />
					<button onClick={store.addColAtSelection}>
						{"Add Col \u2190"}
					</button>
					<button onClick={store.deleteColAtSelection}>
						{"Delete Col"}
					</button>
				</div>

			</div>
		)
	}
}
export default observer(CanvasHeight)
