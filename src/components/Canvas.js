import React, { Component } from 'react';
import { observer } from 'mobx-react';
import store from '../models/CanvasStore.js';
import setstore from '../models/KeymappingsStore'
import Grid from './Grid';
import handleKeyPress from '../utils/keyPressHandler'


class Canvas extends Component {
  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  handleKeyPress = (event) => {
    // TODO: Handle keymapping set usage:
    // If setstore.toggleMapping is true, set keymapping for pressed character to selected glyph
    // If setStore.toggleMapping is false, insert glyph from keymapping to canvas

    const handlers = {
        ArrowRight: store.goRight,
        ArrowLeft: store.goLeft,
        ArrowDown: store.goDown,
        ArrowUp: store.goUp,
        ' ': store.insertEmpty,
        q: store.insert,
        i: store.handleChangeInvertColor,
        r: store.rotateGlyphRight,
        f: store.handleChangeFlip
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
