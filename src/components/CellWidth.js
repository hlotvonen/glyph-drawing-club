import React from "react";
import { observer } from "mobx-react";
import store from "../models/CanvasStore.js";

class CellWidth extends React.Component {
  render() {
    return (
      <div>
        {"Cell width:"}
        <button onClick={this.props.decreaseCellWidth}> {"-1"} </button>
        <button onClick={this.props.increaseCellWidth}> {"+1"} </button>
        <span>{this.props.cellWidth} px</span>
      </div>
    );
  }
}
export default observer(CellWidth);
