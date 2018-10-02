import React from "react"
import { observer } from "mobx-react"
import setstore from "../models/KeymappingsStore"

class SetSelect extends React.Component {
	render() {
		const sets = setstore.sets
		const selectSetButtons = sets.map((setNumber, x) => (
			<button
				className={x === setstore.selectedSetIndex ? "active" : ""}
				type="button"
				key={x}
				onClick={() => this.props.selectSet(x)}
			>
				{x + 1}
			</button>
		))

		return (
			<div className="select_set">
				{"Add set "}
				<button type="button" onClick={this.props.addSet}>
					+
				</button>
				{"Select set: "}
				{selectSetButtons}
			</div>
		)
	}
}

export default observer(SetSelect)
