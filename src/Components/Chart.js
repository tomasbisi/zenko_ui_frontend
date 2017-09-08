import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Color from 'color';

class Chart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: props.data,
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
		if (fill) dataset[0].backgroundColor = Color(color).alpha(0.7).lighten(0.5);
		return (dataset)
	}


	getOptions(displayLegend, titleText) {
		return ({
			title: {
				display: true,
				text: titleText,
				fontSize: 15
			},
			legend: this.getLegend(displayLegend),
			scales: {
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
					display: false,
					gridLines: {
						color: this.props.gridColor,
						lineWidth: 0.8
					}
				}]
			}
		})
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
			<div className='Chart'>
			<Line
				data={this.getChartData([this.state.incomingBytes, this.state.outgoingBytes], ['incoming bytes', 'outgoing bytes'], 'hsla(177, 100%, 25%, 1)', false)}
				options={this.getOptions(true, "incoming & outgoing bytes")}
			/>
			<Line
				data={this.getChartData([this.state.storageUtilized], ['storage utilized'], 'hsla(328, 81%, 41%, 1)', true)}
				options={this.getOptions(false, "storage utilized")}
			/>
			</div>
		)
	}
}

export default Chart;
