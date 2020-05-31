import React from 'react';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';

export default function Search(props) {
	return (
		<div>
			{/* Search button that renders the new Region on Click */}
			<IconButton
				style={{ marginLeft: '10%', marginTop: '27%' }}
				aria-label='search'
				onClick={props.clicked}
			>
				<LocationSearchingIcon />
			</IconButton>
			{/* Text Field where the user searches for the region */}
			<TextField
				style={{ marginTop: '25%' }}
				onChange={props.change}
				id='standard-basic'
				label='City Name (e.g. Atlanta)'
			/>
		</div>
	);
}
