import React from "react"
import store from "../models/CanvasStore"
import colorStore from "../models/ColorStore"
import { observer } from "mobx-react"
import { colorBlend } from "../utils/colorConversion"

const Cell = observer(props => {
	const [
		layer1,
		layer2,
		layer3,
		layer4
	] = props.cell

	if(layer1[0] == "M0 0" && layer2[0] == "M0 0" && layer3[0] == "M0 0" && layer4[0] == "M0 0" ) {
		return (null)
	} else {
		return (
			rawSvgCell({
				layer1,
				layer2,
				layer3,
				layer4
			})
		)
	}
})
/*
[
0: glyphPath, 
1: svgWidth,
2: svgHeight, 
3: svgBaseline, 
4: glyphOffsetX, 
5: glyphFontSizeModifier, 
6: rotationAmount, 
7: flipGlyph, 
8: glyphInvertedShape, 
9: glyphOffsetY
]
*/
export const rawSvgCell = ({
	layer1,
	layer2,
	layer3,
	layer4
}) => (
	<svg
		height={Number(store.defaultFontSize)}
		viewBox={0 + " " + 0 + " " + 800 / (store.cellHeight / store.cellWidth) + " " + 800}
		style={{ overflow: "visible" }}
	>	
		<g transform={`translate(400 400)`}> 
			
			{
	          	layer1[0] === "M0 0" || store.hiddenLayers[0] == 0 
	          	? null
	          	: (
					<g transform={`
						translate(${layer1[4]} ${layer1[9]})
						scale(${(Number(store.defaultFontSize) + layer1[5]) / Number(store.defaultFontSize)})
						`}>
						<g transform={`
							scale(
								${layer1[7] * 800 / (layer1[2] == 1 ? 800 : layer1[2])} 
								${-1 * 800 / (layer1[2] == 1 ? 800 : layer1[2])}
							) 
							rotate(${layer1[6]}) 
							translate(0 ${-layer1[3]})
						`}>
							<path 
								d={layer1[8] ? `M0 0 v${layer1[2]} h${layer1[1]} V0 H0 z ${layer1[0]}` : layer1[0]} 
								fill={`rgb(${colorBlend(colorStore.palettes[colorStore.selectedPaletteIndex][layer1[10]], colorStore.cohesionOverlayColor, colorStore.cohesionIntensity)})`}
								transform={`translate(
									${-((layer1[2] == 1 ? 800 : layer1[2]) / 2)} 
									${-((layer1[2] == 1 ? 800 : layer1[2]) / 2)}
								)`} 
							/>
						</g>
					</g>
				)
			}
			{
	          	layer2[0] === "M0 0" || store.hiddenLayers[1] == 1
	          	? null
	          	: (
					<g transform={`translate(${layer2[4]} ${layer2[9]})`}>
						<g transform={`
							scale(
								${layer2[7] * 800 / (layer2[2] == 1 ? 800 : layer2[2])} 
								${-1 * 800 / (layer2[2] == 1 ? 800 : layer2[2])}
							) 
							rotate(${layer2[6]}) 
							translate(0 ${-layer2[3]})
						`}>
							<path 
								d={layer2[8] ? `M0 0 v800 h800 V0 H0 z ${layer2[0]}` : layer2[0]} 
								fill={`rgb(${colorBlend(colorStore.palettes[colorStore.selectedPaletteIndex][layer2[10]], colorStore.cohesionOverlayColor, colorStore.cohesionIntensity)})`}
								transform={`translate(
									${-((layer2[1] == 1 ? 800 : layer2[1]) / 2)} 
									${-((layer2[2] == 1 ? 800 : layer2[2]) / 2)}
								)`} 
							/>
						</g>
					</g>
				)
			}
			{
	          	layer3[0] === "M0 0" || store.hiddenLayers[2] == 2
	          	? null
	          	: (
					<g transform={`translate(${layer3[4]} ${layer3[9]})`}>
						<g transform={`
							scale(
								${layer3[7] * 800 / (layer3[2] == 1 ? 800 : layer3[2])} 
								${-1 * 800 / (layer3[2] == 1 ? 800 : layer3[2])}
							) 
							rotate(${layer3[6]}) 
							translate(0 ${-layer3[3]})
						`}>
							<path 
								d={layer3[8] ? `M0 0 v800 h800 V0 H0 z ${layer3[0]}` : layer3[0]} 
								fill={`rgb(${colorBlend(colorStore.palettes[colorStore.selectedPaletteIndex][layer3[10]], colorStore.cohesionOverlayColor, colorStore.cohesionIntensity)})`}
								transform={`translate(
									${-((layer3[1] == 1 ? 800 : layer3[1]) / 2)} 
									${-((layer3[2] == 1 ? 800 : layer3[2]) / 2)}
								)`} 
							/>
						</g>
					</g>
				)
			}
			{
	          	layer4[0] === "M0 0" || store.hiddenLayers[3] == 3
	          	? null
	          	: (
					<g transform={`translate(${layer4[4]} ${layer4[9]})`}>
						<g transform={`
							scale(
								${layer4[7] * 800 / (layer4[2] == 1 ? 800 : layer4[2])} 
								${-1 * 800 / (layer4[2] == 1 ? 800 : layer4[2])}
							) 
							rotate(${layer4[6]}) 
							translate(0 ${-layer4[3]})
						`}>
							<path 
								d={layer4[8] ? `M0 0 v800 h800 V0 H0 z ${layer4[0]}` : layer4[0]}
								fill={`rgb(${colorBlend(colorStore.palettes[colorStore.selectedPaletteIndex][layer4[10]], colorStore.cohesionOverlayColor, colorStore.cohesionIntensity)})`} 
								transform={`translate(
									${-((layer4[1] == 1 ? 800 : layer4[1]) / 2)} 
									${-((layer4[2] == 1 ? 800 : layer4[2]) / 2)}
								)`} 
							/>
						</g>
					</g>
				)
			}

		</g>
	</svg>
)

export default Cell