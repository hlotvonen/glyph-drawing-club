import React, { Component, useState } from "react"
import { autorun } from "mobx"
import { observer } from "mobx-react"
import colorStore from "../models/ColorStore"
import { colorBlend } from "../utils/colorConversion"
import invert from 'invert-color'
import store from "../models/CanvasStore"
import { nanoid } from 'nanoid'

const LayerColorIndex = observer(({ i, color }) => {
	const selected = store.canvas[store.selected_y][store.selected_x]
	return (
		<>
			{	
				(	selected[0][10] == i ||
					selected[1][10] == i ||
					selected[2][10] == i ||
					selected[3][10] == i ||
					selected[4][0] == i
				) &&
				<div style={{ color: invert({ r: color[0], g: color[1], b: color[2] }, true) }}>
					{selected[0][10] == i ? "1" : ""}
					{selected[1][10] == i ? "2" : ""}
					{selected[2][10] == i ? "3" : ""}
					{selected[3][10] == i ? "4" : ""}
					{selected[4][0] == i ? "b" : ""}
				</div>
			}
		</>
	)
})

const FgIndicator = observer(({ i, color }) => {
	return (
		<>
			{colorStore.colorIndex == i &&
				<svg height={"8"} width={"8"} style={{bottom: "0", left: "0", position: "absolute"}}>
					<polygon points={"0,0 0,8 8,8"} style={{ fill: invert({ r: color[0], g: color[1], b: color[2] }, true) }} />
				</svg>
			}
		</>
	)
})
const BgIndicator = observer(({ i, color }) => {
	return (
		<>
			{colorStore.bgColorIndex == i &&
				<svg height={"6"} width={"6"} style={{bottom: "0", right: "0", position: "absolute"}}>
					<polygon points={"0,6 6,6 6,0"} style={{ fill: invert({ r: color[0], g: color[1], b: color[2] }, true) }} />
				</svg>
			}
		</>
	)
})

let uniqueColorsSet = new Set()
autorun(() => {
    if (colorStore.showUsedColors) {
		// Check the whole canvas for which colors (or indexes of color) have been used 
		// We are using the Set object, which only allows unique values, so we add each color index to the set
		// if we use the showUsedColors function, we can compare the color index in the palette with the color indexes of our canvas
		const canvas = store.canvas
		canvas.map((row) => row.map((col) => {
			uniqueColorsSet.add(Number(col[0][10]))
			uniqueColorsSet.add(Number(col[1][10]))
			uniqueColorsSet.add(Number(col[2][10]))
			uniqueColorsSet.add(Number(col[3][10]))
			uniqueColorsSet.add(Number(col[4][0]))
		}))
    } else {
        return
    }
})

const Tooltip = observer(({ i, show }) => (
	<>
	{show && 
		<div className="tooltiptext">
			#{i + 1}
		</div>
	}
	</>
))

const Swatch = observer(({ i, color }) => {

	const [show, setShow] = useState(false);

	return (
		<div
			className={"color tooltip"}
			style={{
				background: "rgb(" + colorBlend(color, colorStore.cohesionOverlayColor, colorStore.cohesionIntensity) + ")",
				visibility: !colorStore.showUsedColors ? "visible" : ([...uniqueColorsSet].includes(i) ? "visible" : "hidden")
			}}
			onClick={(e) => colorStore.setFgColorIndex(e, i)}
			onContextMenu={(e) => colorStore.setBgColorIndex(e, i)}
			onMouseEnter={() => setShow(true)}
			onMouseLeave={() => setShow(false)}
		>
			<LayerColorIndex i={i} color={color} />
			<FgIndicator i={i} color={color} />
			<BgIndicator i={i} color={color} />
			<Tooltip i={i} show={show}/>
		</div>
	)
})

const ColorPaletteView = observer(({ colors }) => (
	<div>
		{colors.map((color, i) => (
			<Swatch i={i} color={color} key={nanoid()} /> 
		))}
	</div>
))

class ColorPalette extends Component {
	render() {

		if (!colorStore.palettes.length) {
			return <span>Loading...</span>;
		}

		const colors = colorStore.palettes[colorStore.selectedPaletteIndex].colors

		return (
			<div className={"colorPalette"}>
				
				<svg className="UiGrid" width={"100%"} height={"100%"} xmlns="http://www.w3.org/2000/svg">
					<defs>
						<pattern id="paletteGrid" width={25} height={25} patternUnits="userSpaceOnUse">
							<path d={`M 25 0 L 0 0 0 25`} fill="none" stroke="grey" strokeWidth="0.5" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#paletteGrid)" stroke="black" strokeWidth="0.5"/>
				</svg>

				<ColorPaletteView colors={colors} />
			</div>
		)
	}
}
export default observer(ColorPalette)
