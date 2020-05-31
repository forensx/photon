/** IMPORTS */
import React, { useState } from 'react';

import Search from '../CitySearch/Search';
import Divider from '@material-ui/core/Divider';

import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

import Selection from './Selection/Selection';

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

export default function SideDrawer(props) {
	const {
		opacity,
		radiusScale,
		radiusMinPixels,
		setOpacity,
		setRadiusScale,
		setRadiusMinPixels,
	} = props;

	console.log('Radius Min Pixels Function: ', setRadiusMinPixels);
	const [expanded, setExpanded] = useState(true);

	/** Gaining Text Input */
	const [text, setText] = useState('');

	// Handles the text input
	function handleText(event) {
		setText(event.target.value);
	}

	// Handles the click
	function clickHandler() {
		console.log(text);
	}

	/** Handling the Slider  */
	// Opacity
	const handleOpacityChange = (event, newValue) => {
		setOpacity(newValue);
	};

	// Radius
	const [radius, setRadius] = useState(30);

	const handleRadiusScaleChange = (event, newValue) => {
		setRadiusScale(newValue);
	};

	// Threshold
	const [threshold, setThreshold] = useState(30);

	const handleRadiusMinPixelsChange = (event, newValue) => {
		setRadiusMinPixels(newValue);
	};

	/** Dropdown Selection */
	const [visualization, setVisualization] = React.useState('');

	const handleDropChange = (event) => {
		setVisualization(event.target.value);
	};

	/** Tooltip for the slider */
	function ValueLabelComponent(props) {
		const { children, open, value } = props;

		return (
			<Tooltip open={open} enterTouchDelay={0} placement='top' title={value}>
				{children}
			</Tooltip>
		);
	}

	return (
		<div
			style={{
				height: '100%',
				width: '100%',
				backgroundColor: 'white',
				boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
				minWidth: '300px',
				padding: '10px',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<div
				style={{
					display: 'flex',
					top: '5%',
					left: '5%',
					width: '5%',
					height: '5%',
					position: 'relative',
					alignItems: 'center',
				}}
			>
				<div>
					<MenuFoldOutlined style={{ fontSize: '2.5em' }} />
				</div>
				<div
					style={{
						fontSize: '1.4em',
						marginLeft: '150%',
						fontWeight: 'bold',
						minWidth: '280px',
						marginRight: '20px',
					}}
				>
					Photon: Nighttime Light Imagery
				</div>
			</div>
			<div style={{ position: 'relative' }} style={{ marginTop: '-30px' }}>
				{text}
				<Search change={(event) => handleText(event)} clicked={clickHandler} />
				<Selection change={handleDropChange} visualization={visualization} />
				<Divider />
			</div>

			{/* Slider Divs */}
			<div
				style={{
					paddingLeft: '10px',
					paddingRight: '10px',
					display: 'flex',
					flexDirection: 'column',
					marginTop: '20px',
					paddingLeft: '40px',
					paddingRight: '40px',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<div style={{ fontSize: '1em', width: '20px' }}>Opacity</div>
					<Slider
						ValueLabelComponent={ValueLabelComponent}
						style={{ marginLeft: '50%', width: '40%' }}
						min={0}
						step={0.1}
						max={1}
						value={opacity}
						onChange={handleOpacityChange}
						aria-labelledby='continuous-slider'
					/>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						marginTop: '15px',
					}}
				>
					<div style={{ fontSize: '1em', width: '20px' }}>Radius Scale</div>
					<Slider
						style={{ marginLeft: '50%', width: '40%' }}
						ValueLabelComponent={ValueLabelComponent}
						min={100}
						step={100}
						max={1000}
						value={radiusScale}
						onChange={handleRadiusScaleChange}
						aria-labelledby='continuous-slider'
					/>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						marginTop: '15px',
					}}
				>
					<div style={{ fontSize: '1em', width: '20px' }}>Radius MinPixels</div>
					<Slider
						style={{ marginLeft: '50%', width: '40%' }}
						ValueLabelComponent={ValueLabelComponent}
						min={1}
						step={1}
						max={5}
						value={radiusMinPixels}
						onChange={handleRadiusMinPixelsChange}
						aria-labelledby='continuous-slider'
					/>
				</div>
			</div>
		</div>
	);
}
