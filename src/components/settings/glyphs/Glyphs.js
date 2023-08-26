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
    this.set({
      width: 800,
      height: 800,
      objectCaching: false,
      selectable: false,
      hasControls: false,
      fill: '#ddd',
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
      ...options
    });
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
      fontName: fontObject.name
    });
    glyphPath.scaleToWidth(fontObject.size, true);
    glyphPath.scaleToHeight(fontObject.size, true);
    canvas.add(glyphPath);
  }
  canvas.selection = false;
  canvas.setHeight(Math.floor(fontObject.data.nGlyphs / GRIDWIDTH) * fontObject.size + fontObject.size + Math.floor(fontObject.data.nGlyphs / GRIDWIDTH) * 2);
  canvas.setWidth(GRIDWIDTH * fontObject.size + GRIDWIDTH * 2 - 1);
}

const Glyphs = ({ fontObject }) => {
  const canvasEl = useRef(null);

  useEffect(() => {
    const options = {
      renderOnAddRemove: false
    };
    const canvas = new fabric.Canvas(canvasEl.current, options);
    drawFont(canvas, fontObject);

    return () => {
      canvas.dispose();
    }
  }, [fontObject]);

return (
    <section>
      <h3>{fontObject.name}</h3>
      {FontStore.loadedFonts.length > 1 &&
        <button className="removeFont" onClick={() => FontStore.removeFont(fontObject.name)}>remove</button>
      }
      <div className='glyphsList-container'>
        <canvas ref={canvasEl}/>
        <GlyphsMouseEvents fontName={fontObject.name} />
      </div>
      <details>
        <summary>Details</summary>
        <DisplayNames names={fontObject.data.names} />
      </details>
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

const DisplayNames = memo(({ names }) => (
  <dl>
    <dt>License:</dt>
    <dd>{names?.copyright?.en || " "}</dd>
    <dt>Designer:</dt>
    {names?.designerURL?.en ? (
        <dd>
          <a href={names.designerURL.en} target="_blank" rel="noreferrer nooppener">
            {names?.designer?.en || " "}
          </a>
        </dd>
    ) : (
        <dd>{names?.designer?.en || " "}</dd>
    )}
  </dl>
));
