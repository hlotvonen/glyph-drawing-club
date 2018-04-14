import React, { Component } from 'react';
import { observer } from 'mobx-react';
import store from '../models/CanvasStore.js';
import setstore from '../models/KeymappingsStore'
import Grid from './Grid';

class Canvas extends Component {
	componentDidMount(){
		document.addEventListener("keydown", this.handleKeyPress, false);
	}
	componentWillUnmount(){
		document.removeEventListener("keydown", this.handleKeyPress, false);
	}

	handleKeyPress = (event) => {

		const glyph = [store.glyphPath, store.svgWidth, store.svgHeight, store.svgBaseline]

		const handlers = !setstore.toggleMapping ? {
				ArrowRight: store.goRight,
				ArrowLeft: store.goLeft,
				ArrowDown: store.goDown,
				ArrowUp: store.goUp,
				' ': store.insertEmpty,
				q: store.insert,
				r: store.rotateGlyphRight,
				f: store.handleChangeFlip,
				h: store.handleChangeHideGrid,
				i: store.handleChangeInvertColor,
				m: setstore.handleChangeMapping,
				u: store.undoCanvas,
				i: store.addToCanvas,
				//draw glyph from keymap on to canvas
				F1: () => setstore.getMapping("F1"),
				F2: () => setstore.getMapping("F2"),
				F3: () => setstore.getMapping("F3"),
				F4: () => setstore.getMapping("F4"),
				F5: () => setstore.getMapping("F5"),
				F6: () => setstore.getMapping("F6"),
				F7: () => setstore.getMapping("F7"),
				F8: () => setstore.getMapping("F8"),
				F9: () => setstore.getMapping("F9"),
				F10: () => setstore.getMapping("F10")
		} : {
				//assign selected glyph to keymap
				F1: () => setstore.setMapping("F1", glyph),
				F2: () => setstore.setMapping("F2", glyph),
				F3: () => setstore.setMapping("F3", glyph),
				F4: () => setstore.setMapping("F4", glyph),
				F5: () => setstore.setMapping("F5", glyph),
				F6: () => setstore.setMapping("F6", glyph),
				F7: () => setstore.setMapping("F7", glyph),
				F8: () => setstore.setMapping("F8", glyph),
				F9: () => setstore.setMapping("F9", glyph),
				F10: () => setstore.setMapping("F10", glyph),
				m: setstore.handleChangeMapping
		}

		const handler = handlers[event.key]
		
		if (!handler) {
				return
		}

		handler()
		event.preventDefault();
	}


	render() {
		return (
			<div className={"canvas_container" + (store.hideGrid ? ' hideGrid' : '') + (store.darkTheme ? ' darkTheme' : '')}>
				<div className="aligner">
					<Grid canvas={store.canvas}/>
				</div>
			</div>
		);
	}
}

export default observer(Canvas);
