import React from 'react';
import { observer } from 'mobx-react';
import setstore from '../models/KeymappingsStore';


class SetSelect extends React.Component {
  render() {

		const sets = setstore.sets;
		const selectSetButtons = sets.map((setNumber, x) =>
				<button type="button" key={x}>{x}</button>
		);

		return (
			<div className="select_set">
				{'Add set '}<button type="button" onClick={this.props.addSet}>+</button>
				{'Select set: '}{selectSetButtons}
			</div>
		)
	}
}

export default observer(SetSelect);