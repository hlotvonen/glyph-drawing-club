import React from "react"

class GlyphClear extends React.Component {
	render() {
		return (
			<div>
				<button onClick={this.props.glyphClear}> {"Reset glyph to default"} </button>
			</div>
		)
	}
}
export default GlyphClear
