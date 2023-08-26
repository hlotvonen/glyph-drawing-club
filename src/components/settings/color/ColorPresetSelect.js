import { action } from "mobx"
import { observer } from "mobx-react"
import React from "react"
import store from "../../../models/CanvasStore.js"
import colorstore from "../../../models/ColorStore"
import { saveAsString } from "../../../utils/SaveAs"


class ColorPresetSelect extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			lospecurl: "",
			waitingForFileUpload: false,
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
		this.handleSave = this.handleSave.bind(this)

	}

	handleChange(event) {
		this.setState({lospecurl: event.target.value})
	}

	handleAdd(event) {
		colorstore.fetchLospecPalette(this.state.lospecurl)
		event.preventDefault()
	}

	@action
	handleSave(event) {
		colorstore.palettes[colorstore.selectedPaletteIndex].name = colorstore.paletteName
		colorstore.palettes[colorstore.selectedPaletteIndex].author = colorstore.paletteAuthor
		saveAsString(colorstore.paletteName + " palette", JSON.stringify(colorstore.palettes[colorstore.selectedPaletteIndex]), "json")
		event.preventDefault()
	}

	static readUploadedFileAsText = inputFile => {
		const temporaryFileReader = new FileReader()

		return new Promise((resolve, reject) => {
			temporaryFileReader.onerror = () => {
				temporaryFileReader.abort()
				alert("Problem parsing input file.")
				reject(new DOMException("Problem parsing input file."))
			}

			temporaryFileReader.onload = () => {
				resolve(temporaryFileReader.result)
				const jsonObj = JSON.parse(temporaryFileReader.result)

				colorstore.addPalette(jsonObj)
			}
			temporaryFileReader.readAsText(inputFile)
		})
	}
	//WIP make this into await / async
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
			const fileContents = ColorPresetSelect.readUploadedFileAsText(latestUploadedFile)
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
			<>
				<section>
					<h3>SAVE PALETTE</h3>
					<form onSubmit={this.handleSave}>
						<label>
							Name:
							<input
								type="text"
								name="paletteName"
								value={colorstore.paletteName}
								onChange={(evt) => colorstore.handleChangePaletteName(evt)}
								onFocus={() => store.toggleWriting(true)}
          			onBlur={() => store.toggleWriting(false)}
								disabled={colorstore.palettes[colorstore.selectedPaletteIndex].name == "" || colorstore.palettes[colorstore.selectedPaletteIndex].name == "Empty" ? false : true}
							/>
						</label>
						<label>
							Author:
							<input
								type="text"
								name="paletteAuthor"
								value={colorstore.paletteAuthor}
								onChange={(evt) => colorstore.handleChangePaletteAuthor(evt)}
								onFocus={() => store.toggleWriting(true)}
          			onBlur={() => store.toggleWriting(false)}
								disabled={colorstore.palettes[colorstore.selectedPaletteIndex].author == "" ? false : true}
							/>
						</label>
						<input type="submit" value="Save palette" />
						
					</form>
				</section>
				
				<section>
					<h3>LOAD PALETTE</h3>
					<div>
						Load from file:
						<input type="file" name="myFile" onChange={this.uploadFile} />
					</div>
					
					<div>
						Paste URL from <a href="https://lospec.com/palette-list" target="_blank" rel="noopener noreferrer">Lospec</a>:
						<form onSubmit={this.handleAdd} className={"flex"}>
							<label>
								<input
									placeholder={"https://lospec.com/palette-list/palette-name"}
									type="text"
									value={this.state.lospecurl}
									onChange={this.handleChange}
									onFocus={() => store.toggleWriting(true)}
          				onBlur={() => store.toggleWriting(false)}
								/>
							</label>
							<input type="submit" value="Add" />
						</form>
					</div>
					<div>
						Select from preset:
						<select
							value={colorstore.selectedPresetPalette}
							onChange={e => colorstore.handlePresetSelectChange(e.target.value)}
						>
							<option value="0">Deluxe Paint</option>
							<option value="2">AtariST (Reduced To 256)</option>
							<option value="3">Eclipse icon 256</option>
							<option value="4">Fornax Void Official Palette No.1</option>
							<option value="5">DOOM</option>
							<option value="6">Riso Blue, Yellow, FluoroPink (Preview)</option>
							<option value="7">Riso Blue, Yellow, FluoroPink (Blue Plate)</option>
							<option value="8">
								Riso Blue, Yellow, FluoroPink (FluoroPink Plate)
							</option>
							<option value="9">
								Riso Blue, Yellow, FluoroPink (Yellow Plate)
							</option>
							<option value="10">Riso FluoroPink and Teal (Preview)</option>
							<option value="11">
								Riso FluoroPink and Teal (FluoroPink Plate)
							</option>
							<option value="12">Riso FluoroPink and Teal (Teal Plate)</option>
							<option value="13">Liero Level Palette</option>
						</select>
						<button type="button" onClick={() => colorstore.addPalettePreset(colorstore.selectedPresetPalette)}>
							Add
						</button>
					</div>
					<button type="button" onClick={() => colorstore.addPalettePreset(1)}>Add empty palette</button>
				</section>
			</>
		)
	}
}

export default observer(ColorPresetSelect)
