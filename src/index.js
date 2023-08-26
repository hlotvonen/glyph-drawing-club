import { render } from "react-dom"
import Canvas from "./components/canvas/Canvas"
import Preview from "./components/canvas/ui/Preview"
import ErrorBoundary from "./components/ErrorBoundary"
import Fullscreen from "./components/Fullscreen"
import Settings from "./components/settings/Settings"
import "./styles/styles.css"

render(
	<div className="mainContainer">
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
