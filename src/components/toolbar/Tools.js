import { observer } from "mobx-react"
import CanvasStore from "../../models/CanvasStore"
import GlyphFontSizeModifier from "./GlyphFontSizeModifier"
import GlyphOffset from "./GlyphOffset"

const Tools = () => ( 
	<div className="toolbar-tools">

		<div className="tools-1st-half">
		
			<svg viewBox="0 0 60 60" height="60" className="toolbar-title-svg">
				<defs><path id="textOnPath-tools" d="m0 30ZA1 1 30 0160 30" /></defs>
				<text>
					<textPath xlinkHref="#textOnPath-tools"  textAnchor="middle" startOffset="50%">
						Tools
					</textPath>
				</text>
			</svg>

			<div className="mode-buttons">
				<button title="Drawing mode" className={`icon-button ${CanvasStore.paintMode ? "active" : ""}`} onClick={() => CanvasStore.paintMode = !CanvasStore.paintMode}>
					<svg className="icon" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M125,750l275-125l250-375l-25-150l-100-75l-125,25l-275,400ZM150,600l25-125h75l75,75l25-25l-100-100h-50l225-325l75-25l75,75l25,100l-225,325l-125,75l-25-50Z"></path></svg>
				</button>
				<button title="Normal mode" className="icon-button">
					<svg className="icon" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M200,750l150-175l75,175l200-100l-100-150h200l-525-450ZM225,125l375,325h-175l125,175l-100,50l-75-200l-125,150Z"></path></svg>
				</button>
				<button title="Typing mode" className="icon-button">
					<svg className="icon" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M50,750h700v-700h-700ZM75,75l625,25l25,625l-625-25ZM175,250l200-25l-25,400h100l-25-400l200,25v-75h-450Z"></path></svg>
				</button>
			</div>

			<div className="toolbar-wrapper">
				<div className="button-grid mode-transforms">	
					<button title="Flip [f]" className="icon-button" onClick={CanvasStore.selectionArea.start ? CanvasStore.flipSelection : CanvasStore.handleChangeFlip}>
						<svg className="icon" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M500,750h250l-250-700ZM50,750h250v-700ZM375,750h50v-100h-50ZM375,600h50v-100h-50ZM375,450h50v-100h-50ZM375,300h50v-100h-50ZM375,150h50v-100h-50ZM525,200l150,500h-125Z"></path></svg>
					</button>
					<button title="Mirror [m]" className="icon-button" onClick={CanvasStore.selectionArea.start ? CanvasStore.mirrorSelection : CanvasStore.handleChangeMirror}>
						<svg className="icon" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M50,300h700l-350-250ZM50,500l350,250l350-250ZM50,425h100v-50h-100ZM200,525h425l-225,175ZM200,425h100v-50h-100ZM350,425h100v-50h-100ZM500,425h100v-50h-100ZM650,425h100v-50h-100Z"></path></svg>
					</button>
					<button title="Rotate [r]" className="icon-button" onClick={CanvasStore.selectionArea.start ? CanvasStore.rotateSelection : CanvasStore.rotateGlyphRight}>
						<svg className="icon" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M400,750c175,0,275-75,325-200l-75-25c-50,100-100,175-250,175c-175,0-300-125-300-300c0-175,125-300,300-300c100,0,175,25,225,75h-125v25l225,50l-50-225h-25v125c-50-75-150-100-250-100c-200,0-350,150-350,350c0,200,150,350,350,350Z"></path></svg>
					</button>
					<button title="Invert [i]" className="icon-button" onClick={CanvasStore.selectionArea.start ? CanvasStore.invertColorSelection : CanvasStore.handleChangeInvertColor}>
					<svg className="icon" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><path d="M400,750c200,0,350-150,350-350c0-100-25-175-100-250l-500,500c75,75,150,100,250,100ZM0,800v-800h800l-150,150c-75-75-150-100-250-100c-200,0-350,150-350,350c0,100,25,175,100,250Z"></path></svg>
					</button>
				</div>
			</div>

			<div className="toolbar-wrapper">
				<div className="button-grid mode-undoredo">	
					<button disabled={!CanvasStore.isUndoAvailable} onClick={CanvasStore.undo} title="Undo [Cmd/Ctrl + z]">
						undo
					</button>
					<button disabled={!CanvasStore.isRedoAvailable} onClick={CanvasStore.redo} title="Redo [Cmd/Ctrl + Shift + z]">
						redo
					</button>
				</div>
			</div>
		</div>

		<div className="tools-2nd-half">
		
			<svg viewBox="0 0 60 60" height="60" className="toolbar-title-svg">
				<defs><path id="textOnPath-transforms" d="m60 30ZA1 1 30 010 30" /></defs>
				<text>
					<textPath xlinkHref="#textOnPath-transforms" textAnchor="middle" startOffset="50%">
						Transforms
					</textPath>
				</text>
			</svg>

			<GlyphFontSizeModifier />
			<GlyphOffset />
		</div>

	</div>
)

export default observer(Tools)