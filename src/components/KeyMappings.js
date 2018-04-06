import React from 'react'
import { observer } from 'mobx-react'
import setstore from '../models/KeymappingsStore'
import ToggleMapping from './ToggleMapping'
import KeyMapping from './KeyMapping'
import SetSelect from './SetSelect'


@observer 
class KeyMappings extends React.Component {
	render() {
	 	const sets = setstore.sets;

	 	// TODO: Alter keymapping sets

		return (
	    	<div className="glyph_sets">
	    		<h3>Keymappings</h3>
	    		<ToggleMapping handleChangeMapping={setstore.handleChangeMapping} />
	    		<SetSelect addSet={setstore.addSet} selectSet={setstore.selectSet} />
				<div className="grid">
					{sets.map((set, y) => (
						<KeyMapping keys={set} key={y} />)
					)}
				</div>
	    	</div>
		);
	}
}

export default KeyMappings;