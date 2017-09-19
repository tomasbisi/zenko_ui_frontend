import React, { Component, query, Output } from 'react';
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

var param1 = {name:"utapi-bucket", start:1505570800000, end:1505849199999};


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
	 
	// query (param, callback) {
	//         console.log("query");
	//         console.log("Primary Hash", param.name);
	//         console.log("start Time ", param.start);
	//         console.log("End Time ", param.end)
	//         var params = {
	//             TableName: dbName,
	//             KeyConditionExpression: "#bucketName = :bucketValue and #startTime BETWEEN :from AND :to",
	//             ExpressionAttributeNames: {
	//                 "#bucketName" : "bucketName",
	//                 "#startTime": "startTime"
	//             },
	//             ExpressionAttributeValues: {
	//                 ":bucketValue": param.name,
	//                 ":from": param.start,
	//                 ":to": param.end
	//             }
	//         };
	//         var items = []
	//         var queryExecute = function (callback) {
	//             docClient.query(params, function (err, result) {
	//                 if (err) {
	//                 callback(err);
	//                 } else {
	//                     // console.log(result)
	                	
	//                     items = items.concat(result.Items);
	//                     if (result.LastEvaluatedKey) {
	//                         params.ExclusiveStartKey = result.LastEvaluatedKey;
	//                         queryExecute(callback);
	//                     } else {
	//                         callback(err, items);
	//                     }
	//                 }
	//             });			
	//         };
	//         queryExecute(callback);
 //    }



   //  getData() {
   //  	console.log("TESTINS GETDATA");
   //  	this.query(param1, (err, items) => {
			// let out = [];
			// console.log("Error: " + err);
			// // console.log(items);
			// for (let i = 0; i < items.length; i++){
			// 	out.push(items[i].data);
			// }
			// console.log(out);
			// this.data = out;
	

			
			// function file_save(data, filename) {
					
			// 	if (!filename)
			// 		filename = 'console.json';
			// 	if (typeof data === "object"){
   //      			data = JSON.stringify(data, undefined, 4);
  
   //      			console.log("DATA SAVE SUCEED");
   //      			console.log(data);
   //  			}	
   //  			var output = new Output([data], {type: 'text/json'});

			// }
			// file_save(this.data, 'console.json');
			// return (out);
			//console.log("THis is the DATA"  + items);
		// });
	   	// 

	   	// return (this.data);

	   }

		 // render() {

		 //         	return (
		 //         		<div>

		 //         			<h1>{this.query.bind(this)}</h1>			         			
		         			

		 //         			<h1>{this.state.title}</h1>


		 //         		</div>

		 //         		);

		 //         }   

		 //         }


export default DataCall;
