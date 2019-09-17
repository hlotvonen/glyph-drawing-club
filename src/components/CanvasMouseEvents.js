import React, { useState }  from "react"
import store from "../models/CanvasStore"

export const CanvasMouseEvents = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    const getMousePos = e => {
        if(Math.floor(e.nativeEvent.offsetX / store.cellWidth) !== position.x || Math.floor(e.nativeEvent.offsetY / store.cellHeight) !== position.y) {
            setPosition({ 
                x: clamp(Math.floor(e.nativeEvent.offsetX / store.cellWidth), 0, store.canvasWidth-1), 
                y: clamp(Math.floor(e.nativeEvent.offsetY / store.cellHeight), 0, store.canvasHeight-1)
            })
        }
        store.handlePaintEvents(position.x, position.y)
    }
    const handleMouseOver = e => {
        setPosition({ 
            x: clamp(Math.floor(e.nativeEvent.offsetX / store.cellWidth), 0, store.canvasWidth-1), 
            y: clamp(Math.floor(e.nativeEvent.offsetY / store.cellHeight), 0, store.canvasHeight-1)
        })
    }
    const handleOnClick = e => {
        e.preventDefault()
        if ( event.which ) store.mouseDown = true
        store.clickSelection(position.x, position.y)
        if ( event.which ) store.mouseDown = false
    }

    document.addEventListener('mousedown', function(event) { 
        if ( event.which ) store.mouseDown = true
    }, true);
    
    document.addEventListener('mouseup', function(event) { 
        if ( event.which ) store.mouseDown = false
    }, true);

    return (
        <div 
            className="CanvasMouseEvents" 
            style={{width:100 + '%', height:100 + '%', position:'relative'}} 
            onMouseMove={e => getMousePos(e)}
            onClick={e => handleOnClick(e)}
            onMouseOver={e => handleMouseOver(e)}
        />
    )
}