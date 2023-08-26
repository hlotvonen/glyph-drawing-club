import { observer } from "mobx-react";
import React from "react";
import store from "../../../models/CanvasStore.js";
import { pxToMm } from "../../../utils/pxToMm.js";

class CanvasSizeInMillimeters extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        dpi: 150
      }
    }

	onChange = (num, e) => {       
        this.setState({dpi: e.target.value});
    }
	render() {
		return (
			<div className="settingsBlock">
				At DPI <input 
					type="number"
					value={this.state.dpi} 
					onChange={this.onChange.bind(this, "dpi")}
					onFocus={() => store.toggleWriting(true)}
					onBlur={() => store.toggleWriting(false)}
				/>
				<br />
				Canvas width equals {pxToMm(store.cellWidth * store.canvasWidth, this.state.dpi)} mm
				<br />
				Canvas height equals {pxToMm(store.cellHeight * store.canvasHeight, this.state.dpi)} mm
			</div>
		)
	}
}

export default observer(CanvasSizeInMillimeters)
