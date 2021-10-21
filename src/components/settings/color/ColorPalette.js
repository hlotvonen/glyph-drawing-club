import React, { Component, useState } from "react"
import { autorun } from "mobx"
import { observer } from "mobx-react"
import colorStore from "../../../models/ColorStore"
import { colorBlend } from "../../../utils/colorConversion"
import invert from 'invert-color'
import store from "../../../models/CanvasStore"
import { nanoid } from 'nanoid'

const LayerColorIndex = observer(() => {
	const selected = store.canvas[store.selected_y][store.selected_x]
	return (
		<>
			{selected.map((layer, i) => (
				<div
					className="pointer-events-none absolute"
					key={nanoid()}
					style={{
						color: invert({
							r: colorStore.palettes[colorStore.selectedPaletteIndex].colors[selected[i][i == 4 ? 0 : 10]][0],
							g: colorStore.palettes[colorStore.selectedPaletteIndex].colors[selected[i][i == 4 ? 0 : 10]][1],
							b: colorStore.palettes[colorStore.selectedPaletteIndex].colors[selected[i][i == 4 ? 0 : 10]][2]
						}, true),
					transform: `translate(${selected[i][i == 4 ? 0 : 10] % 16 * 20 + i*5 - 1}px, ${((selected[i][i == 4 ? 0 : 10] / 16) >> 0) * 20 +1}px)`
					}}
				>{i == 4 ? 'B' : i+1}</div>
			))}
		</>
	)
})

const FgIndicator = observer(() => {
	const index = colorStore.colorIndex
	return (
		<svg
			className="pointer-events-none absolute"
			height={"20"}
			width={"20"}
			style={{
				transform: `translate(${index % 16 * 20}px, ${((index / 16) >> 0) * 20}px)`,
			}}
		>
			<polygon
				points={"0,12 0,20 8,20"}
				style={{
					fill: invert({
						r: colorStore.palettes[colorStore.selectedPaletteIndex].colors[index][0],
						g: colorStore.palettes[colorStore.selectedPaletteIndex].colors[index][1],
						b: colorStore.palettes[colorStore.selectedPaletteIndex].colors[index][2]
					}, true),
				}}
			/>
		</svg>
	)
})
const BgIndicator = observer(() => {
	const index = colorStore.bgColorIndex
	return (
		<svg
			className="pointer-events-none absolute"
			height={"20"}
			width={"20"}
			style={{
				transform: `translate(${index % 16 * 20}px, ${((index / 16) >> 0) * 20}px)`,
			}}
		>
			<polygon
				points={"14,20 20,20, 20,14"}
				style={{
					fill: invert({
						r: colorStore.palettes[colorStore.selectedPaletteIndex].colors[index][0],
						g: colorStore.palettes[colorStore.selectedPaletteIndex].colors[index][1],
						b: colorStore.palettes[colorStore.selectedPaletteIndex].colors[index][2]
					}, true),
				}}
			/>
		</svg>
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
		<div className="tooltiptext text-xs">
			{i}
		</div>
	}
	</>
))

const handleClick = (i, e) => {
	e.preventDefault();
	colorStore.setFgColorIndex(e, i)
}

const handleRightClick = (i, e) => {
	e.preventDefault();
	colorStore.setBgColorIndex(e, i)
}

const Swatch = observer(({ index, color }) => {

	const [show, setShow] = useState(false);

	return (
		<div
			className={"color tooltip"}
			style={{
				background: "rgb(" + colorBlend(color, colorStore.cohesionOverlayColor, colorStore.cohesionIntensity) + ")",
				visibility: !colorStore.showUsedColors ? "visible" : ([...uniqueColorsSet].includes(index) ? "visible" : "hidden")
			}}
			onClick={(e) => handleClick(index, e)}
			onContextMenu={(e) => handleRightClick(index, e)}
			onMouseEnter={() => setShow(true)}
			onMouseLeave={() => setShow(false)}
		>
			<Tooltip i={index} show={show}/>
		</div>
	)
})

const ColorPaletteView = observer(({ colors }) => (
	<div>
		{colors.map((color, i) => (
			<Swatch index={i} color={color} key={nanoid()} /> 
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
			<div className={"colorPalette relative text-xs"}>

				<svg className="UiGrid" width={"100%"} height={"100%"} xmlns="http://www.w3.org/2000/svg">
					<defs>
						<pattern id="paletteGrid" width={20} height={20} patternUnits="userSpaceOnUse">
							<path d={`M 20 0 L 0 0 0 20`} fill="none" stroke="grey" strokeWidth="0.5" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#paletteGrid)" stroke="black" strokeWidth="0.5"/>
				</svg>

				<ColorPaletteView colors={colors} />
				<LayerColorIndex/>
				<FgIndicator />
				<BgIndicator />
			</div>
		)
	}
}
export default observer(ColorPalette)
