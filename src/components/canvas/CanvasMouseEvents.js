import { throttle } from "lodash"
import { observer } from "mobx-react"
import React from "react"
import eventstore from "../../models/EventStore"
import gridstore from "../../models/GridStore"

class CanvasMouseEvents extends React.Component {
	constructor(props) {
		super(props)

		// This binding is necessary to make `this` work in the callback
		this.handleClick = this.handleClick.bind(this)
		this.handleMouseMove = this.handleMouseMove.bind(this)
		this.handleMouseDown = this.handleMouseDown.bind(this)
		this.handleMouseUp = this.handleMouseUp.bind(this)
		this.handleMouseEnter = this.handleMouseEnter.bind(this)
		this.handleMouseLeave = this.handleMouseLeave.bind(this)
		this.handleRightClick = this.handleRightClick.bind(this)

		this.ref = React.createRef()

	}
	
	mousePos = throttle((e) => {

		let mouseX = Math.floor((e.clientX - this.ref.current.getBoundingClientRect().left) / gridstore.settings.zoom)
		let mouseY = Math.floor((e.clientY - this.ref.current.getBoundingClientRect().top) / gridstore.settings.zoom)

		return ({
			x: mouseX,
			y: mouseY
		})
	}, 16)

	handleClick(e) {
		e.preventDefault()
	}
	handleMouseMove(e) {
		e.preventDefault()
		eventstore.handleMouseMove(this.mousePos(e).x, this.mousePos(e).y)
	}
	handleMouseDown(e) {
		e.preventDefault()
		eventstore.handleMouseDown(this.mousePos(e).x, this.mousePos(e).y)
	}
	handleMouseUp(e) {
		e.preventDefault()
		eventstore.handleMouseUp(this.mousePos(e).x, this.mousePos(e).y)
	}
	handleMouseEnter(e) {
		e.preventDefault()
		eventstore.handleMouseEnter(e, this.mousePos(e).x, this.mousePos(e).y)
	}
	handleMouseLeave(e) {
		e.preventDefault()
		eventstore.handleMouseLeave(this.mousePos(e).x, this.mousePos(e).y)
	}
	handleRightClick(e) {
		e.preventDefault()
	}


	render() {
		return (			
			<div
				className="CanvasMouseEvents"
				style={{
					width: 100 + "%",
					height: 100 + "%",
					position: "absolute",
					top: 0,
					left: 0
				}}
				ref={this.ref}
				onMouseMove={this.handleMouseMove}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
				onClick={this.handleClick}
				onMouseDown={this.handleMouseDown}
				onMouseUp={this.handleMouseUp}
				onContextMenu={this.handleRightClick}
			/>
		)
	}
}

export default observer(CanvasMouseEvents)
