import React from "react"
import colorStore from "../../models/ColorStore"
import { colorBlend } from "../../utils/colorConversion"
import { observer } from "mobx-react"

const SelectedGlyph = observer((props) => {

	const bgColor = colorBlend(colorStore.palettes[colorStore.selectedPaletteIndex].colors[props.bgColorIndex], colorStore.cohesionOverlayColor, colorStore.cohesionIntensity)

	return (
		<svg
			viewBox={
				"0 " +
				props.svgBaseline +
				" " +
				props.svgWidth +
				" " +
				props.svgHeight
			}
			style={{
				backgroundColor: `rgb(${props.showBg && bgColor})`,
			}}
			width={ '100%'}
			height={'100%'}
		>
			<g
				transform={`
				${/*centering when glyph is flipped: */''}
				translate(
					${800 + (props.flipGlyph == 1 ? -800 : 0)} 
					800
				)
				${/*flip: */''} 
				scale(
					${props.flipGlyph * 800 / (props.svgHeight == 1 ? 800 : props.svgHeight)} 
					${-1 * 800 / (props.svgHeight == 1 ? 800 : props.svgHeight)}
				)
				${/*rotate: */''} 
				rotate(
					${props.rotationAmount} 
					${(props.svgHeight == 1 ? 800 : props.svgHeight) / 2} 
					${(props.svgHeight == 1 ? 800 : props.svgHeight) / 2}) 
				${/*baseline adjustment:*/''} 
				translate(
					0 
					${-props.svgBaseline}
				)
			`
			}>
				<path
					d={props.glyphInvertedShape ? `M0 0 v${props.svgHeight} h${props.svgWidth} V0 H0 z ${props.glyphPath}` : props.glyphPath}
					fill={`rgb(${colorBlend(colorStore.palettes[colorStore.selectedPaletteIndex].colors[props.colorIndex], colorStore.cohesionOverlayColor, colorStore.cohesionIntensity)})`}
				/>
			</g>
		</svg>
	)
})

export default SelectedGlyph