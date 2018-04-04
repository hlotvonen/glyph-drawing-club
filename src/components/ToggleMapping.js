import React from 'react';
import { observer } from 'mobx-react';

class ToggleMapping extends React.Component {

  render() {
    return (
    	<div>
          	{'Map keys:'}
          	<input type="checkbox" value={this.props.toggleMapping} onChange={this.props.handleChangeMapping} />
      	</div>
    );
  }
}
export default observer(ToggleMapping);
