import React, { Component } from "react"
import { observer } from "mobx-react"
import { observable, action } from "mobx"
import store from "../models/CanvasStore.js"
import { KEY_INTO_UNICODE } from "../utils/keyIntoUnicode"

class GlyphSelect extends Component {
	pageNumber = observable.box(0)
	selectedFont = observable("Tesserae 4x4 Basic")

	constructor(props) {
		super(props)

		this.state = {
			off: 0,
			font: [],
			num: 100,
			gid: 0,
			uncd: null,
			fontfile: "",
			pages_total: 0,
			inverted: false,
		}
	}
	componentDidMount() {
		this.go()
		store.selectedLayer = 0
		document.addEventListener("keydown", this.handleKeyPress, false)
	}
	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyPress, false)
	}

	go = () => {
		if (this.selectedFont == "Tesserae 4x4 Basic") {
			this.load("fonts/Tesserae4x4Basic.otf", this.fontLoaded)
		} else if (this.selectedFont == "Unscii") {
			this.load("fonts/unscii-16.ttf", this.fontLoaded)
		} else if (this.selectedFont == "MingLiU") {
			this.load("fonts/mingliu.TTF", this.fontLoaded)
		} else if (this.selectedFont == "Submona") {
			this.load("fonts/submona.ttf", this.fontLoaded)
		} else if (this.selectedFont == "RayMantaC64") {
			this.load("fonts/RayMantaC64-Regular.otf", this.fontLoaded)
		}

		this.node = document.body
		this.node.addEventListener("drop", this.onDrop, false)
		this.node.addEventListener("dragenter", this.cancel, false)
		this.node.addEventListener("dragleave", this.cancel, false)
		this.node.addEventListener("dragover", this.cancel, false)
	}
	load(path, resp) {
		let request = new XMLHttpRequest()
		request.open("GET", path, true)
		request.responseType = "arraybuffer"
		request.onload = function(e) {
			resp(e.target.response)
		}
		request.send()
	}
	cancel(e) {
		e.stopPropagation()
		e.preventDefault()
	}
	@action
	fontLoaded = resp => {
		this.setState({
			font: Typr.parse(resp),
		})
		this.setState({
			uncd: new Array(this.state.font.maxp.numGlyphs),
		})

		for (let i = 0; i < 100000; i++) {
			let gid = Typr.U.codeToGlyph(this.state.font, i)
			if (gid == 0) {
				continue
			}
			if (this.state.uncd[gid] == null) {
				this.state.uncd[gid] = [i]
			} else {
				this.state.uncd[gid].push(i)
			}
		}

		this.setState({
			gid: 0,
			off: 0,
			pages_total: Math.floor(this.glyphCnt() / this.state.num),
		})

		this.drawGlyphs()
		this.glyphToSVG()

		this.pageNumber.set(0)

		store.fontName = this.state.font.name.fullName
	}
	@action
	handleKeyPress = event => {
		if (store.typingMode && !store.disableShortcuts) {
			const handlers = {
				ArrowRight: store.goRight,
				ArrowLeft: store.goLeft,
				ArrowDown: store.goDown,
				ArrowUp: store.goUp,
				Backspace: store.backSpace,
				Escape: store.handleChangeTypingMode,
				Enter: store.enter,
				"§": store.insert,
			}
			const handler = handlers[event.key]

			if (event.key in handlers) {
				handler()
			}
			if (KEY_INTO_UNICODE[event.key] !== undefined) {
				let path = Typr.U.glyphToPath(
					this.state.font,
					Typr.U.codeToGlyph(
						this.state.font,
						KEY_INTO_UNICODE[event.key]
					)
				)
				let svgstring = Typr.U.pathToSVG(path)
				store.glyphPath = svgstring
				store.svgWidth = this.state.font.hhea.advanceWidthMax
				store.svgHeight =
					this.state.font.hhea.ascender +
					Math.abs(this.state.font.hhea.descender)
				store.svgBaseline = this.state.font.hhea.descender

				store.canvas[store.selected_y][store.selected_x][store.selectedLayer].replace(store.getSelectedGlyph())
				store.selected_x += 1

				if (store.selected_x == store.canvasWidth) {
					store.selected_x = 0
					if (store.selected_y < store.canvasHeight - 1) {
						store.selected_y += 1
					} else if (store.selected_y == store.canvasHeight) {
						store.selected_y -= 1
					}
				}
			}
			event.preventDefault()
		}
	}
	@action
	glyphToSVG = () => {
		let path = Typr.U.glyphToPath(this.state.font, this.state.gid)
		let svgstring = Typr.U.pathToSVG(path)
		store.glyphPath = svgstring
		store.svgWidth = this.state.font.hhea.advanceWidthMax
		store.svgHeight =
			this.state.font.hhea.ascender + Math.abs(this.state.font.hhea.descender)
		store.svgBaseline = this.state.font.hhea.descender
	}
	drawGlyphs = () => {
		let cont = document.getElementById("glyphcont")
		cont.innerHTML = ""
		let cnv = document.createElement("canvas")
		cnv.width = Math.floor(this.getDPR() * 40)
		cnv.height = Math.floor(this.getDPR() * 50) //scaleCnv(cnv);
		let ctx = cnv.getContext("2d")

		let lim = Math.min(this.state.off + this.state.num, this.glyphCnt())
		let scale = (32 * this.getDPR()) / this.state.font.head.unitsPerEm


		for (let i = this.state.off; i < lim; i++) {
			let path = Typr.U.glyphToPath(this.state.font, i)

			cnv.width = cnv.width
			ctx.translate(5 * this.getDPR(), Math.round(30 * this.getDPR()))

			if ( this.selectedFont == "TTesserae 4x4 Basic") {
				ctx.fillStyle = "#f5f5f5"
				ctx.fillRect(
					0,
					Math.round(-25.7 * this.getDPR()),
					Math.round(25.7 * this.getDPR()),
					Math.round(25.7 * this.getDPR())
				)
			}

			if (this.state.inverted) {
				ctx.fillStyle = "black"
				ctx.fillRect(
					0,
					Math.round(-25 * this.getDPR()),
					Math.round(25 * this.getDPR()),
					Math.round(25 * this.getDPR())
				)
			}

			ctx.fillStyle = "black"
			ctx.font = "16px monospace"
			ctx.fillText(i+1, 0, 16)

			ctx.scale(scale, -scale)
			Typr.U.pathToContext(path, ctx)

			if (this.state.inverted) {
				ctx.fillStyle = "#f5f5f5"
			} else {
				ctx.fillStyle = "black"
			}
			ctx.fill()

			let img = document.createElement("img")
			img.setAttribute(
				"style",
				"width:" +
					cnv.width / this.getDPR() +
					"px; height:" +
					cnv.height / this.getDPR() +
					"px"
			)
			img.gid = i
			img.onclick = this.glyphClick
			img.src = cnv.toDataURL()
			cont.appendChild(img)
		}
	}

	onDrop = e => {
		this.cancel(e)
		let fontLoaded = this.fontLoaded
		let r = new FileReader()
		let r64 = new FileReader()
		let file = e.dataTransfer.files[0]
		r.onload = function(e) {
			fontLoaded(e.target.result)
		}
		r.onloadend = function(e) {
			r64.readAsDataURL(file)
			r64.onloadend = function(e) {
				let base64result = r64.result.split(",")[1]
			}
		}
		r.readAsArrayBuffer(file)
	}

	glyphClick = e => {
		this.setState({ gid: e.target.gid })
		this.glyphToSVG()
	}
	getDPR() {
		return window["devicePixelRatio"] || 1
	}
	glyphCnt = () => {
		return this.state.font.maxp.numGlyphs
	}
	@action
	drawNext = () => {
		if (this.pageNumber.get() < this.state.pages_total) {
			this.updatePageNum(this.pageNumber.get() + 1)
		}
	}
	@action
	drawPrev = () => {
		if (this.pageNumber.get() > 0) {
			this.updatePageNum(this.pageNumber.get() - 1)
		}
	}
	@action
	updatePageNum = value => {
		this.pageNumber.set(value)

		if (value === "") {
			return
		}

		if (this.pageNumber.get() > this.state.pages_total) {
			this.pageNumber.set(this.state.pages_total)
		}
		if (isNaN(value)) {
			return
		}

		this.state.off = this.pageNumber * this.state.num
		this.drawGlyphs()
	}
	handleFontSelectChange = value => {
		this.selectedFont = value
		this.go()
	}
	handleChangeInvert = () => {
		this.state.inverted = !this.state.inverted
		this.drawGlyphs()
	}
	render() {
		return (
			<div className="glyphs">
				<h3>Glyph selection</h3>
				Select a preset font:
				<select
					value={this.selectedFont}
					onChange={evt => this.handleFontSelectChange(evt.target.value)}
				>
					<option value="Tesserae 4x4 Basic">Tesserae 4x4 Basic</option>
					<option value="RayMantaC64">RayMantaC64 (Custom PETSCII)</option>
					<option value="Unscii">Unscii</option>
					<option value="MingLiU">MingLiU (Taiwanese ANSI)</option>
					<option value="Submona">Submona (Swift_JIS)</option>
				</select>
				<br />
				<br />
				<button type="button" onClick={() => this.drawPrev()}>
					Previous
				</button>
				<button type="button" onClick={() => this.drawNext()}>
					Next
				</button>
				<div className="page_selection">
					Select page:
					<input
						id="page_select_input"
						type="number"
						min="1"
						max={this.state.pages_total + 1}
						value={
							this.pageNumber.get() === "" ? "" : this.pageNumber.get() + 1
						}
						onFocus={() => store.toggleWriting()}
						onBlur={() => store.toggleWriting()}
						onChange={evt => {
							if (evt.target.value === "") {
								this.pageNumber.set("")
								return
							}

							const parsedValue = parseInt(evt.target.value, 10)
							if (isNaN(parsedValue)) {
								this.updatePageNum(0)
								return
							}

							this.updatePageNum(Math.max(0, parsedValue - 1))
						}}
					/>
					/{this.state.pages_total + 1}
					{" Invert:"}
					<input
						id="invertGlyphSelection"
						type="checkbox"
						value={this.state.inverted}
						onChange={this.handleChangeInvert}
					/>
				</div>
				<div id="glyphcont" />
				<button type="button" onClick={() => this.drawPrev()}>
					Previous
				</button>
				<button type="button" onClick={() => this.drawNext()}>
					Next
				</button>
			</div>
		)
	}
}
export default observer(GlyphSelect)
