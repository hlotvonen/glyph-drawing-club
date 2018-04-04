import React from 'react';

const SelectedGlyph = (props) => {
  return (
    <div className="selectedGlyph">
      <svg height={props.fontSize} viewBox={"0 " + props.svgBaseline + " " + props.svgWidth + " " + props.svgHeight} style={{transform: `scale(1, -1)`}}>
        <path d={props.glyphPath}/>
      </svg>
    </div>
  )
}

export default SelectedGlyph;