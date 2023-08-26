import { throttle } from "lodash";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { useRef, useState } from 'react';
import FontStore from "../../../models/FontStore";

export const GlyphsMouseEvents = observer((props) => {

  const ref = useRef(null);
	const [show, setShow] = useState(false)
	let mousePos = observable({x:0,y:0});

	const getMousePos = throttle((e) => {
		let mouseX = Math.round((e.clientX - ref.current.getBoundingClientRect().left))
		let mouseY = Math.round((e.clientY - ref.current.getBoundingClientRect().top))
		return ({
			x: mouseX,
			y: mouseY
		})
	}, 16)

	const mousePosToIndex = (posX, posY) => {		
		const index = posX + (posY * 16)
		return index
	}

	function handleClick(e) {
		e.preventDefault()
	}
	const handleMouseMove = action((e) => {
		e.preventDefault();
		mousePos.x = getMousePos(e).x;
		mousePos.y = getMousePos(e).y;
	})
	
	function handleMouseDown(e) {
		e.preventDefault()
		FontStore.selectGlyph({
			fontName: props.fontName,
			index: mousePosToIndex(Math.floor(getMousePos(e).x / 22), Math.floor(getMousePos(e).y / 22))
		})
	}
	function handleMouseUp(e) {
		e.preventDefault()
	}
	const handleMouseEnter = action((e) => {
		e.preventDefault()
		setShow(true);
	})
	const handleMouseLeave = action((e) => {
		e.preventDefault()
		setShow(false);
	})

	function handleRightClick(e) {
		e.preventDefault()
	}

	const Tooltip = observer(() => (
		<> 
			{
			show && 
			<div 
				className="tooltip"
				style={{
					width: "20px",
					height: "20px",
					position: "absolute",
					boxShadow: "0 0 0 1px red",
					left: Math.floor(mousePos.x / 22) * 22,
					top: Math.floor(mousePos.y / 22) * 22
				}}
			>
				<div
					className="tooltiptext"
				>
					{mousePosToIndex(Math.floor(mousePos.x / 22), Math.floor(mousePos.y / 22))}
				</div>
			</div>
			}
		</>
	));

	return (			
		<>
			<div
				className="GlyphsMouseEvents"
				style={{
					width: 100 + "%",
					height: 100 + "%",
					position: "absolute",
					top: 0,
					left: 0
				}}
				ref={ref}
				onMouseMove={(e) => handleMouseMove(e)}
				onMouseEnter={(e) => handleMouseEnter(e)}
				onMouseLeave={(e) => handleMouseLeave(e)}
				onClick={(e) => handleClick(e)}
				onMouseDown={(e) => handleMouseDown(e)}
				onMouseUp={(e) => handleMouseUp(e)}
				onContextMenu={(e) => handleRightClick(e)}
			/>
			<Tooltip/>
		</>
	)
})