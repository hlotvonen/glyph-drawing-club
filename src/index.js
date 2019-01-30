import React from "react"
import { render } from "react-dom"
import Canvas from "./components/Canvas"
import Settings from "./components/Settings"
import Preview from "./components/Preview"

render(
	<div className="flex_wrapper">
		<Canvas />
		<Settings />
		<Preview />
	</div>,
	document.getElementById("root")
)
