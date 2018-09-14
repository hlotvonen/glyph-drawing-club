import React from 'react';
import store from '../models/CanvasStore';
import {observer} from 'mobx-react'

const Cell = observer((props) => {
    const [glyphPath, svgWidth, svgHeight, svgBaseline, glyphOffsetX, glyphFontSizeModifier, rotationAmount, flipGlyph, glyphInvertedColor]
         = store.canvas[props.y][props.x]

    let transform = { 
        transform: `scale(${flipGlyph}, -1) rotate(${rotationAmount}deg)`
    };
    const clipCellsClass = store.clipCells ? 'clipCells' : '';
    const glyphInvertedColorClass = glyphInvertedColor ? 'invertColor' : '';
	const classes = `${clipCellsClass} ${glyphInvertedColorClass}`;

	return (
		<div className={classes} style={{width : store.cellWidth, height : store.cellHeight}} onClick={props.clickSelection}>
			<svg
				data-y={props.y}
				data-x={props.x}
				height={Number(store.defaultFontSize) + Number(glyphFontSizeModifier)} 
				viewBox={glyphOffsetX + " " + svgBaseline + " " + svgWidth + " " + svgHeight} 
				style={transform}
			>
				<path d={glyphPath}/>
			</svg>
		</div>
	)
})

export default Cell;