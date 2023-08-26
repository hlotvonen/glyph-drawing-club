import { observer } from "mobx-react"
import store from "../../../models/CanvasStore"
import colorstore from "../../../models/ColorStore.js"
import SelectedGlyph from "../../toolbar/SelectedGlyph"

const Cursor = ({x, y, w, h}) => (
	<div
		className="cursor"
		style={{
			boxShadow: "0 0 0 1px var(--highlight)",
			zIndex: 10,
			pointerEvents: "none",
			width: w,
			height: h,
			transform: `translate(${x * w}px, ${y * h}px)`,
			position: "absolute",
			willChange: "transform"
		}}
	>
		<div className="vector" style={{opacity:0.5}}>
			<SelectedGlyph
				glyphPath={store.glyphPath}
				svgWidth={store.svgWidth}
				svgHeight={store.svgHeight || 1}
				svgBaseline={store.svgBaseline}
				rotationAmount={store.rotationAmount}
				flipGlyph={store.flipGlyph}
				glyphInvertedShape={store.glyphInvertedShape}
				colorIndex={colorstore.colorIndex}
				bgColorIndex={colorstore.bgColorIndex}
				showBg={false}
				defaultFontSize={store.defaultFontSize}
				glyphFontSizeModifier={store.glyphFontSizeModifier}
			/>
		</div>
	</div>
)

export default observer(Cursor)