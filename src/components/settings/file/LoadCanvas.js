import { useState } from 'react';
import { action } from 'mobx';
import store from '../../../models/CanvasStore';

function LoadCanvas() {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (event, func) => {
    setIsLoading(true);

    const file = event.target.files[0];

    // Check file extension
    if(!file.name.endsWith('.gdc')) {
      alert('Only .gdc files can be loaded');
      return; 
    }

    try {
      const text = await readFileAsText(file);
      const json = JSON.parse(text);

      // Load or place canvas
      if(func === "loadCanvas") {
        store.loadCanvas(json);
      }
      if(func === "placeCanvas") {
        store.placeCanvas(json)
      }

      // Clear file input value 
      // so same file can be loaded again
      event.target.value = null; 
    } catch (error) {
      console.error(error);
      alert('Error loading file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <h3>Load previous artwork</h3>
      <form data-tooltip="Load File: Open a previously saved drawing for further editing or viewing">
        <label htmlFor="loadFileInput">Load from file</label>

        <input 
          id="loadFileInput"
          type="file" 
          onChange={(event) => handleFileSelect(event, "loadCanvas")} 
          disabled={isLoading}
        />
        {isLoading && <span>Loading...</span>}
      </form>
      <form data-tooltip="Place Drawing: Place a new image onto the existing artwork at the cursor position">
        <label htmlFor="placeCanvas">Place from file</label>
        <input 
          id="placeCanvas"
          type="file" 
          onChange={(event) => handleFileSelect(event, "placeCanvas")} 
          disabled={isLoading}
        />
        {isLoading && <span>Loading...</span>}
      </form>
    </section>
  );
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = action(() => {
      resolve(reader.result);
    });

    reader.onerror = reject;

    reader.readAsText(file);
  });
}

export default LoadCanvas;