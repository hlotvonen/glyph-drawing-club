import { observer } from "mobx-react"
import React from "react"
import setstore from "../../../models/KeymappingsStore"
import KeyMapping from "./KeyMapping"
import SetSelect from "./SetSelect"
import ToggleMapping from "./ToggleMapping"

@observer
class KeyMappings extends React.Component {
	render() {
		const sets = setstore.sets
		return (
			<div className="Sets">
				<div className="settings-header">
					GLYPH SETS
					<ToggleMapping />
				</div>
				<SetSelect addSet={setstore.addSet} deleteSet={setstore.deleteSet} selectSet={setstore.selectSet} />
				{sets.map((set, y) => (
					<KeyMapping keys={set} key={y} setIndex={y} />
				))}
			</div>
		)
	}
}

export default KeyMappings
