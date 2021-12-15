import { observer } from "mobx-react"
import React from "react"
import store from "../../models/CanvasStore"
import { saveAs, saveSelectionAs } from "../../utils/SaveAs"

class SaveAsButton extends React.Component {
	render() {
		return (
			<div>
				Filename:
				<input
					type="text"
					name="name"
					value={this.props.fileName}
					onChange={this.props.updateFileName}
					onFocus={() => store.toggleWriting()}
					onBlur={() => store.toggleWriting()}
				/>
				<button onClick={() => saveAs(store.fileName, "canvasStorage", "gdc")}> {"Save"} </button>
				<button onClick={() => saveSelectionAs()} disabled={store.selectionArea.start !== null ? false : true}> {"Save selection"} </button>
			</div>
		)
	}
}
export default observer(SaveAsButton)
