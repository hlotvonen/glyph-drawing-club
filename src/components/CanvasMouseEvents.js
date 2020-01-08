import React, { useState } from "react"
import store from "../models/CanvasStore"
import colorstore from "../models/ColorStore"
import { action, toJS } from "mobx"

export const CanvasMouseEvents = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 })

	function clamp(value, min, max) {
		return Math.min(Math.max(value, min), max)
    }
    
	const makeSelection = () => {
		//shift + s
		if (store.selectionArea.start && !store.selectionArea.end) {
			const [selectionStart, selectionEnd] = store.getSelectedArea()
			store.selectionArea.start = selectionStart
			store.selectionArea.end = selectionEnd
		} else {
			store.selectionArea.start = [position.y, position.x]
			store.selectionArea.end = null
		}
    }
    
	const handleMouseMove = action(e => {
        e.preventDefault()
		setPosition({
			x: clamp(
				Math.floor(e.nativeEvent.offsetX / store.cellWidth),
				0,
				store.canvasWidth - 1
			),
			y: clamp(
				Math.floor(e.nativeEvent.offsetY / store.cellHeight),
				0,
				store.canvasHeight - 1
			),
		})

		store.handlePaintEvents(position.x, position.y)

		if (store.mouseDown === true && store.shiftDown === true) {
            makeSelection()
		}
	})

	const handleMouseDown = action(e => {
		e.preventDefault()
		store.clickSelection(position.x, position.y)
		if (
			store.paintMode ||
			colorstore.coloringModeFg ||
			colorstore.coloringModeBg
		) {
			store.paintLayer()
		}
	})

	const handleMouseOver = e => {
		setPosition({
			x: clamp(
				Math.floor(e.nativeEvent.offsetX / store.cellWidth),
				0,
				store.canvasWidth - 1
			),
			y: clamp(
				Math.floor(e.nativeEvent.offsetY / store.cellHeight),
				0,
				store.canvasHeight - 1
			),
		})
	}

	document.addEventListener(
		"mousedown",
		function(event) {
			if (event.which) store.mouseDown = true
		},
		true
	)

	document.addEventListener(
		"mouseup",
		function(event) {
			if (event.which) store.mouseDown = false
		},
		true
	)

	return (
		<div
			className="CanvasMouseEvents"
			style={{ width: 100 + "%", height: 100 + "%", position: "absolute" }}
			onMouseMove={e => handleMouseMove(e)}
			onMouseOver={e => handleMouseOver(e)}
			onMouseDown={e => handleMouseDown(e)}
		/>
	)
}
