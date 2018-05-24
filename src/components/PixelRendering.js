import React from 'react';
import { observer } from 'mobx-react';

class PixelRendering extends React.Component {

  render() {
    return (
    	<div>
          	{'Pixel rendering:'}
          	<input id="pixelRendering" type="checkbox" value={this.props.pixelRendering} onChange={this.props.handleChangePixelRendering} />
      	</div>
    );
  }
}
export default observer(PixelRendering);
