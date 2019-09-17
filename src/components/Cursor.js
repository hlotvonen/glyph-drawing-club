import React, {useRef} from "react"
import { observer } from "mobx-react"

const Cursor = ({x, y, w, h}) => (
	<div
	className="cursor"
	style={{
		boxShadow: `inset 0 0 0 1px red`,
		zIndex: 1000,
			pointerEvents: "none",
			width: w,
			height: h,
			transform: `translate(${x * w}px, ${y * h}px)`
		}}
	/>
)

export default observer(Cursor)