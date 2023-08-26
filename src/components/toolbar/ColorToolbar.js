import { observer } from "mobx-react"
import ColorStore from "../../models/ColorStore"
import { ToolbarColorsView } from "../settings/color/ColorPalette"

const ColorToolbar = () => ( 
	<div className="toolbar toolbar-colors">
	
		<svg viewBox="0 0 60 60" height="60" className="toolbar-title-svg">
			<defs><path id="textOnPath-colors" d="m0 30ZA1 1 30 0160 30" /></defs>
			<text>
				<textPath xlinkHref="#textOnPath-colors">
					Colors
				</textPath>
			</text>
		</svg>
		
		<div className="currentColors" onClick={() => ColorStore.swapFgBg()} title="Swap foreground and background colors">
			<div className="colorPreview" 
				style={{
				background: "rgb(" + 
					(ColorStore.changingCohesionColor 
					? ColorStore.cohesionOverlayColor
					: ColorStore.palettes[ColorStore.selectedPaletteIndex].colors[ColorStore.bgColorIndex])
						+ ")"
				}}
			>
				<div className="colorPreview inner"
					style={{
						background: "rgb(" + 
							(ColorStore.changingCohesionColor 
							? ColorStore.cohesionOverlayColor
							: ColorStore.palettes[ColorStore.selectedPaletteIndex].colors[ColorStore.colorIndex])
						+ ")"
					}}
				></div>
			</div>
		</div>

		<ToolbarColorsView colors={ColorStore.palettes[ColorStore.selectedPaletteIndex].colors} />

	</div>
)

export default observer(ColorToolbar)
