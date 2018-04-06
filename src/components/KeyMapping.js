import React from 'react';
import SelectedGlyph from './SelectedGlyph'

const KeyMapping = (props) => {
    console.log(props)
	return (
		<div>
			{Object.entries(props.keys).map(([key, glyph]) => {
                return (
                  <SelectedGlyph
                    key={key}
                    glyphPath={glyph[0]}
                    svgWidth={glyph[1]}
                    svgHeight={glyph[2]}
                    svgBaseline={glyph[3]}
                  />
                )
            })}
		</div>
	)
}

export default KeyMapping