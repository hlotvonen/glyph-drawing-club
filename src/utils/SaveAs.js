import FileSaver from "file-saver"
import store from "../models/CanvasStore"
import localforage from "localforage"

function timestamp() {
	// Get current date/time
	const now = new Date();
	// Format date as YYYYMMDDHHMMSS
	const formatted = now.toISOString().replace(/[-:.TZ]/g, ''); 
	return formatted;
}

export async function saveAs(filename, storage, extension) {
	try {
		const json = await localforage.getItem(storage);
		const blob = new Blob([json], {type: "application/json;charset=utf-8"});
		FileSaver.saveAs(blob, `${filename}-${timestamp()}.${extension}`);
	} catch (err) {
		console.error(err);
	}
}

export function saveAsString(filename, string, extension) {
	const json = string
	const blob = new Blob([json], { type: "application/json;charset=utf-8" })
	FileSaver.saveAs(blob, `${filename}-${timestamp()}.${extension}`)
}


export async function saveSelectionAs() {
	try {
    const value = await localforage.getItem("canvasStorage");
		const json = JSON.parse(value)

		let selectionAreaCanvas = [];
		const [[start_y, start_x]] = store.getSelectedArea()
		const {selectionHeight, selectionWidth} = store.getSelectionDimensions();

		for (let rowIndex = 0; rowIndex < selectionHeight; rowIndex++) {
			selectionAreaCanvas[rowIndex] = new Array();
			for (let colIndex = 0; colIndex < selectionWidth; colIndex++) {
				selectionAreaCanvas[rowIndex].push(store.canvas[start_y + rowIndex][start_x + colIndex])
			}
		}
	
		json.canvasWidth = selectionWidth
		json.canvasHeight = selectionHeight
		json.canvas = selectionAreaCanvas
	
		const blob = new Blob([JSON.stringify(json)], { type: "application/json;charset=utf-8" })
		FileSaver.saveAs(blob, `${store.fileName}-${timestamp()}.gdc`)
	} catch (err) {
		console.error(err);
	};	
}