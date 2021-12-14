import { observer } from "mobx-react"
import React from "react"
import store from "../../models/CanvasStore.js"

class FontSize extends React.Component {
	render() {
		return (
			<div>
				{"Default font size: "}
				<button onClick={store.decreaseFontSize}> {"-1"} </button>
				<button onClick={store.increaseFontSize}> {"+1"} </button>
				<span>{" " + store.defaultFontSize} px</span>
			</div>
		)
	}
}
export default observer(FontSize)
