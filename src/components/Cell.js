import React from 'react';

const Cell = (props) => {
  return (
    <div className={(props.highlighted ? 'selected' : '')} style={{width : props.cellWidth, height : props.cellHeight, fontSize : props.fontSize}} >{props.character}</div>
  )
}

export default Cell;