import React from 'react';
import { observer } from 'mobx-react';

class DarkTheme extends React.Component {

  render() {
    return (
    	<div>
          	{'Dark theme:'}
          	<input type="checkbox" value={this.props.darkTheme} onChange={this.props.handleChangeTheme} />
      	</div>
    );
  }
}
export default observer(DarkTheme);
