import React from "react"
import { render } from "react-dom"
import Canvas from "./components/Canvas"
import Settings from "./components/Settings"
import Preview from "./components/Preview"
import ErrorBoundary from "./components/ErrorBoundary"

render(
	<div className="flex_wrapper">
		<ErrorBoundary>
			<Canvas />
			<Settings />
			<Preview />
		</ErrorBoundary>
	</div>,
	document.getElementById("root")
)
