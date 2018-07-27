import React, { Component } from 'react';
import { observer } from 'mobx-react';
import store from '../models/CanvasStore.js';
import setstore from '../models/KeymappingsStore'
import typingmodestore from '../models/TypingModeStore'
import Grid from './Grid';
import KeymappingsBar from './KeymappingsBar'
import GridControls from './GridControls'

class Canvas extends Component {
	componentDidMount(){
		document.addEventListener("keydown", this.handleKeyPress, false);
	}
	componentWillUnmount(){
		document.removeEventListener("keydown", this.handleKeyPress, false);
	}

	handleKeyPress = (event) => {

		//disable shortcuts if focus is on input element
		if(!store.disableShortcuts && !store.typingMode) {

			const glyph = [store.glyphPath, store.svgWidth, store.svgHeight, store.svgBaseline]

			const handlers = !setstore.toggleMapping ? {
					ArrowRight: store.goRight,
					ArrowLeft: store.goLeft,
					ArrowDown: store.goDown,
					ArrowUp: store.goUp,
					' ': store.insertEmpty,
					Backspace: store.backSpace,
					Enter: store.enter,
					q: store.insert,
					r: store.rotateGlyphRight,
					f: store.handleChangeFlip,
					h: store.handleChangeHideGrid,
					p: store.handleChangeTheme,
					i: store.handleChangeInvertColor,
					c: store.handleChangeClipCells,
					t: store.handleChangeTypingMode,

					S: store.makeSelection,
					C: store.copySelection,
					M: store.mirrorSelection,
					F: store.flipSelection,
					E: store.clearArea,
					Q: store.fillArea,
					I: store.invertColorSelection,
					x: store.emptySelection,

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
					0: () => setstore.getMapping("0")
			} : {
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
					m: setstore.handleChangeMapping
			}

			const handler = handlers[event.key]
			
			if (!handler) {
					return
			}

			handler()
			event.preventDefault();
		}
	}


	render() {
		return (
			<div className={"canvas_container" + (store.hideGrid ? ' hideGrid' : '') + (store.darkTheme ? ' darkTheme' : '')}>
				<div className="aligner">
					<Grid/>
					<GridControls />
				</div>
				<KeymappingsBar />
			</div>
		);
	}
}

export default observer(Canvas);
