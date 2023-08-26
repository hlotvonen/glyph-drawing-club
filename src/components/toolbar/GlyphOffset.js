import { observer } from "mobx-react"
import store from "../../models/CanvasStore.js"

const GlyphOffsetX = () => (
	<>
		<div className="toolbar-wrapper">
			<div className="button-grid button-grid-glyphoffset">
				<button className="icon-button" title="Decrease offset in Y-axis [o + up arrow]" onClick={store.decreaseGlyphOffsetY}> 
					<svg className="icon" height="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"><path d="M400,50l325,225l-25,25l-275-150l25,200h-100l25-200l-275,150l-25-25Z"></path></svg>
				</button>
				
				
				<button className="icon-button" title="Decrease offset in X-axis [o + left arrow]" onClick={store.decreaseGlyphOffsetX}>
					<svg className="icon" width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800"><path d="M50,400l225,325l25-25l-150-275l200,25v-100l-200,25l150-275l-25-25Z"></path></svg>
				</button>
				
				<button className="icon-button" onClick={store.resetOffset}>
					<svg className="icon" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M450,350l300-25v-25h-225l200-175l-50-50l-175,200v-225h-25ZM50,500h225l-200,175l50,50l175-200v225h25l25-300l-300,25ZM50,325l300,25l-25-300h-25v225l-175-200l-50,50l200,175h-225ZM450,450l25,300h25v-225l175,200l50-50l-200-175h225v-25Z"></path></svg>
				</button>
				
				<button className="icon-button" title="Increase offset in X-axis [o + right arrow]"  onClick={store.increaseGlyphOffsetX}>
					<svg className="icon" width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800"><path d="M350,400l-225,325l-25-25l150-275l-200,25v-100l200,25l-150-275l25-25Z"></path></svg>
				</button>
								
				<button className="icon-button" title="Increase offset in Y-axis [o + down arrow]"  onClick={store.increaseGlyphOffsetY}>
					<svg className="icon" height="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"><path d="M400,350l325-225l-25-25l-275,150l25-200h-100l25,200l-275-150l-25,25Z"></path></svg>
				</button>
			</div>

			<div className="toolbar-columns">
				<div>{"x:" + store.glyphOffsetX}</div>
				<div>{"y:" + store.glyphOffsetY}</div>
			</div>

		</div>

		<div className="toolbar-wrapper">
			<button className="icon-button" onClick={store.glyphClear}>
				Reset
			</button>
		</div>
	
	</>
)
export default observer(GlyphOffsetX)
