import React, { Component, Fragment } from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { DataFilterExtension } from '@deck.gl/extensions';
import { MapView } from '@deck.gl/core';
import RangeInput from './range-input';

import SideDrawer from './components/Sidedrawer/Sidedrawer';

// Set your mapbox token here
const MAPBOX_TOKEN =
	'pk.eyJ1IjoicGFudDIwMDIiLCJhIjoiY2prenlwb2ZtMHlnMjNxbW1ld3VxYWZ4cCJ9.rOb8DhCzsysBIw69MxyWKg'; // eslint-disable-line

// This is only needed for this particular dataset - the default view assumes
// that the furthest geometries are on the ground. Because we are drawing the
// circles at the depth of the earthquakes, i.e. below sea level, we need to
// push the far plane away to avoid clipping them.
const MAP_VIEW = new MapView({
	// 1 is the distance between the camera and the ground
	farZMultiplier: 100,
});

const INITIAL_VIEW_STATE = {
	latitude: 36.5,
	longitude: -120,
	zoom: 5.5,
	pitch: 0,
	bearing: 0,
};

const MS_PER_DAY = 8.64e7;

const dataFilter = new DataFilterExtension({
	filterSize: 1,
	// Enable for higher precision, e.g. 1 second granularity
	// See DataFilterExtension documentation for how to pick precision
	fp64: false,
});

export default class App extends Component {
	constructor(props) {
		super(props);

		const timeRange = this._getTimeRange(props.data);

		this.state = {
			timeRange,
			filterValue: timeRange,
			hoveredObject: null,
			searchRegion: '',
			opacity: 0.5,
			radiusScale: 100,
			radiusMinPixels: 1,
		};
		this._onHover = this._onHover.bind(this);
		this._renderTooltip = this._renderTooltip.bind(this);
		this._renderLayers = this._renderLayers.bind(this);

		this.setOpacity = this.setOpacity.bind(this);
		this.setRadiusScale = this.setRadiusScale.bind(this);
		this.setRadiusMinPixels = this.setRadiusMinPixels.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.props.data) {
			const timeRange = this._getTimeRange(nextProps.data);
			this.setState({ timeRange, filterValue: timeRange });
		}
	}

	/** Setting up Prop Drilling */
	setOpacity(opacity) {
		this.setState({
			opacity: opacity,
		});
	}

	setRadiusScale(radiusScale) {
		this.setState({
			radiusScale: radiusScale,
		});
	}

	setRadiusMinPixels(radiusMinPixels) {
		this.setState({
			radiusMinPixels: radiusMinPixels,
		});
	}

	_getTimeRange(data) {
		if (!data) {
			return null;
		}
		return data.reduce(
			(range, d) => {
				const t = d.timestamp;
				range[0] = Math.min(range[0], t);
				range[1] = Math.max(range[1], t);
				return range;
			},
			[Infinity, -Infinity],
		);
	}

	_onHover({ x, y, object }) {
		this.setState({ x, y, hoveredObject: object });
	}

	_renderLayers() {
		const { data } = this.props;
		const { filterValue, radiusMinPixels, opacity, radiusScale } = this.state;

		return [
			data &&
				new ScatterplotLayer({
					id: 'earthquakes',
					data,
					radiusMinPixels,
					opacity,
					radiusScale,
					wrapLongitude: true,

					getPosition: (d) => [d.longitude, d.latitude, -d.depth * 1000],
					getRadius: (d) => Math.pow(2, d.magnitude),
					getFillColor: (d) => {
						const r = Math.sqrt(Math.max(d.depth, 0));
						return [255 - r * 15, r * 255, r * 0];
					},

					getFilterValue: (d) => d.timestamp,
					filterRange: [filterValue[0], filterValue[1]],
					filterSoftRange: [
						filterValue[0] * 0.9 + filterValue[1] * 0.1,
						filterValue[0] * 0.1 + filterValue[1] * 0.9,
					],
					extensions: [dataFilter],

					pickable: true,
					onHover: this._onHover,
				}),
		];
	}

	_renderTooltip() {
		const { x, y, hoveredObject } = this.state;
		return (
			hoveredObject && (
				<div className='tooltip' style={{ top: y, left: x }}>
					<div>
						<b>Time: </b>
						<span>{new Date(hoveredObject.timestamp).toUTCString()}</span>
					</div>
					<div>
						<b>Magnitude: </b>
						<span>{hoveredObject.magnitude}</span>
					</div>
					<div>
						<b>Depth: </b>
						<span>{hoveredObject.depth} km</span>
					</div>
				</div>
			)
		);
	}

	_formatLabel(t) {
		const date = new Date(t);
		return `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}`;
	}

	render() {
		const { mapStyle = 'mapbox://styles/mapbox/dark-v9' } = this.props;
		const { timeRange, filterValue } = this.state;

		return (
			<Fragment>
				<div
					style={{
						zIndex: '1000',
						position: 'absolute',
						height: '75%',
						width: '23%',
						marginTop: '6%',
						left: '3%',
					}}
				>
					<SideDrawer
						opacity={this.state.opacity}
						radiusScale={this.state.radiusScale}
						radiusMinPixels={this.state.radiusMinPixels}
						setOpacity={this.setOpacity}
						setRadiusScale={this.setRadiusScale}
						setRadiusMinPixels={this.setRadiusMinPixels}
					/>
				</div>
				<DeckGL
					views={MAP_VIEW}
					layers={this._renderLayers()}
					initialViewState={INITIAL_VIEW_STATE}
					controller={true}
					style={{ zIndex: '1' }}
				>
					<StaticMap
						reuseMaps
						mapStyle={mapStyle}
						preventStyleDiffing={true}
						mapboxApiAccessToken={MAPBOX_TOKEN}
					/>

					{this._renderTooltip}
				</DeckGL>

				{timeRange && (
					<RangeInput
						min={timeRange[0]}
						max={timeRange[1]}
						value={filterValue}
						animationSpeed={MS_PER_DAY * 30}
						formatLabel={this._formatLabel}
						onChange={({ value }) => this.setState({ filterValue: value })}
					/>
				)}
			</Fragment>
		);
	}
}
