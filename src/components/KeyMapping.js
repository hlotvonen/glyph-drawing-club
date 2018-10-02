import React from "react"
import SelectedGlyph from "./SelectedGlyph"
import setstore from "../models/KeymappingsStore"
import { observer } from "mobx-react"

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
					return (
						<div key={keyName}>
							{keyName}
							<SelectedGlyph
								key={keyName}
								glyphPath={glyph[0]}
								svgWidth={glyph[1]}
								svgHeight={glyph[2]}
								svgBaseline={glyph[3]}
							/>
						</div>
					)
				})}
			</div>
		</div>
	)
})

export default KeyMapping
