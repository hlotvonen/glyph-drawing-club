import { observer } from "mobx-react"
import React from "react"
import store from "../../models/CanvasStore.js"

class GlyphOffsetX extends React.Component {
	render() {
		return (
			<div> 
				<div className="settings-header mt-2">
					<span>GLYPH OFFSET</span>

					<div>
						{"Amount: "}
						<input
							type="number"
							min="1"
							value={store.offsetAmount}
							onChange={evt => store.handleChangeOffsetAmount(evt)}
							onFocus={() => store.toggleWriting()}
							onBlur={() => store.toggleWriting()}
						/>
					</div>
				</div>


				<div className="grid grid-cols-3">
					<span className="flex justify-center items-center">{"Offset X: "}{store.glyphOffsetX}</span>
					<button onClick={store.decreaseGlyphOffsetY}> {"↑"} </button>
					<span className="flex justify-center items-center">{"Offset Y: "}{store.glyphOffsetY}</span>
					<button onClick={store.decreaseGlyphOffsetX}> {"←"} </button>
					<button onClick={store.resetOffset}> {"Center"} </button>
					<button onClick={store.increaseGlyphOffsetX}> {"→"} </button>				
					<button className="col-start-2"onClick={store.increaseGlyphOffsetY}> {"↓"} </button>
				</div>
			
			</div>
		)
	}
}
export default observer(GlyphOffsetX)
