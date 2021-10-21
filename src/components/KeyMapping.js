import React from "react"
import SelectedGlyph from "./toolbar/SelectedGlyph"
import setstore from "../models/KeymappingsStore"
import { observer } from "mobx-react"
import store from "../models/CanvasStore.js"
import colorstore from "../models/ColorStore.js"

const KeyMapping = observer(props => {
	return (
		<div
			className={
				"KeyMappingsContainer " +
				(props.setIndex === setstore.selectedSetIndex ? "active" : "")
			}
		>
			<div className="KeyMappingsFlexer">
				{Object.entries(props.keys).map(([keyName, glyph]) => {
					if (glyph[0] == "M0 0") {
						return (
							<div key={keyName}>
								{keyName}
								<div className="selectedGlyph">
									<div className="vector"></div>
								</div>
							</div>
						)
					} else {
						return (
							<div key={keyName}>
								{keyName}
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
										/>
									</div>
								</div>
							</div>
						)
					}
				})}
			</div>
		</div>
	)
})

export default KeyMapping
