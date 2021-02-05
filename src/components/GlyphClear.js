import React from "react"
import store from "../models/CanvasStore.js"

class GlyphClear extends React.Component {
	render() {
		return (
			<div>
				<button onClick={this.props.resetOffset}> {"Reset offset to default"} </button>
				<br />
				<button onClick={this.props.glyphClear}> {"Reset all to default"} </button>
			</div>
		)
	}
}
export default GlyphClear
