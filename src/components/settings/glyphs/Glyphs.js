import * as fabric from 'fabric'; // v6
import { observer } from 'mobx-react';
import { memo, useEffect, useRef } from 'react';
import FontStore from '../../../models/FontStore';
import { GlyphsMouseEvents } from "./GlyphsMouseEvents";
import { LoadCustomFont } from './LoadCustomFont';
import { LoadDefaultFont } from './LoadDefaultFont';

const GRIDWIDTH = 16;

const indexToXY = (index, gridWidth) => {
  return {
    x: index % gridWidth,
    y: Math.floor(index / gridWidth),
  };
};

const Glyph = class extends fabric.Rect {
  constructor(options) {
    super(options);
    const def = {
      width: 800,
      height: 800,
      objectCaching: false,
      selectable: false,
      hasControls: false,
      borderColor: "red",
      fill: "white",
      hasRotatingPoint: false,
      lockMovementX: true,
      lockMovementY: true,
      lockScalingFlip: true,
      lockRotation: true,
      lockScalingX: true,
      lockScalingY: true,
      lockSkewingX: true,
      lockSkewingY: true,
      hoverCursor: "pointer",
      flipY: true,
    }
    Object.assign(this, def, options)
  }

  _render(ctx) {
    super._render(ctx);
    const pathData = new Path2D(this.path);
    ctx.translate(-this.width/2, -this.height/2);
    ctx.clip();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#333";
    ctx.strokeRect(0, 0, this.width, this.height);
    ctx.fillStyle = '#333';
    ctx.fill(pathData);
  }
};

function drawFont(canvas, fontObject) {
  for (const [key, value] of Object.entries(fontObject.data.glyphs.glyphs)) {
    const colPadding = key % GRIDWIDTH * 2
    const rowPadding = Math.floor(key / GRIDWIDTH) * 2
    const glyphPath = new Glyph({
      path: value.path.toPathData(8),
      left: indexToXY(value.index, GRIDWIDTH).x * fontObject.size + colPadding,
      top: indexToXY(value.index, GRIDWIDTH).y * fontObject.size + rowPadding,
    });
    glyphPath.scaleToWidth(fontObject.size, true);
    glyphPath.scaleToHeight(fontObject.size, true);
    canvas.add(glyphPath);
  }
  canvas.selection = false;
  canvas.setHeight(Math.floor(fontObject.data.nGlyphs / GRIDWIDTH) * fontObject.size + fontObject.size + Math.floor(fontObject.data.nGlyphs / GRIDWIDTH) * 2);
  canvas.setWidth(GRIDWIDTH * fontObject.size + GRIDWIDTH * 2);
}

const Glyphs = (props) => {
  const canvasEl = useRef(null);
  useEffect(() => {
    const options = {
      renderOnAddRemove: false
    };
    const canvas = new fabric.Canvas(canvasEl.current, options);
    // make the fabric.Canvas instance available to your app
    drawFont(canvas, props.fontObject);
    return () => {
      drawFont(null);
      canvas.dispose();
    }
  }, []);

  return (
    <section>
      <h3>{props.fontObject.name}</h3>
      <details>
        <summary>
          Details
        </summary>
        <DisplayNames names={props.fontObject.data.names} />
      </details>
      <div className='glyphsList-container'>
        <canvas ref={canvasEl}/>
        <GlyphsMouseEvents fontName={props.fontObject.name} />
      </div>
    </section>
  );
};

export const Font = observer(() => {

  if (!FontStore.hasLoadedFonts) {
    return <span>loading fonts...</span>
  }

  return (
    <>
      {
        FontStore.loadedFonts.map((fontObject,i) => { 
					return (
						<Glyphs
							key={`item-${i}`}
							index={i}
							fontObject={fontObject}
						/>
					)
				})
      }
      <LoadDefaultFont />
      <LoadCustomFont/>
    </>
  )
});

const DisplayNames = memo((props) => {
  return( 
    <>
      <div>
        License: {props.names?.copyright?.en ? props.names.copyright.en : " "}
      </div>
      <div>
        Designer:
        <a href={props.names?.designerURL?.en ? props.names.designerURL.en : ""} target="_blank" rel="noreferrer nooppener">
          {props.names?.designer?.en ? props.names.designer.en : " "}
        </a>
      </div>
    </>
  )
});