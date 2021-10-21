import React from "react"
import { observer } from "mobx-react"

class PaintMode extends React.Component {
	render() {
		return (
			<div>
				{"Paint mode (b):"}
				<input
					id="paintMode"
					type="checkbox"
					value={this.props.paintMode}
					onChange={this.props.handleChangePaintMode}
				/>
			</div>
		)
	}
}
export default observer(PaintMode)
