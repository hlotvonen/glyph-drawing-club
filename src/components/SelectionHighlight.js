import React from 'react';
import store from '../models/CanvasStore';
import { observer } from 'mobx-react';

 const SelectionHighlight = (props) => {
 	if (store.selectionArea.start === null) {
 		return null
 	}

 	const start_y = store.selectionArea.start[0]
 	const start_x = store.selectionArea.start[1]

 	const end_y = store.selectionArea.end
 	  ? store.selectionArea.end[0]
 	  : store.selected_y

	const end_x = store.selectionArea.end
	  ? store.selectionArea.end[1]
	  : store.selected_x
 	  
	let posTopX = start_x * store.cellWidth
	let posTopY = start_y * store.cellHeight
	let width = store.cellWidth * (end_x - start_x + 1) 
	let height = store.cellHeight * (end_y - start_y + 1) 


	return (
		<div className='selectionHighlight' style={{width : width, height : height, top : posTopY, left : posTopX }} >
		</div>
	)
}

export default observer(SelectionHighlight);