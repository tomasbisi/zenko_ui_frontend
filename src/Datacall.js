import React, { Component, query } from 'react';
import AWS from 'aws-sdk';
import Chart from './Components/Chart'

AWS.config.update({
    accessKeyId: "accessKey1",
    secretAccessKey: "verySecretKey1",
    region: "us-west-2",
    endpoint: "http://localhost:8300"
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
	}

	query (param) {
        return new Promise((resolve, reject) => {
            var params = {
                TableName: dbName,
                KeyConditionExpression: "#bucketName = :bucketValue and #startTime BETWEEN :from AND :to",
                ExpressionAttributeNames: {
                    "#bucketName": "bucketName",
                    "#startTime": "startTime"
                },
                ExpressionAttributeValues: {
                    ":bucketValue": param.name,
                    ":from": param.start,
                    ":to": param.end
                }
            };
            let initialresult = []
			let finalresult = []
			docClient.query(params, function (err, data) {
				if (err) {
					console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
					reject(err);
				} else {
					data.Items.forEach(function (item) {
						initialresult.push(item);
					});
				}
				for (let i = 0; i < initialresult.length; i++) {
					finalresult.push(initialresult[i].data);
				}
				//console.log(finalresult);
				resolve(finalresult);

			});
        });
	 }

	 getData() {
		 return new Promise((resolve, reject) => {
			 this.query(param1).then((out) => {
				 resolve(out);
				});
			});
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
