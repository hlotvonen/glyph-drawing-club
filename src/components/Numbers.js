import React, { Component } from "react";
import { observer } from "mobx-react";
import store from "../models/CanvasStore";

@observer
class Numbers extends Component {
  render() {
    const selected_y = store.selected_y;
    const selected_x = store.selected_x;

    const colNums = [];
    for (let i = 0; i < store.canvasWidth; i++) {
      colNums.push(
        <div
          key={i}
          className={"colNum " + (selected_x === i ? "highlighted" : "")}
          style={{ width: store.cellWidth }}
        >
          {i}
        </div>
      );
    }

    const rowNums = [];
    for (let i = 0; i < store.canvasHeight; i++) {
      rowNums.push(
        <div
          key={i}
          className={"rowNum " + (selected_y === i ? "highlighted" : "")}
          style={{
            height: store.cellHeight,
            position: "absolute",
            top: i * store.cellHeight
          }}
        >
          {i}
        </div>
      );
    }

    return (
      <div className="numbers">
        <div className="colNums">{colNums}</div>
        <div className="rowNums">{rowNums}</div>
      </div>
    );
  }
}
export default Numbers;
