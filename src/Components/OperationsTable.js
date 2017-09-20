import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

class Operations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data,
			operations: []
		}
	}

	componentWillMount() {
		this.setState({
			operations: this.getOperations()
		});
	}

	getOperations() {
		let list = this.state.data[this.state.data.length - 1].operations;
		let operations = [];
		console.log("operations!!!!!!!!!!");
		console.log(operations);
		// let title = ['Delete Bucket', DeleteBucketCors]
		for (let key in list) {
			let elem = {
				title: key.substr(3, key.length - 1).replace(/([A-Z])/g, ' $1').trim(),
				value: list[key]
			};
			operations.push(elem);
		}
		return (operations);
	}

	render() {
		return (
			<div>
				<ReactTable
					data={this.state.operations}
					columns={[
						{
							Header: 'Operation',
							accessor: 'title'
						},
						{
							Header: 'Times',
							accessor: 'value',
							resizable: false,
							width: 50
						}
					]}
					defaultPageSize={3}
					className="-striped -highlight"
					showPageSizeOptions={false}
				/>
			</div>
		)
	}
}
export default Operations;
