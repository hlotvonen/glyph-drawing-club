import invert from "invert-color"
import { observer } from "mobx-react"
import { nanoid } from "nanoid"
import { Component, useState } from "react"
import store from "../../../models/CanvasStore"
import colorStore from "../../../models/ColorStore"
import { colorBlend } from "../../../utils/colorConversion"

// TODO: add back way to check used colors
// let uniqueColors = observable(new Set())
// const getUniqueColors = () => {
// 	if(!store.canvas) {
// 		return
// 	}
// 	const canvas = store.canvas
// 	canvas.map((row, x) => row.map((col, y) => {
// 		uniqueColors.add(Number(col[0][10]))
// 		uniqueColors.add(Number(col[1][10]))
// 		uniqueColors.add(Number(col[2][10]))
// 		uniqueColors.add(Number(col[3][10]))
// 		uniqueColors.add(Number(col[4][0]))
// 	}))
// 	return [...uniqueColors]
// }

const LayerColorIndex = observer(({index}) => {

	const selected = store.canvas[store.selected_y][store.selected_x]

	const colorIndex = selected.map((layer, i) => {
		if(Number(selected[i][i == 4 ? 0 : 10]) !== index || selected[i][0] === "M0 0") {
			return null
		}
		return( 
			<div
				key={nanoid()}
				style={{
					color: invert({
						r: colorStore.palettes[colorStore.selectedPaletteIndex].colors[selected[i][i == 4 ? 0 : 10]][0],
						g: colorStore.palettes[colorStore.selectedPaletteIndex].colors[selected[i][i == 4 ? 0 : 10]][1],
						b: colorStore.palettes[colorStore.selectedPaletteIndex].colors[selected[i][i == 4 ? 0 : 10]][2]
					}, true)
				}}
			>
				{i === 4 ? "B" : i+1}
			</div>
		)
	})
	return colorIndex
})

const FgIndicator = observer(({index}) => {
	if(index !== colorStore.colorIndex) {
		return null;
	}
	return (
		<svg
			height={"22"}
			width={"22"}
		>
			<polygon
				points={"0,11 0,22 11,22"}
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

const BgIndicator = observer(({index}) => {
	if(index !== colorStore.bgColorIndex) {
		return null;
	}
	return (
		<svg
			height={"22"}
			width={"22"}
		>
			<polygon
				points={"16,22 22,22, 22,16"}
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

const Tooltip = observer(({ i, show }) => (
	<>
		{show && 
		<div className="tooltiptext">
			{i}
		</div>
		}
	</>
))

const handleClick = (i, e) => {
	e.preventDefault()
	switch (e.detail) {
    case 1:
			colorStore.setFgColorIndex(e, i)
      break;
    case 2:
			if(colorStore.quickPalette.has(i)) {
				colorStore.quickPalette.delete(i)
			} else {
				colorStore.quickPalette.add(i)
			}
      break;
  }
}

const handleRightClick = (i, e) => {
	e.preventDefault()
	colorStore.setBgColorIndex(e, i)
}

const Swatch = observer(({ index, color }) => {
	const [show, setShow] = useState(false)
	return (
		<div
			className={"color tooltip"}
			style={{
				background: "rgb(" + colorBlend(color, colorStore.cohesionOverlayColor, colorStore.cohesionIntensity) + ")",
			}}
			onClick={(e) => handleClick(index, e)}
			onContextMenu={(e) => handleRightClick(index, e)}
			onMouseEnter={() => setShow(true)}
			onMouseLeave={() => setShow(false)}
		>
			<Tooltip i={index} show={show}/>
			<LayerColorIndex index={index} />
			<FgIndicator index={index} />
			<BgIndicator index={index} />
		</div>
	)
})

export const ToolbarColorsView = observer(({ colors }) => {

	return( 
		<div>
			<div className="used-colors">
				{colors.map((color, i) => {
					if(!colorStore.quickPalette.has(i)) {
						return;
					}
					return( 
						<Swatch index={i} color={color} key={nanoid()} />
					)
				})}
			</div>

			<svg className="UiGrid" width={"100%"} height={"100%"} xmlns="http://www.w3.org/2000/svg">
				<rect width="100%" height="100%" fill="url(#paletteGrid)" stroke="var(--toolbar-border)" strokeWidth="0.5"/>
			</svg>
			
		</div>
	)
})

const ColorPaletteView = observer(({ colors }) => {

	return( 
		<div>
			{colors.map((color, i) => {
				if(!colorStore.quickPalette.has(i) && colorStore.showQuickPaletteColors) {
					return (
						<div className="color" key={nanoid()} ></div>
					)
				} else {
					return( 
						<Swatch index={i} color={color} key={nanoid()} />
					)
				}
				
			})}
		</div>
	)
})

class ColorPalette extends Component {
	render() {

		if (!colorStore.palettes.length) {
			return <span>Loading...</span>
		}

		const colors = colorStore.palettes[colorStore.selectedPaletteIndex].colors

		return (
			<div className={"colorPalette"}>

				<ColorPaletteView colors={colors} />

				<svg className="UiGrid" width={"100%"} height={"100%"} xmlns="http://www.w3.org/2000/svg">
					<defs>
						<pattern id="paletteGrid" width={22} height={22} patternUnits="userSpaceOnUse">
							<path d={"M 22 0 L 0 0 0 22"} fill="none" stroke="var(--toolbar-border)" strokeWidth="0.5" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#paletteGrid)" stroke="var(--toolbar-border)" strokeWidth="0.5"/>
				</svg>

			</div>
		)
	}
}
export default observer(ColorPalette)
