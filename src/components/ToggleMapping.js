import React from 'react';
import { observer } from 'mobx-react';
import setstore from '../models/KeymappingsStore'

class ToggleMapping extends React.Component {

  render() {
    return (
    	<div className="ToggleMapping">
          	{'Map keys (m):'}
          	<input id="toggleMapping" type="checkbox" value={this.props.toggleMapping} onChange={this.props.handleChangeMapping}/>
      	</div>
    );
  }
}
export default observer(ToggleMapping);
