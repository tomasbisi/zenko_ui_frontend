import React, { Component } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import Operations from './OperationsTable';
import ObjectDetails from './ObjectDetailsTable'
import '../css/Chart.css';
import DataCall from '../Datacall';

class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data,
			objects: props.objects,
			colors: props.colors,
			dates: [],
			incomingBytes: [],
			outgoingBytes: [],
			storageUtilized: [],
			active: false
		}
	}

	componentWillMount() {

		let data = this.state.data;		

		let data = this.state.data;

		this.setState({
			dates: data.map((i) => {
				return (this.getDate(i.timeRange[0]) + ' | ' + this.getDate(i.timeRange[1]))}),
			incomingBytes: data.map((i) => {
				return (i.incomingBytes);
			}),
			outgoingBytes: data.map((i) => {
				return (i.outgoingBytes);
			}),
			storageUtilized: data.map((i) => {
				return (i.storageUtilized[1]);
			})

		})
		console.log("TESTING DATA" + data);

		});

	}

	static defaultProps = {
		textColor: '#00000',
		gridColor: '#00000'
	}

	getDate(dateValue) {
		let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
			"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		let date = new Date(dateValue);
		let day = date.getDate();
			if (day < 10) day = "0" + day;
		let hours = date.getHours();
			if (hours < 10) hours = "0" + hours;
		let minutes = date.getMinutes();
			if (minutes < 10) minutes = "0" + minutes;
		return (
			monthNames[date.getMonth()] + " " +
			day + " " +
			hours + ":" +
			minutes
		);
	}

	getChartData(data, label, color, fill) {
		return ({
			labels: this.state.dates,
			datasets: this.getDataSet(data, label, color, fill)
		});
	}

	getObjects(){
		return ({
			labels: Object.keys(this.state.objects),
			datasets: [{
				data: Object.values(this.state.objects),
				backgroundColor: this.getColors()
			}]

		});
	}

	getDataSet(data, label, color, fill) {
		let dataset = [{
			label: label[0],
			data: data[0],
			fill: fill,
			borderColor: color,
			backgroundColor: color
		}]
		if (data.length === 2) {
			dataset.push({
				label: label[1],
				data: data[1],
				fill: fill,
				borderColor: 'hsla(44, 100%, 40%, 1)',
				backgroundColor: 'hsla(44, 100%, 40%, 1)'
			});
		}
		if (fill) dataset[0].backgroundColor = 'hsla(328, 100%, 41%, 0.5)';
		return (dataset);
	}


	getOptions(displayLegend, displayAxes) {
		return ({
			responsive: true,
			maintainAspectRatio: false,
			title: {
				display: false,
			},
			legend: this.getLegend(displayLegend),
			scales: this.getAxes(displayAxes)
		});
	}

	getAxes(displayAxes) {
		if (displayAxes) {
			return ({
				yAxes: [{
					ticks: {
						fontColor: this.props.textColor,
						fontSize: 11,
						beginAtZero: true,
						userCallback: (value) => this.convertValue(value)},
						gridLines: {
							color: this.props.gridColor,
							lineWidth: 0.8 }
						}],
				xAxes: [{
					display: false
				}]
			});
		} else {
			return ({
				yAxes: [{
					display: false
				}],
				xAxes: [{
					display: false
				}]
			});
		}
	}

	getLegend(displayLegend) {
		if (displayLegend) {
			return ({
				display: true,
				onClick: (e) => e.stopPropagation(),
				labels: {
					boxWidth: 11,
					fontColor: this.props.textColor
				}
			});
		}
		return ({
			display: false
		});
	}

	getColors() {
		let randomColor = require('randomcolor');
		let colors = [];
		for (let key in Object.keys(this.state.objects)) {
			let color = randomColor({
				luminosity: 'light'
			});
			while (colors.includes(color)) {
				color = randomColor({
					luminosity: 'light'
				});
			}
			colors.push(color);
		}
		return (colors);
	}

	convertValue(value) {
		let thresh = 1000;
		if (Math.abs(value) < thresh) {
			if (value < 1) {
				return (value.toPrecision(1) + ' B');
			} else if (value < 10) {
				return (value.toPrecision(2) + ' B');
			}
			return (value + ' B');
		}
		let units = ['kB','MB','GB','TB','PB','EB','ZB','YB'];
		let u = -1;
		do {
			value /= thresh;
			++u;
		} while (Math.abs(value) >= thresh && u < units.length - 1);
		return (value + ' ' + units[u]);
	}

	handleClick() {
		let active = this.state.active;
		let newActive = active ? false : true;
		this.setState( {
			active: newActive
		});
	}

	render() {
		let active = this.state.active;

		return (
			<div className='grid'>
				<div className='row'>
					<div className='chart-bytes'>
						<p className='title'>Incoming and Outgoing Bytes</p>
						<Line
							data={this.getChartData([this.state.incomingBytes, this.state.outgoingBytes], ['incoming bytes', 'outgoing bytes'], 'hsla(177, 100%, 25%, 1)', false)}
							height={200}
							options={this.getOptions(true, true)}
						/>
					</div>
					<div className='chart-objects'>
						<div className='objects-header'>
							<p className='title'>Objects In The Bucket</p>
							<input type='button' value='Details' onClick={this.handleClick.bind(this)}/>
						</div>	
						{active ? (
							<ObjectDetails objects={this.state.objects} />
						) : (
							<Pie
							data={this.getObjects()}
							height={200}
							options={this.getOptions(false, false)}
							/>
						)}
					</div>
				</div>
				<div className='row'>
					<div className='chart-storage'>
						<p className='title'>Storage Utilized</p>
						<Line
							data={this.getChartData([this.state.storageUtilized], ['storage utilized'], 'hsla(328, 81%, 41%, 1)', true)}
							height={200}
							options={this.getOptions(false, true)}
						/>
					</div>
					<div className='button'>
						<p className='title'>Operations</p>
						<Operations data={this.state.data} />
					</div>
				</div>
			</div>
		)
	}
}

export default Chart;

// <input type="button" value="Operations" className="options"/>
