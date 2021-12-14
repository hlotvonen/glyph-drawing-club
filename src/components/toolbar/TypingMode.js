import { observer } from "mobx-react"
import React from "react"
import store from "../../models/CanvasStore"

class TypingMode extends React.Component {
	render() {
		return (
			<div className="relative">
				<input
					id="typingMode"
					name="typingMode"
					type="checkbox"
					value={store.typingMode}
					onChange={store.handleChangeTypingMode}
				/>
				<label htmlFor="typingMode">Typing mode</label>
			</div>
		)
	}
}
export default observer(TypingMode)
