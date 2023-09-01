// CanvasSizeInMillimeters.js
import { useState, useMemo } from 'react';
import { observer } from 'mobx-react';

import { pxToMm } from '../../../utils/pxToMm';
import store from "../../../models/CanvasStore.js";

/**
 * Component to display canvas size in millimeters.
 */ 
const CanvasSizeInMillimeters = () => {

  const [dpi, setDpi] = useState(72);

  const handleDpiChange = (event) => {
    setDpi(Number(event.target.value));
  };

  const canvasWidthInMm = () => {
    return pxToMm(store.cellWidth * store.canvasWidth, dpi);
  };

  const canvasHeightInMm = () => {
    return pxToMm(store.cellHeight * store.canvasHeight, dpi);
  }

  return (
    <section data-tooltip="Resize Helper: Calculate drawing dimensions in millimeters to match specific physical formats using chosen DPI">
			<h3>Resize helper</h3>
			At
			<input
				type="number"
				value={dpi}
				onChange={handleDpiChange}
				size="6"
			/>
			DPI: <span data-tooltip="Width">{canvasWidthInMm()}&thinsp;mm</span> &times; <span data-tooltip="Height">{canvasHeightInMm()}&thinsp;mm</span>  
    </section>
  );
};

export default observer(CanvasSizeInMillimeters);