import React from "react";
import { observer } from "mobx-react";
import store from "../models/CanvasStore.js";

class CellHeight extends React.Component {
  render() {
    return (
      <div>
        {"Cell height:"}
        <button onClick={this.props.decreaseCellHeight}> {"-1"} </button>
        <button onClick={this.props.increaseCellHeight}> {"+1"} </button>
        <span>{this.props.cellHeight} px</span>
      </div>
    );
  }
}
export default observer(CellHeight);
