import FileSaver from "file-saver"
import store from "../models/CanvasStore"
import localforage from "localforage"

export function saveAs(filename, storage, extension) {
	localforage.getItem(storage)
	.then((value) => {
		//load from localforage if it's not the first time
		const json = value
		const blob = new Blob([json], { type: "application/json;charset=utf-8" })
		FileSaver.saveAs(blob, filename + "." + extension)
	})
	.catch((err) => {
		// This code runs if there were any errors
		console.log(err);
	});
}

export function saveAsString(filename, string, extension) {
		const json = string
		const blob = new Blob([json], { type: "application/json;charset=utf-8" })
		FileSaver.saveAs(blob, filename + "." + extension)
}


export function saveSelectionAs() {

	localforage.getItem("canvasStorage")
	.then((value) => {
		//load from localforage if it's not the first time
		const json = JSON.parse(value)

		let selectionWidth = 0
		let selectionHeight = 0
	
		if (store.selectionArea.start !== null) {
	
			if (store.selectionArea.end === null) {
				selectionWidth = Math.abs(store.selected_x - store.selectionArea.start[1]) + 1
				selectionHeight = Math.abs(store.selected_y - store.selectionArea.start[0]) + 1
			} else {
				selectionWidth = Math.abs(store.selectionArea.end[1] - store.selectionArea.start[1]) + 1
				selectionHeight = Math.abs(store.selectionArea.end[0] - store.selectionArea.start[0]) + 1
			}
		}
	
		let selectionAreaCanvas = [];
	
		const boundingRectangle = store.getSelectedArea()
		const [[start_y, start_x]] = boundingRectangle
	
		for (let y_i = 0; y_i < selectionHeight; y_i++) {
			selectionAreaCanvas[y_i] = new Array();
			for (let x_i = 0; x_i < selectionWidth; x_i++) {
				selectionAreaCanvas[y_i].push(store.canvas[start_y + y_i][start_x + x_i])
			}
		}
	
		json.canvasWidth = selectionWidth
		json.canvasHeight = selectionHeight
		json.canvas = selectionAreaCanvas
	
		const blob = new Blob([JSON.stringify(json)], { type: "application/json;charset=utf-8" })
		FileSaver.saveAs(blob, store.fileName + ".gdc")


	})
	.catch((err) => {
		// This code runs if there were any errors
		console.log(err);
	});
	
}