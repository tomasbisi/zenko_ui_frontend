import DataCall from '../Datacall';
import React, { Component } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import Operations from './OperationsTable';
import ObjectDetails from './ObjectDetailsTable';
import '../css/Chart.css';

let data1 =
  { "timeRange":[1501570800000,1504249199999],
    "storageUtilized":[0,500000],
    "incomingBytes":13352332,
    "outgoingBytes":122342353,
    "numberOfObjects":[0,1],
    "operations":
    {
      "s3:DeleteBucket":0,
      "s3:DeleteBucketCors":0,
      "s3:DeleteBucketWebsite":0,
      "s3:DeleteObjectTagging":0,
      "s3:ListBucket":0,
      "s3:GetBucketAcl":0,
      "s3:GetBucketCors":0,
      "s3:GetBucketWebsite":0,
      "s3:GetBucketLocation":0,
      "s3:CreateBucket":1,
      "s3:PutBucketAcl":0,
      "s3:PutBucketCors":0,
      "s3:PutBucketWebsite":0,
      "s3:PutObject":1,
      "s3:CopyObject":0,
      "s3:UploadPart":0,
      "s3:ListBucketMultipartUploads":0,
      "s3:ListMultipartUploadParts":0,
      "s3:InitiateMultipartUpload":0,
      "s3:CompleteMultipartUpload":0,
      "s3:AbortMultipartUpload":0,
      "s3:DeleteObject":0,
      "s3:MultiObjectDelete":0,
      "s3:GetObject":0,
      "s3:GetObjectAcl":0,
      "s3:GetObjectTagging":0,
      "s3:PutObjectAcl":0,
      "s3:PutObjectTagging":0,
      "s3:HeadBucket":0,
      "s3:HeadObject":0,
      "s3:PutBucketVersioning":0,
      "s3:GetBucketVersioning":0,
      "s3:PutBucketReplication":0,
      "s3:GetBucketReplication":0,
      "s3:DeleteBucketReplication":0
    },
    "bucketName":"utapi-bucket"
  };
let data2 =
  { "timeRange":[1501570800000,1504249199999],
    "storageUtilized":[0,1000],
    "incomingBytes":213133334,
    "outgoingBytes":224345668,
    "numberOfObjects":[0,1],
    "operations":
    {
      "s3:DeleteBucket":0,
      "s3:DeleteBucketCors":0,
      "s3:DeleteBucketWebsite":0,
      "s3:DeleteObjectTagging":0,
      "s3:ListBucket":0,
      "s3:GetBucketAcl":0,
      "s3:GetBucketCors":0,
      "s3:GetBucketWebsite":0,
      "s3:GetBucketLocation":0,
      "s3:CreateBucket":1,
      "s3:PutBucketAcl":0,
      "s3:PutBucketCors":0,
      "s3:PutBucketWebsite":0,
      "s3:PutObject":1,
      "s3:CopyObject":0,
      "s3:UploadPart":0,
      "s3:ListBucketMultipartUploads":0,
      "s3:ListMultipartUploadParts":0,
      "s3:InitiateMultipartUpload":0,
      "s3:CompleteMultipartUpload":0,
      "s3:AbortMultipartUpload":0,
      "s3:DeleteObject":0,
      "s3:MultiObjectDelete":0,
      "s3:GetObject":0,
      "s3:GetObjectAcl":0,
      "s3:GetObjectTagging":0,
      "s3:PutObjectAcl":0,
      "s3:PutObjectTagging":0,
      "s3:HeadBucket":0,
      "s3:HeadObject":0,
      "s3:PutBucketVersioning":0,
      "s3:GetBucketVersioning":0,
      "s3:PutBucketReplication":0,
      "s3:GetBucketReplication":0,
      "s3:DeleteBucketReplication":0
    },
    "bucketName":"utapi-bucket"
  };

let data_chart = [data1, data2, data1, data1, data2];

let objects = {'A':1000, 'B':2000, 'C':4000, 'D':100, 'E':700, 'F': 560, 'G': 231};


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
        let data = data_chart;
        console.log("inital data");
        console.log(data);
        this.setState({
            dates: data.map((i) => {
                return (this.getDate(i.timeRange[0]) + ' | ' + this.getDate(i.timeRange[1]))
            }),
            incomingBytes: data.map((i) => {
                return (i.incomingBytes);
            }),
            outgoingBytes: data.map((i) => {
                return (i.outgoingBytes);
            }),
            storageUtilized: data.map((i) => {
                return (i.storageUtilized[1]);
            })
        });
    }

    componentDidMount() {
    	// let dashboard = new Dashboard();
        let datacall = new DataCall();
        let param = new Object();
        param.name = "utapi-bucket";
        param.start = datacall.getData(this.state.startParam);
        param.end = datacall.getData(this.state.endParam);
        console.log("EPOCHS");
        console.log(param.start);
        console.log(param.end);
        datacall.getData(param).then((data) => {
            console.log("final data");
            console.log(data);
            this.setState({
                dates: data.map((i) => {
                    return (this.getDate(i.timeRange[0]) + ' | ' + this.getDate(i.timeRange[1]))
                }),
                incomingBytes: data.map((i) => {
                    return (i.incomingBytes);
                }),
                outgoingBytes: data.map((i) => {
                    return (i.outgoingBytes);
                }),
                storageUtilized: data.map((i) => {
                    return (i.storageUtilized[1]);
                })
            });
        });
  }

	// componentWillMount() {
	// 	// let data = this.state.data;
	// 	this.setState({
	// 		dates: data.map((i) => {
	// 			return (this.getDate(i.timeRange[0]) + ' | ' + this.getDate(i.timeRange[1]))}),
	// 		incomingBytes: data.map((i) => {
	// 			return (i.incomingBytes);
	// 		}),
	// 		outgoingBytes: data.map((i) => {
	// 			return (i.outgoingBytes);
	// 		}),
	// 		storageUtilized: data.map((i) => {
	// 			return (i.storageUtilized[1]);
	// 		})
	// 	});
	// }


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