import React from "react"
import { observer } from "mobx-react"

class GlyphInvertColor extends React.Component {
	render() {
		return (
			<div>
				<button onClick={this.props.handleChangeInvertColor}>
					{" "}
					{"Invert color (i)"}{" "}
				</button>
			</div>
		)
	}
}
export default observer(GlyphInvertColor)
// <input type="checkbox" id="invertColor" value={this.props.invertColor} onChange={this.props.handleChangeInvertColor} />
