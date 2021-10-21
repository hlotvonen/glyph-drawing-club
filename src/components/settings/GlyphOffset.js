import React from "react"
import { observer } from "mobx-react"
import store from "../../models/CanvasStore.js"

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
				<br />
				{"Offset amount:"}
				<input
						type="number"
						min="1"
						value={store.offsetAmount}
						onChange={evt => store.handleChangeOffsetAmount(evt)}
						onFocus={() => store.toggleWriting()}
						onBlur={() => store.toggleWriting()}
				/>
			</div>
		)
	}
}
export default observer(GlyphOffsetX)
