import { observer } from "mobx-react"
import React from "react"
import store from "../../models/CanvasStore"

class HideGrid extends React.Component {
	render() {
		return (
			<div className="relative">
				<input
					id="hideGrid"
					name="hideGrid"
					type="checkbox"
					checked={store.hideGrid}
					value={store.hideGrid}
					onChange={store.handleChangeHideGrid}
				/>
				<label htmlFor="hideGrid">Hide grid <kbd>h</kbd></label>
			</div>
		)
	}
}
export default observer(HideGrid)
