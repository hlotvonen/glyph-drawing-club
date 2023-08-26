
import { observer } from "mobx-react"
import colorStore from "../../models/ColorStore"
import { colorBlend } from "../../utils/colorConversion"

const SelectedGlyph = observer((props) => {
    const {
        bgColorIndex,
        showBg,
        glyphOffsetX,
        glyphOffsetY,
        defaultFontSize,
        glyphFontSizeModifier,
        flipGlyph,
        svgHeight,
        rotationAmount,
        svgBaseline,
        glyphInvertedShape,
        svgWidth,
        glyphPath,
        colorIndex
    } = props;

    const bgColor = colorBlend(colorStore.palettes[colorStore.selectedPaletteIndex].colors[bgColorIndex], colorStore.cohesionOverlayColor, colorStore.cohesionIntensity)

    const scale = (Number(defaultFontSize) + glyphFontSizeModifier) / Number(defaultFontSize);
    const flip = svgHeight == 1 ? 800 : svgHeight;
    const rotate = (svgHeight == 1 ? 800 : svgHeight) / 2;
    const fill = `rgb(${colorBlend(colorStore.palettes[colorStore.selectedPaletteIndex].colors[colorIndex], colorStore.cohesionOverlayColor, colorStore.cohesionIntensity)})`;

    return (
        <svg
            viewBox="0 0 800 800"
            style={{ backgroundColor: `rgb(${showBg && bgColor})` }}
            width="100%"
            height="100%"
        >
            <g
                transform={`
                    translate(${glyphOffsetX} ${glyphOffsetY})
                    scale(${scale})
                    translate(${800 + (flipGlyph == 1 ? -800 : 0)} 800)
                    scale(${flipGlyph * 800 / flip} ${-1 * 800 / flip})
                    rotate(${rotationAmount} ${rotate} ${rotate})
                    translate(0 ${-svgBaseline})
                `}
            >
                <path
                    d={glyphInvertedShape ? `M0 0 v${svgHeight} h${svgWidth} V0 H0 z ${glyphPath}` : glyphPath}
                    fill={fill}
                />
            </g>
        </svg>
    )
})

export default SelectedGlyph;
