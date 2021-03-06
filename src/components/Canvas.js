import React, { Component } from "react"
import { observer } from "mobx-react"
import { action } from "mobx"
import store from "../models/CanvasStore.js"
import setstore from "../models/KeymappingsStore"
import gridstore from "../models/GridStore.js"
import Grid from "./Grid"
import GridControls from "./GridControls"
import Coordinates from "./Coordinates"
import SelectedGlyph from "./SelectedGlyph"
import QuickChooseColor from "./QuickChooseColor"

class Canvas extends Component {
	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyPress, false)
		document.addEventListener("keyup", this.handleKeyPressUp, false)
	}
	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyPress, false)
		document.removeEventListener("keyup", this.handleKeyPressUp, false)
	}

	@action
	handleKeyPress = event => {
		//disable shortcuts if focus is on input element
		if (!store.disableShortcuts && !store.typingMode) {
			const glyph = [
				store.glyphPath,
				store.svgWidth,
				store.svgHeight,
				store.svgBaseline,
			]

			const handlers = !setstore.toggleMapping
				? {
						ArrowRight: store.goRight,
						ArrowLeft: store.goLeft,
						ArrowDown: store.goDown,
						ArrowUp: store.goUp,
						" ": store.insertEmpty,
						Backspace: store.backSpace,
						Enter: store.insert,
						q: store.insert,
						e: store.insertEmptyCell,
						r: store.rotateGlyphRight,
						f: store.handleChangeFlip,
						h: store.handleChangeHideGrid,
						i: store.handleChangeInvertColor,
						b: store.handleChangePaintMode,
						z: store.handleUndoRedo,
						p: store.showPreview,
						b: store.insertBackground,
						v: store.colorFg,
						w: store.goUp,
						a: store.goLeft,
						s: store.goDown,
						d: store.goRight,
						x: store.showQuickChooseColor,
						c: store.copy,
						o: store.handleOffsetOn,
						",": () => store.selectLayer("left"),
						".": () => store.selectLayer("right"),
						"+": gridstore.zoomIn,
						"-": gridstore.zoomOut,
							
						//Modifier keys:
						Alt: store.handleAltDown,
						Meta: store.handleMetaDown,
						Control: store.handleCtrlDown,
						Shift: store.handleShiftDown,

						//Unused keys:
						//GNOPWX
						A: store.selectAll,
						S: store.makeSelection,
						C: store.copySelection,
						M: store.mirrorSelection,
						T: store.transposeSelection,
						R: store.rotateSelection,
						Y: store.rotateIndividuallySelection,
						U: store.flipIndividuallySelection,
						F: store.flipSelection,
						E: store.clearArea,
						Q: store.fillArea,
						B: store.fillBackgroundArea,
						V: store.colorFgSelectionArea,
						I: store.invertColorSelection,
						H: store.shiftAreaLeft,
						J: store.shiftAreaDown,
						K: store.shiftAreaUp,
						L: store.shiftAreaRight,
						D: store.emptySelection,

						m: setstore.handleChangeMapping,
						//draw glyph from keymap on to canvas
						1: () => setstore.getMapping("1"),
						2: () => setstore.getMapping("2"),
						3: () => setstore.getMapping("3"),
						4: () => setstore.getMapping("4"),
						5: () => setstore.getMapping("5"),
						6: () => setstore.getMapping("6"),
						7: () => setstore.getMapping("7"),
						8: () => setstore.getMapping("8"),
						9: () => setstore.getMapping("9"),
						0: () => setstore.getMapping("0"),
				  }
				: {
						//assign selected glyph to keymap
						1: () => setstore.setMapping("1", glyph),
						2: () => setstore.setMapping("2", glyph),
						3: () => setstore.setMapping("3", glyph),
						4: () => setstore.setMapping("4", glyph),
						5: () => setstore.setMapping("5", glyph),
						6: () => setstore.setMapping("6", glyph),
						7: () => setstore.setMapping("7", glyph),
						8: () => setstore.setMapping("8", glyph),
						9: () => setstore.setMapping("9", glyph),
						0: () => setstore.setMapping("0", glyph),
						m: setstore.handleChangeMapping,
				  }

			const handler = handlers[event.key]

			if (!handler) {
				return
			}

			handler()
			event.preventDefault()
		}
	}

	handleKeyPressUp = event => {
		const handlers = {
			Alt: store.handleAltUp,
			Control: store.handleCtrlUp,
			Meta: store.handleMetaUp,
			Shift: store.handleShiftUp,
			p: store.hidePreview,
			x: store.hideQuickChooseColor,
			o: store.handleOffsetOff, 
		}
		const handler = handlers[event.key]

		if (!handler) {
			return
		}

		handler()
		event.preventDefault()
	}

	render() {
		return (
			<div className={"canvas_container" + (store.hideGrid ? " hideGrid" : "")}>
				<div className="aligner">
					<Grid />
					<GridControls />
					<Coordinates />
					<div className="SelectedGlyphContainer">
						<SelectedGlyph
							glyphPath={store.glyphPath}
							svgWidth={store.svgWidth}
							svgHeight={store.svgHeight}
							svgBaseline={store.svgBaseline}
						/>
					</div>
					<QuickChooseColor />
				</div>
			</div>
		)
	}
}

export default observer(Canvas)
