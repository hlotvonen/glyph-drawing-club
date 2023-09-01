import { useState } from 'react';
import { observer } from 'mobx-react';

import { exportAs } from '../../../utils/Export';
import store from '../../../models/CanvasStore';

const ExportCanvas = () => {
  const [exportSize, setExportSize] = useState(store.exportSizeMultiplier);

  const handleExportSizeChange = (event) => {
    setExportSize(Number(event.target.value));
  };

  const handlePngExport = (e) => {
    e.preventDefault();
    exportAs('png');
  };

  const handleSvgExport = (e) => {
    e.preventDefault();
    exportAs('svg');
  };

  return (
    <section>
      <h3>Export As</h3>

      <form data-tooltip="Export as PNG: Save the drawing as an image">
        <button onClick={e => handlePngExport(e)}>Export PNG</button>

        <label>
          Size:
          <input 
            type="number"
            min="1"
            max="25"
            value={exportSize}
            onChange={e => handleExportSizeChange(e)}
			      size="5"
          />
        </label>

        ({store.cellWidth * store.canvasWidth * exportSize} &times; {store.cellHeight * store.canvasHeight * exportSize} px)
      </form>

      <form data-tooltip="Export as SVG: Save the drawing in scalable vector graphics format for further editing">
        <button onClick={handleSvgExport}>Export SVG</button>

        <a
          href="https://blog.glyphdrawing.club/how-to-clean-up-your-glyph-drawing-in-adobe-illustrator/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Read how to clean up SVG files
        </a>
      </form>
    </section>
  );
};

export default observer(ExportCanvas);