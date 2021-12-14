import { observer } from "mobx-react"
import React from "react"
import setstore from "../../../models/KeymappingsStore"

class ToggleMapping extends React.Component {
	render() {
		return (
			<div className="ToggleMapping relative">
				<input
					id="toggleMapping"
					type="checkbox"
					name="mapping"
					checked={setstore.toggleMapping}
					value={setstore.toggleMapping}
					onChange={setstore.handleChangeMapping}
				/>
				<label htmlFor="mapping">Map glyphs to number keys</label>
			</div>
		)
	}
}
export default observer(ToggleMapping)
