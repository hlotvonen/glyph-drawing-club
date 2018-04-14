import React from 'react';
import { observer } from 'mobx-react';

class GlyphFlip extends React.Component {

  render() {
    return (
    	<div>
          	{'Flip glyph:'}
          	<input id="flipGlyph" type="checkbox" value={this.props.flipGlyph} onChange={this.props.handleChangeFlip} />
      	</div>
    );
  }
}
export default observer(GlyphFlip);
