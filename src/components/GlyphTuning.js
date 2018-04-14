import React from 'react'
import { observer } from 'mobx-react'
import GlyphOffsetX from './GlyphOffsetX'
import GlyphOffsetY from './GlyphOffsetY'
import GlyphFontSizeModifier from './GlyphFontSizeModifier'
import GlyphRotate from './GlyphRotate'
import GlyphFlip from './GlyphFlip'
import GlyphInvertColor from './GlyphInvertColor'
import GlyphClear from './GlyphClear'
import store from '../models/CanvasStore'

@observer 
class GlyphTuning extends React.Component {
	render() {
		return (
			<div>
				<h3>Glyph fine tuning</h3>
				<GlyphFontSizeModifier glyphFontSize={store.glyphFontSize} increaseGlyphFontSizeModifier={store.increaseGlyphFontSizeModifier} decreaseGlyphFontSizeModifier={store.decreaseGlyphFontSizeModifier} />
				<GlyphOffsetX increaseGlyphOffsetX={store.increaseGlyphOffsetX} decreaseGlyphOffsetX={store.decreaseGlyphOffsetX}/>
				<GlyphOffsetY increaseGlyphOffsetY={store.increaseGlyphOffsetY} decreaseGlyphOffsetY={store.decreaseGlyphOffsetY}/>
				<GlyphRotate rotationAmount={store.rotationAmount} rotateGlyphRight={store.rotateGlyphRight} rotateGlyphLeft={store.rotateGlyphLeft} />
				<GlyphFlip glyphFlip={store.glyphFlip} handleChangeFlip={store.handleChangeFlip}/>
				<GlyphInvertColor glyphInvertedColor={store.glyphInvertedColor} handleChangeInvertColor={store.handleChangeInvertColor}/>
				<GlyphClear glyphClear={store.glyphClear} />
			</div>
		);
	}
}

export default GlyphTuning;