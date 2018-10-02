import React from "react"
import { render } from "react-dom"
import Canvas from "./components/Canvas"
import Settings from "./components/Settings"
//import DevTools from 'mobx-react-devtools';

render(
	<div className="flex_wrapper">
		<Canvas />
		<Settings />
		{
    	//<DevTools />
		}
	</div>,
	document.getElementById("root")
)
