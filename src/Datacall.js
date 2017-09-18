import React, { Component, query } from 'react';
import AWS from 'aws-sdk';
import Chart from './Components/Chart'

AWS.config.update({
    accessKeyId: "accessKey1",
    secretAccessKey: "verySecretKey1",
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

// const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const dbName = "testdb";

var param1 = {name:"utapi-bucket", start:1501570800000, end:1504249199999};

// function callback_param(err) {
// 	console.log(err);
// 	console.log(result);
// }


class DataCall extends Component {

	componentWillMount() {

	}

	constructor() {
		super();
		this.state = {
			title: "Bucket 1",
			data: [],
		};

		// this.query(param1, (err, items) => {
		// 	let out = [];
		// 	console.log("Error: " + err);
		// 	// console.log(items);
		// 	for (let i = 0; i < items.length; i++){
		// 		out.push(items[i].data);
		// 	}
		// 	console.log(out);
		// 	//console.log("THis is the DATA"  + items);
		// });
		
	}

// 

	query (param, callback) {
	        console.log("query");
	        console.log("Primary Hash", param.name);
	        console.log("start Time ", param.start);
	        console.log("End Time ", param.end)
	        var params = {
	            TableName: dbName,
	            KeyConditionExpression: "#bucketName = :bucketValue and #startTime BETWEEN :from AND :to",
	            ExpressionAttributeNames: {
	                "#bucketName" : "bucketName",
	                "#startTime": "startTime"
	            },
	            ExpressionAttributeValues: {
	                ":bucketValue": param.name,
	                ":from": param.start,
	                ":to": param.end
	            }
	        };
	        var items = []
	        var queryExecute = function (callback) {
	            docClient.query(params, function (err, result) {
	                if (err) {
	                callback(err);
	                } else {
	                    // console.log(result)
	                	
	                    items = items.concat(result.Items);
	                    if (result.LastEvaluatedKey) {
	                        params.ExclusiveStartKey = result.LastEvaluatedKey;
	                        queryExecute(callback);
	                    } else {
	                        callback(err, items);
	                    }
	                }

	                // this.setState({ data: result.Items });	
	            });

	            	
			
	        };
	        queryExecute(callback);

	        // var param1 = {name:"utapi-bucket", start:1501570800000, end:1504249199999};

	        //  query (param1, (err, result)=>{
	        // 	console.log(err);
	        // // console.log(result[1]);
	        // // console.log(result.data);
	        // 	console.log("HELLLO WORLD");
	        // 	console.log(result);
	        // 	// this.data = result;

	    //     	this.setState({
					//       data: result,
					//     });
	    // });

    }

    getData() {
    	console.log("TESTINS GETDATA");
    	this.query(param1, (err, items) => {
			let out = [];
			console.log("Error: " + err);
			// console.log(items);
			for (let i = 0; i < items.length; i++){
				out.push(items[i].data);
			}
			console.log(out);
			this.data = out;
			// return (out);
			//console.log("THis is the DATA"  + items);
		});
	   	// 

	   	// return (this.data);

	   }

		 render() {

		         	return (
		         		<div>

		         			<h1>{this.query.bind(this)}</h1>			         			
		         			

		         			<h1>{this.state.title}</h1>


		         		</div>

		         		);

		         }   

		         }


export default DataCall;
