import React from 'react';

const Cell = (props) => {
    let transform = { 
        transform: `scale(${props.flipGlyph}, -1) rotate(${props.rotationAmount}deg)`
    };
    const highlighted = props.highlighted ? 'selected' : '';
    const clipCells = props.clipCells ? 'clipCells' : '';
    const glyphInvertedColor = props.glyphInvertedColor ? 'invertColor' : '';
	const classes = `${highlighted} ${clipCells} ${glyphInvertedColor}`;

	return (
		<div className={classes} style={{width : props.cellWidth, height : props.cellHeight}} >
			<svg
				height={+props.defaultFontSize + +props.glyphFontSizeModifier} 
				viewBox={props.glyphOffsetX + " " + props.svgBaseline + " " + props.svgWidth + " " + props.svgHeight} 
				style={transform}
			>
				<path d={props.glyphPath}/>
			</svg>
		</div>
	)
}

export default Cell;