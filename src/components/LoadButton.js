import React from "react";
import store from "../models/CanvasStore";
import { action } from "mobx";

class LoadButton extends React.Component {
  state = {
    waitingForFileUpload: false
  };

  static readUploadedFileAsText = inputFile => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
        const jsonObj = JSON.parse(temporaryFileReader.result);
        store.canvasHeight = jsonObj["canvasHeight"];
        store.canvasWidth = jsonObj["canvasWidth"];
        store.cellWidth = jsonObj["cellWidth"];
        store.cellHeight = jsonObj["cellHeight"];
        store.defaultFontSize = jsonObj["defaultFontSize"];
        store.canvas = jsonObj["canvas"];
        store.widthPixels = jsonObj["widthPixels"];
        store.heightPixels = jsonObj["heightPixels"];
      };
      temporaryFileReader.readAsText(inputFile);
    });
  };
  //WIP make this into await / async
  @action
  uploadFile = event => {
    event.persist();

    if (!event.target || !event.target.files) {
      return;
    }

    this.setState({ waitingForFileUpload: true });

    const fileList = event.target.files;

    // Uploads will push to the file input's `.files` array. Get the last uploaded file.
    const latestUploadedFile = event.target.files.item(fileList.length - 1);

    try {
      const fileContents = LoadButton.readUploadedFileAsText(
        latestUploadedFile
      );
      this.setState({
        waitingForFileUpload: false
      });
    } catch (e) {
      console.log(e);
      this.setState({
        waitingForFileUpload: false
      });
    }
  };

  render() {
    return (
      <div>
        {"Load from file: "}
        <input type="file" name="myFile" onChange={this.uploadFile} />
      </div>
    );
  }
}
export default LoadButton;
