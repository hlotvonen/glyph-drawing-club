import React from "react"
import { observer } from "mobx-react"
import store from "../models/CanvasStore.js"

class GlyphOffsetX extends React.Component {
	render() {
		return (
			<div>
				{"Glyph offset X:"}
				<button onClick={store.decreaseGlyphOffsetX}> {"←"} </button>
				<button onClick={store.increaseGlyphOffsetX}> {"→"} </button>
				<span>{store.glyphOffsetX}</span>
				<br />
				{"Glyph offset Y:"}
				<button onClick={store.decreaseGlyphOffsetY}> {"↑"} </button>
				<button onClick={store.increaseGlyphOffsetY}> {"↓"} </button>
				<span>{store.glyphOffsetY}</span>
			</div>
		)
	}
}
export default observer(GlyphOffsetX)
