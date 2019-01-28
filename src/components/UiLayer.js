import React, { Component } from "react"
import SelectionHighlight from "./SelectionHighlight"
import Numbers from "./Numbers"
import Cursor from "./Cursor"
import UiGrid from "./UiGrid"

class UiLayer extends React.Component {
  render() {
    return (
		<div className="UiLayer">
			<Numbers />
			<UiGrid />
			<Cursor />
			<SelectionHighlight />
		</div>
    )
  }
}
export default UiLayer
