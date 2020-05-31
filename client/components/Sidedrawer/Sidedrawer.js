/** IMPORTS */
import React, { useState } from 'react';

import Search from '../CitySearch/Search';
import Divider from '@material-ui/core/Divider';

import Slider from '@material-ui/core/Slider';

import Selection from './Selection/Selection';

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

export default function SideDrawer() {
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
	// Visualization Intensity
	const [intensity, setIntensity] = useState(30);

	const handleIntensityChange = (event, newValue) => {
		setIntensity(newValue);
	};

	// Radius
	const [radius, setRadius] = useState(30);

	const handleRadiusChange = (event, newValue) => {
		setRadius(newValue);
	};

	// Threshold
	const [threshold, setThreshold] = useState(30);

	const handleThresholdChange = (event, newValue) => {
		setThreshold(newValue);
	};

	/** Dropdown Selection */
	const [visualization, setVisualization] = React.useState('');

	const handleDropChange = (event) => {
		setVisualization(event.target.value);
	};

	return (
		<div
			style={{
				height: '100%',
				width: '100%',
				backgroundColor: 'white',
				boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
			}}
		>
			{/* <div style={{ display: "flex", top: "5%", width: "5%", height: "5%", position: "relative" }}>
                <MenuFoldOutlined style={{ fontSize: "3em" }} />
                <h1>Proton: Nighttime Light Imagery</h1>
            </div> */}
			<div style={{ position: 'relative' }}>
				{text}
				<Search change={(event) => handleText(event)} clicked={clickHandler} />
				<Selection change={handleDropChange} visualization={visualization} />
				<Divider />
			</div>

			{/* Slider Divs */}

			<div>
				{intensity}
				{/* {// For Testing Purpose*/}
				<Slider
					style={{ marginLeft: '50%', width: '40%' }}
					value={intensity}
					onChange={handleIntensityChange}
					aria-labelledby='continuous-slider'
				/>
			</div>
			<div>
				{radius}
				{/* {// For Testing Purpose*/}
				<Slider
					style={{ marginLeft: '50%', width: '40%' }}
					value={radius}
					onChange={handleRadiusChange}
					aria-labelledby='continuous-slider'
				/>
			</div>
			<div>
				{threshold}
				{/* {// For Testing Purpose*/}
				<Slider
					style={{ marginLeft: '50%', width: '40%' }}
					value={threshold}
					onChange={handleThresholdChange}
					aria-labelledby='continuous-slider'
				/>
			</div>
		</div>
	);
}
