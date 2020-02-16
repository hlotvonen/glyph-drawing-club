import React from "react"
import store from "../models/CanvasStore"
import { action } from "mobx"

class LoadButton extends React.Component {
	state = {
		waitingForFileUpload: false,
	}

	static readUploadedFileAsText = inputFile => {
		const temporaryFileReader = new FileReader()

		return new Promise((resolve, reject) => {
			temporaryFileReader.onerror = () => {
				temporaryFileReader.abort()
				reject(new DOMException("Problem parsing input file."))
			}

			temporaryFileReader.onload = action(() => {
				resolve(temporaryFileReader.result)
				const jsonObj = JSON.parse(temporaryFileReader.result)

				//check if we are dealing with an old file, display warning and don't open file
				if (jsonObj["canvas"][0][0].length !== 5) {
					if (
						window.confirm(
							"Can't open a file saved with an old GDC version 1.0., sorry!"
						)
					) {
						window.location.href = "https://www.glyphdrawing.club/"
					}
					throw new Error(
						"Can't open a file saved with an old GDC version 1.0., sorry!"
					)
				}

				store.canvasHeight = jsonObj["canvasHeight"]
				store.canvasWidth = jsonObj["canvasWidth"]
				store.cellWidth = jsonObj["cellWidth"]
				store.cellHeight = jsonObj["cellHeight"]
				store.defaultFontSize = jsonObj["defaultFontSize"]
				store.canvas = jsonObj["canvas"]
			})
			temporaryFileReader.readAsText(inputFile)
		})
	}
	//WIP make this into await / async
	@action
	uploadFile = event => {
		event.persist()

		if (!event.target || !event.target.files) {
			return
		}

		this.setState({ waitingForFileUpload: true })

		//reset selected_x and y and empty selection to prevent crashes
		store.selected_x = 0
		store.selected_y = 0
		store.emptySelection()

		const fileList = event.target.files

		// Uploads will push to the file input's `.files` array. Get the last uploaded file.
		const latestUploadedFile = event.target.files.item(fileList.length - 1)

		try {
			const fileContents = LoadButton.readUploadedFileAsText(latestUploadedFile)
			this.setState({
				waitingForFileUpload: false,
			})
		} catch (e) {
			console.log(e)
			this.setState({
				waitingForFileUpload: false,
			})
		}
	}

	render() {
		return (
			<div>
				{"Load from file: "}
				<input type="file" name="myFile" onChange={this.uploadFile} />
			</div>
		)
	}
}
export default LoadButton
