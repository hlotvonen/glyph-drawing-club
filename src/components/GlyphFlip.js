import React from "react"
import { observer } from "mobx-react"

class GlyphFlip extends React.Component {
	render() {
		return (
			<div>
				<button onClick={this.props.handleChangeFlip}>
					{" "}
					{"Flip glyph (f)"}{" "}
				</button>
			</div>
		)
	}
}
export default observer(GlyphFlip)
//          	{'Flip glyph:'}
//          	<input id="flipGlyph" type="checkbox" value={this.props.flipGlyph} onChange={this.props.handleChangeFlip} />
