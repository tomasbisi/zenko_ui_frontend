const AWS = require("aws-sdk");
AWS.config.loadFromPath('../config.json');
AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const dbName = "testdb";


function query (param, callback) {
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
                    console.log(result)
                    items = items.concat(result.Items);
                    if (result.LastEvaluatedKey) {
                        params.ExclusiveStartKey = result.LastEvaluatedKey;
                        queryExecute(callback);
                    } else {
                        callback(err, items);
                    }
                }
            });
        }
        queryExecute(callback);
    }

    console.log(query.result);
    // 1. push result to an array. var arr = []. 

