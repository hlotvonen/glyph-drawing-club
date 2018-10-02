import React from 'react';
import { observer } from 'mobx-react';

class TransparentBackground extends React.Component {

  render() {
    return (
    	<div>
          	{'Transparent background:'}
          	<input id="transparentBackground" type="checkbox" value={this.props.transparentBackground} onChange={this.props.handleChangeTransparentBackground} />
      	</div>
    );
  }
}
export default observer(TransparentBackground);
