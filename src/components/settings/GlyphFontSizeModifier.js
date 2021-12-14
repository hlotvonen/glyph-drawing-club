import { observer } from "mobx-react"
import React from "react"
import store from "../../models/CanvasStore.js"

class GlyphFontSize extends React.Component {
	render() {
		return (
			<div>
				<div className="settings-header mt-2">GLYPH SIZE MODIFIER</div>
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
				<span className="ml-1">{store.glyphFontSizeModifier} px </span>
			</div>
		)
	}
}
export default observer(GlyphFontSize)
