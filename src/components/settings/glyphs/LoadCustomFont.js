import { observer } from "mobx-react";
import FontStore from "../../../models/FontStore";

export const LoadCustomFont = observer(() => {
  
  const dropHandler = (e) => {  
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
  
    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...e.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          //If files are not font files, reject them
          if(file.type !== "font/otf" && file.type !== "font/ttf") {
            return
          }
          FontStore.loadFontFromFile(file)
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...e.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  }  
  
  return (
    <section data-tooltip="Add Your Own Fonts: Click, hold, and move font files (.OTF or .TTF) from your computer into this area to import them">
      <h3>Add custom font</h3>
      <div
        className="dropZone"
        onDragOver={e => { e.preventDefault();}}
        onDrop={e => dropHandler(e)}
      >
        Drag & drop .OTF or .TTF files here
      </div>
    </section>
  );
})