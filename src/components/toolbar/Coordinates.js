import { observer } from "mobx-react";
import store from "../../models/CanvasStore.js";

const SelectionSize = observer(() => {	
	if (store.selectionArea.start === null) {
		return null;
	}
	let selectionWidth = 0
	let selectionHeight = 0

	if (store.selectionArea.end === null) {
		selectionWidth = Math.abs(store.selected_x - store.selectionArea.start[1]) + 1
		selectionHeight = Math.abs(store.selected_y - store.selectionArea.start[0]) + 1
	} else {
		selectionWidth =  Math.abs(store.selectionArea.end[1] - store.selectionArea.start[1]) + 1
		selectionHeight =  Math.abs(store.selectionArea.end[0] - store.selectionArea.start[0]) + 1		
	}
	return (
		<div>
			selection x:{selectionWidth} y:{selectionHeight}
		</div>
	)
})

const Coordinates = () => (
	<div className="coordinates">
		<div>
			x:{+store.selected_x + 1} y:{+store.selected_y + 1}
		</div>
		<SelectionSize />
	</div>
)
export default observer(Coordinates)

