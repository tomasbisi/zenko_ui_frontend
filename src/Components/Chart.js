import React, { Component } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import '../css/Chart.css';

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
			storageUtilized: []
		}

	}

	componentWillMount() {
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
		})
	}

	getObjects(){
		return ({
			labels: Object.keys(this.state.objects),
			datasets: [{
				data: Object.values(this.state.objects),
				backgroundColor: this.getColors()
			}]

		})
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
		return (dataset)
	}


	getOptions(displayLegend, displayAxes, titleText) {
		return ({
			responsive: true,
			maintainAspectRatio: false,
			title: {
				display: true,
				text: titleText,
				fontSize: 15
			},
			legend: this.getLegend(displayLegend),
			scales: this.getAxes(displayAxes)
		})
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
			})
		} else {
			return ({
				yAxes: [{
					display: false
				}],
				xAxes: [{
					display: false
				}]
			})
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
			})
		}
		return ({
			display: false
		})
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
		if (value >= 1000000000000) {
			return (value / 1000000000000 + 'T');
		} else if (value >= 1000000000) {
			return (value / 1000000000 + 'G');
		} else if (value >= 1000000) {
			return (value / 1000000 + 'M');
		} else if (value >= 1000) {
			return (value / 1000 + 'K');
		} else if (value < 10) {
			return (value.toPrecision(1));
		}
		return (value);
	}

	render() {
		return (
			<div className='grid'>
				<div className='row'>
					<div>
						<Line
							data={this.getChartData([this.state.incomingBytes, this.state.outgoingBytes], ['incoming bytes', 'outgoing bytes'], 'hsla(177, 100%, 25%, 1)', false)}
							height={200}
							options={this.getOptions(true, true, "incoming & outgoing bytes")}
						/>
					</div>
					<div>
						<Pie
							data={this.getObjects()}
							height={200}
							options={this.getOptions(false, false, "objects")}
						/>
					</div>
				</div>
				<div className='row'>
					<div className='chart'>
						<Line
							data={this.getChartData([this.state.storageUtilized], ['storage utilized'], 'hsla(328, 81%, 41%, 1)', true)}
							height={200}
							options={this.getOptions(false, true, "storage utilized")}
						/>
					</div>
					<div className='button'>
						<input type="button" value="Options" className="options"/>
					</div>
				</div>
			</div>
		)
	}
}

export default Chart;
