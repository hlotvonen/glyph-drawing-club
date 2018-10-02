import React from "react";
import { observer } from "mobx-react";
import store from "../models/CanvasStore.js";

class GlyphFontSize extends React.Component {
  render() {
    return (
      <div>
        {"Glyph size modifier:"}
        <button onClick={this.props.decreaseGlyphFontSizeModifier}>
          {" "}
          {"-1"}{" "}
        </button>
        <button onClick={this.props.increaseGlyphFontSizeModifier}>
          {" "}
          {"+1"}{" "}
        </button>
        <button onClick={this.props.decreaseByOneCellGlyphFontSizeModifier}>
          {" "}
          {"-" + store.defaultFontSize}{" "}
        </button>
        <button onClick={this.props.increaseByOneCellGlyphFontSizeModifier}>
          {" "}
          {"+" + store.defaultFontSize}{" "}
        </button>
        <span>{store.glyphFontSizeModifier} px</span>
      </div>
    );
  }
}
export default observer(GlyphFontSize);
