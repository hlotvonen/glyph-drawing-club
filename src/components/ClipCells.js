import React from 'react';
import { observer } from 'mobx-react';

class ClipCells extends React.Component {

  render() {
    return (
    	<div>
          	{'Clip cells (c):'}
          	<input id="clipCells" type="checkbox" value={this.props.clipCells} onChange={this.props.handleChangeClipCells} />
      	</div>
    );
  }
}
export default observer(ClipCells);
