
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

	const mousePosToIndex = (posX, posY) => posX + (posY * 16);

	function handleClick(e) {
		e.preventDefault()
	}
	const handleMouseMove = action((e) => {
		e.preventDefault();
		mousePos.x = getMousePos(e).x;
		mousePos.y = getMousePos(e).y;
	})

	const handleMouseDown = (e) => {
	  e.preventDefault();
	  const { x, y } = getMousePos(e);
	  const glyphIndex = mousePosToIndex(Math.floor(x / 22), Math.floor(y / 22));
	  const glyphCount = FontStore.getGlyphCount(props.fontName);
	
	  if (glyphIndex < glyphCount) {
	    FontStore.selectGlyph({
	      fontName: props.fontName,
	      index: glyphIndex,
	    });
	  }
	};
	function handleMouseUp(e) {
		e.preventDefault()
	}
  const handleMouseEnter = () => setShow(true);
  const handleMouseLeave = () => setShow(false);

	function handleRightClick(e) {
		e.preventDefault()
	}

	const Tooltip = observer(() => {
		const glyphCount = FontStore.getGlyphCount(props.fontName);
		const currentGlyphIndex = mousePosToIndex(Math.floor(mousePos.x / 22), Math.floor(mousePos.y / 22));

		return (
			<>
				{show && currentGlyphIndex < glyphCount && (
					<div
						className="tooltip"
						style={{
							width: "20px",
							height: "20px",
							position: "absolute",
							boxShadow: "0 0 0 1px red",
							pointerEvents: "none",
							left: Math.floor(mousePos.x / 22) * 22,
							top: Math.floor(mousePos.y / 22) * 22
						}}
					>
						<div className="tooltiptext">
							{currentGlyphIndex}
						</div>
					</div>
				)}
			</>
		);
	});

	const SelectedGlyph = observer(() => {
		const { index } = FontStore.selectedGlyph;
		return (
			<div
				className="selected-glyph"
				style={{
					width: "20px",
					height: "20px",
					position: "absolute",
					pointerEvents: "none",
					boxShadow: "0 0 0 2px blue",
					left: Math.floor(index % 16) * 22,
					top: Math.floor(index / 16) * 22
				}}
			/>
		);
	});

	return (
		<>
			<div
				className="GlyphsMouseEvents"
				style={{
					width: "100%",
					height: "100%",
					position: "absolute",
					top: 0,
					left: 0
				}}
				ref={ref}
				onMouseMove={handleMouseMove}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleClick}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onContextMenu={handleRightClick}
			/>
			<Tooltip/>
			<SelectedGlyph/>
		</>
	)
});
