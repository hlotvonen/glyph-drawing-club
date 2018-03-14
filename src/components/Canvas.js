import React, { Component } from 'react';
import { observer } from 'mobx-react';
import store from '../models/CanvasStore.js';
import Grid from './Grid';


class Canvas extends Component {

  constructor(props){
    super(props);
    this.handleKeyPress = store.handleKeyPress;
  }
  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

	render() {
		return (
			<div className={"canvas_container" + (store.hideGrid ? ' hideGrid' : '')} >
				<div className="aligner">
					<Grid canvas={store.canvas}/>
				</div>
			</div>
		);
	}
}

export default observer(Canvas);
