import { observer } from 'mobx-react';
import { action } from 'mobx';

import { saveAs, saveSelectionAs } from '../../../utils/SaveAs';
import store from '../../../models/CanvasStore';

const SaveCanvas = () => {
  const handleFileNameChange = action((event) => {
    store.fileName = event.target.value;
  });

  const handleSaveClick = (e) => {
    e.preventDefault();
    saveAs(store.fileName, 'canvasStorage', 'gdc');
  };

  const handleSelectionSaveClick = (e) => {
    e.preventDefault();
    saveSelectionAs();
  };

  return (
    <section>
    <h3>Save your artwork</h3>
    <form>
			<label htmlFor="fileName">Filename:</label>
      <input
				id="fileName"
        type="text" 
        value={store.fileName}
        onChange={handleFileNameChange}
        onFocus={() => store.toggleWriting(true)}
        onBlur={() => store.toggleWriting(false)} 
				size="10"
      />

      <button onClick={(e) => handleSaveClick(e)} data-tooltip="Save Drawing: Store your artwork as a file for future loading and editing">Save file</button>

      <button 
        onClick={(e) => handleSelectionSaveClick(e)}
        disabled={!store.selectionArea.start}
        data-tooltip="Save Area: Store the selected area as a file for future loading and editing"
      >
        Save selection
      </button>
    </form>
    </section>
  );
};

export default observer(SaveCanvas);