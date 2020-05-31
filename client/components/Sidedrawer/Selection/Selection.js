/** IMPORTS */
import React from 'react';

// Import Components
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// Import Styling

/** CODE */

// Defining our Functional Component
const selection = (props) => (
	<Select
		style={{ marginLeft: '30%', width: '35%' }}
		labelId='demo-customized-select-label'
		id='demo-customized-select'
		value={props.visualization}
		onChange={props.change}
	>
		<MenuItem value={'Light'}>Light</MenuItem>
		<MenuItem value={'NO2'}>NO2</MenuItem>
	</Select>
);

export default selection;
