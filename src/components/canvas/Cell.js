import { observer } from "mobx-react"
import store from "../../models/CanvasStore"
import colorStore from "../../models/ColorStore"
import { colorBlend } from "../../utils/colorConversion"

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
				layer4,

			}, props.x, props.y)
		)
	}
})

const renderLayer = (layer, index) => {
  const [
    glyphPath, 
    svgWidth,
    svgHeight, 
    svgBaseline, 
    glyphOffsetX, 
    glyphFontSizeModifier, 
    rotationAmount, 
    flipGlyph, 
    glyphInvertedShape, 
    glyphOffsetY,
    colorIndex
  ] = layer;

  if(glyphPath === "M0 0" || store.hiddenLayers[index] === true) {
    return null;
  }

  return (
    <g 
      key={index}
      transform={`
        translate(${800 + glyphOffsetX} ${800 + glyphOffsetY}) 
        scale(${(Number(store.defaultFontSize) + glyphFontSizeModifier) / Number(store.defaultFontSize)})
        translate(${flipGlyph == 1 ? -800 : 0} 0)
        scale(${flipGlyph * 800 / (svgHeight == 1 ? 800 : svgHeight)} ${-1 * 800 / (svgHeight == 1 ? 800 : svgHeight)})
        rotate(${rotationAmount} ${(svgHeight == 1 ? 800 : svgHeight) / 2} ${(svgHeight == 1 ? 800 : svgHeight) / 2}) 
        translate(0 ${-svgBaseline})
      `}>
      <path 
        d={glyphInvertedShape ? `M0 0 v${svgHeight} h${svgWidth} V0 H0 z ${glyphPath}` : glyphPath} 
        fill={`rgb(${colorBlend(colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorIndex], colorStore.cohesionOverlayColor, colorStore.cohesionIntensity)})`}
      />
    </g>
  );
};
  
export const rawSvgCell = ({
	layer1,
	layer2,
	layer3,
	layer4
}, x, y) => {
	const layers = [layer1, layer2, layer3, layer4];
  
	return (
	  <svg
		height={Number(store.defaultFontSize)}
		viewBox={0 + " " + 0 + " " + 800 / (store.cellHeight / store.cellWidth) + " " + 800}
		style={{ 
		  overflow: "visible",
		  left: store.cellWidth * x + "px",
		  top: store.cellHeight * y + "px",
		  position: "absolute"
		}}
		onClick={() => store.handleClickSVG(x, y)}
	  >
			{layers.map(renderLayer)}
	  </svg>
	);
};

export default Cell