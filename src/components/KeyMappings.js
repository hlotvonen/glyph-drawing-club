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
	    const selectedMapping_y = setstore.selectedMapping_y;
	    const selectedMapping_x = setstore.selectedMapping_x;

		return (
	    	<div className="glyph_sets">
	    		<h3>Keymappings</h3>
	    		<ToggleMapping handleChangeMapping={setstore.handleChangeMapping}/>
	    		<SetSelect addSet={setstore.addSet}/>
				<div className="grid">
				{sets.map((setNumber, y) =>
					<div className="setNumber" key={y}>
						{setNumber.map((keys, x) =>
							<KeyMapping keys={setstore.keys[x]} key={x} />
						)}
					</div>
				)}
				</div>

	    	</div>
		);
	}
}

export default KeyMappings;