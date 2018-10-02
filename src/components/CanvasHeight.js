import React from "react";
import { observer } from "mobx-react";
import store from "../models/CanvasStore.js";

class CanvasHeight extends React.Component {
  render() {
    return (
      <div>
        {"Canvas height:"}
        <button onClick={this.props.deleteRow}> {"-1"} </button>
        <button onClick={this.props.addRow}> {"+1"} </button>
        <span>
          {this.props.canvasHeight} {"cells"} ({store.heightPixels} px)
        </span>
      </div>
    );
  }
}
export default observer(CanvasHeight);
