import { observer } from "mobx-react"
import React from "react"
import eventstore from "../../models/EventStore"


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
	
	mousePos(e) {
		return ({
			x: e.pageX - this.ref.current.getBoundingClientRect().left,
			y: e.pageY - this.ref.current.getBoundingClientRect().top
		})
	}

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
