import React from 'react';
import { observer } from 'mobx-react';

class HideGrid extends React.Component {

  render() {
    return (
    	<div>
          	{'Hide grid (h):'}
          	<input id="hideGrid" type="checkbox" value={this.props.hideGrid} onChange={this.props.handleChangeHideGrid} />
      	</div>
    );
  }
}
export default observer(HideGrid);
