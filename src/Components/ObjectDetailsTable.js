import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../css/ObjectDetailsTable.css'

class ObjectDetails extends Component {
	constructor(props) {
		super(props);
		this.sum = 0;
		this.state = {
			objects: props.objects,
		}
	}

	componentWillMount() {
		this.sum = this.getSum()
		this.setState({
			info: this.getObjects(),
		});
	}

	getSum() {
		let values = Object.values(this.state.objects);
		return (values.reduce((a, b) => a + b, 0));
	}

	getObjects() {
		let obj = [];
		for (let key in this.state.objects) {
			let elem = {
				name: key,
				space: this.getPercentage(this.state.objects[key]),
				size: this.convertValue(this.state.objects[key])
			};
			obj.push(elem);
		}
		return (obj);
	}

	getPercentage(value) {
		return ((value * 100) / this.sum);
	}

	getColor(value) {
		return (value > 66 ? '#ff2e00'
			: value > 33 ? '#ffbf00'
			: '#85cc00'
		);
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

	render() {
		return (
			<div>
				<ReactTable
					data={this.state.info}
					columns={[
						{
							Header: 'Name',
							accessor: 'name'
						}, {
							Header: 'Space Taken',
							accessor: 'space',
							width: 150,
							Cell: row => (
								<div style = {{
									width: '100%',
									height: '100%',
									backgroundColor: '#dadada',
									borderRadius: '2px'
								}}>
								<div style = {{
									width: `${row.value}%`,
									height: '100%',
									backgroundColor: this.getColor(row.value),
									borderRadius: '2px',
									transition: 'all .2s ease-out'
								}} />
								</div>
							)
						}, {
							Header: 'Size',
							accessor: 'size',
							sortable: false,
							width: 150,
							Cell: row => (
								<span>
									{ row.value }
								</span>
							)
						}
					]}
					defaultPageSize={4}
					className="-striped -highlight"
					showPageSizeOptions={false}
				/>
			</div>
		)
	}
}
export default ObjectDetails;
