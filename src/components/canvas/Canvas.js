import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import localforage from 'localforage';

import store from "../../models/CanvasStore.js"
import colorstore from "../../models/ColorStore.js"
import FontStore from "../../models/FontStore.js"
import gridstore from "../../models/GridStore.js"
import setstore from "../../models/KeymappingsStore"

import ColorToolbar from "../toolbar/ColorToolbar.js"
import Coordinates from "../toolbar/Coordinates"
import GridControls from "../toolbar/GridControls"
import LayerSelect from "../toolbar/LayerSelect.js"
import QuickChooseColor from "../toolbar/QuickChooseColor"
import SelectedGlyph from "../toolbar/SelectedGlyph"
import Tools from "../toolbar/Tools.js"

import Grid from "./Grid"

const Canvas = observer(() => {

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false);
    document.addEventListener('keyup', handleKeyPressUp, false);

    return () => {
      document.removeEventListener('keydown', handleKeyPress, false);
      document.removeEventListener('keyup', handleKeyPressUp, false);
    };
  }, []);

  const resetPageAndClearLocalStorage = () => {
    localforage
      .clear()
      .then(() => {
        console.log('Database is now empty.');
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

	const handleKeyPress = (event) => {
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
					a: store.goLeft,
					b: store.insertBackground,
					c: () => store.copy(store.selected_x, store.selected_y),
					d: store.goRight,
					e: store.insertEmptyCell,
					f: store.handleChangeFlip,
					h: store.handleChangeHideGrid,
					i: store.handleChangeInvertColor,
					m: store.handleChangeMirror,
					o: store.handleOffsetOn,
					p: store.showPreview,
					q: store.insert,
					r: store.rotateGlyphRight,
					v: store.colorFg,
					w: store.goUp,
					s: store.goDown,
					x: store.showQuickChooseColor,
					z: store.handleUndoRedo,
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
					B: store.fillBackgroundArea,
					C: store.copySelection,
					D: store.emptySelection,
					E: store.clearArea,
					F: store.flipSelection,
					H: store.shiftAreaLeft,
					I: store.invertColorSelection,
					J: store.shiftAreaDown,
					K: store.shiftAreaUp,
					L: store.shiftAreaRight,
					M: store.mirrorSelection,
					Q: store.fillArea,
					R: store.rotateSelection,
					S: store.makeSelection,
					T: store.transposeSelection,
					U: store.flipIndividuallySelection,
					V: store.colorFgSelectionArea,
					Y: store.rotateIndividuallySelection,
					X: colorstore.swapFgBg,
						
					//draw glyph from keymap on to canvas
					// 1: () => setstore.getMapping("1"),
					// 2: () => setstore.getMapping("2"),
					// 3: () => setstore.getMapping("3"),
					// 4: () => setstore.getMapping("4"),
					// 5: () => setstore.getMapping("5"),
					// 6: () => setstore.getMapping("6"),
					// 7: () => setstore.getMapping("7"),
					// 8: () => setstore.getMapping("8"),
					// 9: () => setstore.getMapping("9"),
					// 0: () => setstore.getMapping("0"),
				}
				: {
					//assign selected glyph to keymap
					// 1: () => setstore.setMapping("1", glyph),
					// 2: () => setstore.setMapping("2", glyph),
					// 3: () => setstore.setMapping("3", glyph),
					// 4: () => setstore.setMapping("4", glyph),
					// 5: () => setstore.setMapping("5", glyph),
					// 6: () => setstore.setMapping("6", glyph),
					// 7: () => setstore.setMapping("7", glyph),
					// 8: () => setstore.setMapping("8", glyph),
					// 9: () => setstore.setMapping("9", glyph),
					// 0: () => setstore.setMapping("0", glyph),
				}

			const handler = handlers[event.key]

			if (!handler) {
				return
			}

			handler()
			event.preventDefault()
		}
	}

	const handleKeyPressUp = (event) => {
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

	const handleWheel = (event) => {
		if (event.deltaY < 0) {
			FontStore.prevGlyph();
		} else {
			FontStore.nextGlyph();
		}
	}

	if (!store.canvas) {
		return (
		  <div className='canvas_container'>
			<div>
			  <h1>Loading canvas...</h1>
			  <h2>If you get stuck in the loading screen: refresh the page.</h2>
			  <p>
				In extreme cases, if nothing else works...{' '}
				<button onClick={resetPageAndClearLocalStorage}>
				  WARNING: RESET EVERYTHING
				</button>
			  </p>
			</div>
		  </div>
		);
	}

	return (
		<div
			className={`canvas_container${store.hideGrid ? ' hideGrid' : ''}`}
			onWheel={handleWheel}
		>
		  <Grid />
		  <GridControls />
		  <Coordinates />
		  <div className='SelectedGlyphContainer'>
				<div className='selectedGlyph'>
					<div className='vector'>
					<SelectedGlyph
						glyphPath={store.glyphPath}
						svgWidth={store.svgWidth}
						svgHeight={store.svgHeight || 1}
						svgBaseline={store.svgBaseline}
						rotationAmount={store.rotationAmount}
						glyphFontSizeModifier={store.glyphFontSizeModifier}
						flipGlyph={store.flipGlyph}
						glyphInvertedShape={store.glyphInvertedShape}
						colorIndex={colorstore.colorIndex}
						bgColorIndex={colorstore.bgColorIndex}
						showBg={true}
						defaultFontSize={store.defaultFontSize}
						glyphOffsetX={0}
						glyphOffsetY={0}
					/>
					</div>
				</div>
		  </div>
		  <LayerSelect />
		  <Tools />
		  <ColorToolbar />
		  <QuickChooseColor />
		</div>
	);
});

export default Canvas;