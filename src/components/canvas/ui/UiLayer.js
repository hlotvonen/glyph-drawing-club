import React, { Component } from "react"
import SelectionHighlight from "./SelectionHighlight"
import Numbers from "./Numbers"
import Cursor from "./Cursor"
import UiGrid from "./UiGrid"
import { observer } from "mobx-react";
import store from "../../../models/CanvasStore"

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
