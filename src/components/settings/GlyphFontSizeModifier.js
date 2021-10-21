import React from "react"
import { observer } from "mobx-react"
import store from "../../models/CanvasStore.js"

class GlyphFontSize extends React.Component {
	render() {
		return (
			<div>
				{"Glyph size modifier:"}
				<button onClick={store.decreaseGlyphFontSizeModifier}>
					{"-1"}
				</button>
				<button onClick={store.increaseGlyphFontSizeModifier}>
					{"+1"}
				</button>
				<button onClick={store.decreaseByOneCellGlyphFontSizeModifier}>
					{"-" + store.defaultFontSize}
				</button>
				<button onClick={store.increaseByOneCellGlyphFontSizeModifier}>
					{"+" + store.defaultFontSize}
				</button>
				<span>{store.glyphFontSizeModifier} px</span>
			</div>
		)
	}
}
export default observer(GlyphFontSize)
