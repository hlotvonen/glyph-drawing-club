import React from "react"
import { observer } from "mobx-react"
import store from "../models/CanvasStore.js"

class GlyphOffsetX extends React.Component {
	render() {
		return (
			<div>
				{"Glyph offset X:"}
				<button onClick={this.props.increaseGlyphOffsetX}> {"←"} </button>
				<button onClick={this.props.decreaseGlyphOffsetX}> {"→"} </button>
				<span>{this.props.glyphOffsetX}</span>
			</div>
		)
	}
}
export default observer(GlyphOffsetX)
