import { observer } from "mobx-react"
import React from "react"
import store from "../../../models/CanvasStore"
import Cursor from "./Cursor"
import Numbers from "./Numbers"
import SelectionHighlight from "./SelectionHighlight"
import UiGrid from "./UiGrid"

@observer
class UiLayer extends React.Component {
	render() {
		return (
			<div className="UiLayer noselect">
				<Numbers />
				<UiGrid />
				<Cursor x={store.selected_x} y={store.selected_y} w={store.cellWidth} h={store.cellHeight}/>
				<SelectionHighlight />
			</div>
		)
	}
}
export default UiLayer
