import React from 'react';
import { observer } from 'mobx-react';

class HideGrid extends React.Component {

  render() {
    return (
    	<div>
          	{'Hide grid:'}
          	<input type="checkbox" value={this.props.hideGrid} onChange={this.props.handleChange} />
      	</div>
    );
  }
}
export default observer(HideGrid);
