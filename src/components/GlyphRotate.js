import React from "react";
import { observer } from "mobx-react";
import store from "../models/CanvasStore.js";

class GlyphRotate extends React.Component {
  render() {
    return (
      <div>
        {"Glyph rotation (r):"}
        <button onClick={this.props.rotateGlyphLeft}> {"⟲"} </button>
        <button onClick={this.props.rotateGlyphRight}> {"⟳"} </button>
        <span>
          {this.props.rotationAmount}
          &deg;
        </span>
      </div>
    );
  }
}
export default observer(GlyphRotate);
