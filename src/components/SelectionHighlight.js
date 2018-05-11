import React from 'react';
import store from '../models/CanvasStore';
import { observer } from 'mobx-react';

 const SelectionHighlight = (props) => {

	let posTopX = store.selectionStartPoint[1] * store.cellWidth
	let posTopY = store.selectionStartPoint[0] * store.cellHeight
	let width = store.cellWidth * (store.selected_x - store.selectionStartPoint[0] + 1) 
	let height = store.cellHeight * (store.selected_y - store.selectionStartPoint[1] + 1) 

	return (
		<div className='selectionHighlight' style={{width : width, height : height, top : posTopX, left : posTopY }} >
		</div>
	)
}

export default observer(SelectionHighlight);