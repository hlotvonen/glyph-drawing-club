import React from "react";
import { saveToDropbox } from "../utils/saveToDropbox";
import store from "../models/CanvasStore";

class SaveToDropboxButton extends React.Component {
  render() {
    return (
      <div className="saveToDropbox">
        <div>
          Full name or nickname:
          <input
            type="text"
            name="name"
            value={this.props.userFullName}
            onChange={this.props.updateFullName}
            onFocus={() => store.toggleWriting()}
            onBlur={() => store.toggleWriting()}
          />
        </div>
        <div>
          Email:
          <input
            type="text"
            name="name"
            value={this.props.userEmail}
            onChange={this.props.updateEmail}
            onFocus={() => store.toggleWriting()}
            onBlur={() => store.toggleWriting()}
          />
        </div>
        <div>
          Country:
          <input
            type="text"
            name="name"
            value={this.props.userCountry}
            onChange={this.props.updateCountry}
            onFocus={() => store.toggleWriting()}
            onBlur={() => store.toggleWriting()}
          />
        </div>
        <button onClick={() => saveToDropbox()}>
          {" "}
          {"Contribute to the book"}{" "}
        </button>
        <div id="dropbox-response" />
      </div>
    );
  }
}
export default SaveToDropboxButton;
