import { observer } from "mobx-react"
import React from "react"
import store from "../../../models/CanvasStore"
import colorstore from "../../../models/ColorStore"
import setstore from "../../../models/KeymappingsStore"
import SelectedGlyph from "../../toolbar/SelectedGlyph"

const KeyMapping = observer(props => {
	return (
		<div className={props.setIndex === setstore.selectedSetIndex ? "active my-1 visible" : "my-1 hidden"}>
			<div className="flex text-xs text-center justify-between">
				{Object.entries(props.keys).map(([keyName, glyph]) => {
					if (glyph[0] == "M0 0") {
						return (
							<div key={keyName}>
								<div className="selectedGlyph">
									<div className="vector"></div>
								</div>
								{keyName}
							</div>
						)
					} else {
						return (
							<div key={keyName}>
								<div className="selectedGlyph">
									<div className="vector">
										<SelectedGlyph
											key={keyName}
											glyphPath={glyph[0]}
											svgWidth={glyph[1]}
											svgHeight={glyph[2]}
											svgBaseline={glyph[3]}
											rotationAmount={store.rotationAmount}
											flipGlyph={store.flipGlyph}
											glyphInvertedShape={store.glyphInvertedShape}
											colorIndex={colorstore.colorIndex}
											bgColorIndex={colorstore.bgColorIndex}
											showBg={true}
											defaultFontSize={store.defaultFontSize}
											glyphFontSizeModifier={store.glyphFontSizeModifier}
										/>
									</div>
								</div>
								{keyName}
							</div>
						)
					}
				})}
			</div>
		</div>
	)
})

export default KeyMapping
