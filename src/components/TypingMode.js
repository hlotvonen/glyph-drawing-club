import React from 'react';
import { observer } from 'mobx-react';

class TypingMode extends React.Component {

  render() {
    return (
    	<div>
          	{'Typing mode (t / ESC):'}
          	<input id="typingMode" type="checkbox" value={this.props.typingMode} onChange={this.props.handleChangeTypingMode} />
      	</div>
    );
  }
}
export default observer(TypingMode);
