import { observer } from "mobx-react"
import React from "react"
import setstore from "../../../models/KeymappingsStore"

class SetSelect extends React.Component {
	render() {
		
		if (!setstore.sets) {
			return (
				<div className={"canvas_container"}>
					<div className="aligner">
						Loading sets...
					</div>
				</div>
			)
		}

		const sets = setstore.sets
		const selectSetButtons = sets.map((setNumber, x) => (
			<button
				className={x === setstore.selectedSetIndex ? "active" : ""}
				type="button"
				key={x}
				onClick={() => this.props.selectSet(x)}
			>
				{Number(x + 1)}
			</button>
		))

		return (
			<div className="select_set">
				<div className="flex justify-between w-full">
					<div>
						{selectSetButtons}
					</div>
					<div>
						<button type="button" onClick={this.props.addSet}>
						Add
						</button>
						<button type="button" onClick={this.props.deleteSet}>
						Delete
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default observer(SetSelect)
