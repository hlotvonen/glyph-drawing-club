import { observer } from "mobx-react"
import React, { Component } from "react"
import store from "../../models/CanvasStore"
import ColorPalette from "../settings/color/ColorPalette"

@observer
class QuickChooseColor extends Component {


	render() {
		if(store.toggleQuickChooseColor) {
			return (
				<div className="quickChooseColor">
					<div className="paletteContainer">
					    <ColorPalette />
					</div>
				</div>
			)
		} else {
			return (
				<></>
			)
		}
	}
}
export default QuickChooseColor
