import React from "react"
import { render } from "react-dom"
import Canvas from "./components/canvas/Canvas"
import Settings from "./components/settings/Settings"
import Preview from "./components/canvas/ui/Preview"
import ErrorBoundary from "./components/ErrorBoundary"
import Fullscreen from "./components/Fullscreen"
import "./styles/styles.css"

render(
	<div className="flex flex-col w-full h-full">
		<ErrorBoundary>
			<Fullscreen>
				<Canvas />
				<Settings />
				<Preview />
			</Fullscreen>
		</ErrorBoundary>
	</div>,
	document.getElementById("root")
)
