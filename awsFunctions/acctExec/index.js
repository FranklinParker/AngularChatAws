'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');
const uuid = require('uuid');
const dynamo = new doc.DynamoDB();


/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"

        },
    });

    switch (event.httpMethod) {
        case 'DELETE':
            const acctExecDelete = JSON.parse(event.body);
            let paramsDel = {
                TableName :"AccountExecutives",
		        Key: {
		            "id": acctExecDelete.id,
		        }
	        };
            dynamo.deleteItem(paramsDel, done);
            break;
        case 'GET':
            
      
            var query = {
                TableName: 'AccountExecutives',
                FilterExpression: "#region = :region",

                KeyConditionExpression: "#id NOT NULL",
                ExpressionAttributeNames:{
                    "#region": "region",
                    "#id": "id"
                },
                ExpressionAttributeValues: {
                   ":region": 'south',
     
                }
            };

// Note: This is a query on the Key Schema of the table.  
// For queries on secondary indexes, specify params.IndexName = "index-name"
 
// use an array of Condition Objects for multiple conditions
    //             query.KeyConditions = [dynamo.Condition("id", "NOT_NULL"),
    //       dynamo.Condition("region", "EQ","south")
    //           ];
    //          query.QueryFilter = dynamo.Condition("region", "EQ","south");
    

           //dynamo.query(query, done);
            dynamo.scan({ TableName: "AccountExecutives"}, done);
            break;
        case 'POST':
            console.log('event.body', event.body);
            const acctExec = JSON.parse(event.body);

            let params = {
		        Item : {
			    "id" : uuid.v1(),
			    "name": acctExec.name,
			    "region": acctExec.region
		      },
		        TableName :"AccountExecutives"
	        };
	        dynamo.putItem(params, done);
            break;
        case 'PUT':
            dynamo.updateItem(JSON.parse(event.body), done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
