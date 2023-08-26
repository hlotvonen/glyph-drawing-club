import { observer } from "mobx-react"
import store from "../../models/CanvasStore.js"

const GlyphFontSize = () => (
		<div className="toolbar-wrapper">
			<div className="button-grid button-grid-fontsize">
				<button onClick={store.decreaseGlyphFontSizeModifier}>
					-1
				</button>
				<button onClick={store.increaseGlyphFontSizeModifier}>
					+1
				</button>
				<button onClick={store.decreaseByOneCellGlyphFontSizeModifier}>
					÷2
				</button>
				<button onClick={store.increaseByOneCellGlyphFontSizeModifier}>
					×2
				</button>
			</div>

			<div className="toolbar-columns">
				<div>{store.glyphFontSizeModifier + "px"}</div>
			</div>

		</div>

)

export default observer(GlyphFontSize)
