import { action } from "mobx"
import React from "react"
import store from "../../../models/CanvasStore"

class LoadAndPlace extends React.Component {
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
					if (window.confirm("Can't open old file, sorry!")) {
						window.location.href = "https://www.glyphdrawing.club/"
					}
					throw new Error("Can't open old file, sorry!")
				}

				let canvasHeight = jsonObj["canvasHeight"]
				let canvasWidth = jsonObj["canvasWidth"]

				for (let y_i = 0; y_i < canvasHeight; y_i++) {
					for (let x_i = 0; x_i < canvasWidth; x_i++) {
						if (
							store.selected_y + y_i >= store.canvasHeight ||
							store.selected_x + x_i >= store.canvasWidth
						) {
							continue
						}
						store.canvas[store.selected_y + y_i][
							store.selected_x + x_i
						].replace(jsonObj["canvas"][y_i][x_i])
					}
				}
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

		const fileList = event.target.files

		// Uploads will push to the file input's `.files` array. Get the last uploaded file.
		const latestUploadedFile = event.target.files.item(fileList.length - 1)

		try {
			const fileContents = LoadAndPlace.readUploadedFileAsText(
				latestUploadedFile
			)
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
				{"Place from file: "}
				<input type="file" name="myFile" onChange={this.uploadFile} />
			</div>
		)
	}
}
export default LoadAndPlace
