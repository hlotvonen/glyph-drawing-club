import React from 'react';
import { observer } from 'mobx-react';

class GlyphInvertColor extends React.Component {

  render() {
    return (
    	<div>
          	{'Invert color:'}
          	<input type="checkbox" value={this.props.invertColor} onChange={this.props.handleChangeInvertColor} />
      	</div>
    );
  }
}
export default observer(GlyphInvertColor);
