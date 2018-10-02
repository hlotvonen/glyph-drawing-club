import React from "react"
import store from "../models/CanvasStore.js"

class DeleteRowOrCol extends React.Component {
	render() {
		return (
			<div>
				{"At selection:"}
				<button onClick={this.props.deleteRowAtSelection}>
					{" "}
					{"Delete Row"}{" "}
				</button>
				<button onClick={this.props.deleteColAtSelection}>
					{" "}
					{"Delete Col"}{" "}
				</button>
			</div>
		)
	}
}
export default DeleteRowOrCol
