import FileSaver from "file-saver"
import store from "../models/CanvasStore"

export function saveAs() {
	var json = localStorage.storage
	var blob = new Blob([json], { type: "application/json;charset=utf-8" })
	FileSaver.saveAs(blob, store.fileName + ".unscii")
}
