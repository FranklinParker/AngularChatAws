'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');
const uuid = require('uuid');

const dynamo = new doc.DynamoDB();


/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
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
            "Access-Control-Allow-Methods": "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT",
            "Access-Control-Allow-Origin": "*"
            // "Access-Control-Allow-Credentials" : true,
            // "Access-Control-Allow-Headers":'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
        },
    });

    /**
     *
     */
    const getFilter = (err, res) => {
        let body;
        if(err){
            body= err.message;

        } else{
            console.log('res', res);
            let filteredItems = res.Items.filter(item=> !item.chatSessionActive);
            console.log('filteredItems',  filteredItems);
            res.Items = filteredItems;
            body = JSON.stringify(res)
        }
        callback(null, {
            statusCode: err ? '400' : '200',
            body: body,
            headers: {
                'Content-Type': 'application/json',
                //   "Access-Control-Allow-Methods": "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT",
                "Access-Control-Allow-Origin": "*"
            },
        });
    }

    switch (event.httpMethod) {
        case 'DELETE':
            const recordDel = JSON.parse(event.body);
            let paramsDel = {
                TableName: "ChatSessions",
                Key: {
                    "id": recordDel.id,
                }
            };
            dynamo.deleteItem(paramsDel, done);
            break;
        case 'GET':
            dynamo.scan({ TableName: 'ChatSessions' }, getFilter);
            break;
        case 'POST':
            console.log('event.body', event.body);
            const chatSession = JSON.parse(event.body);
            let newChatSession = {
                Item: {
                    "id":  chatSession.id,
                    "chatInitiatorName": chatSession.chatInitiatorName,
                    "chatResponderName": "NONE",
                    "chatSessionActive": false
                },
                TableName: "ChatSessions"
            };
            dynamo.putItem(newChatSession, done);
            break;
        case 'PUT':
            const chatSessionUpdate = JSON.parse(event.body);

            if( chatSessionUpdate.messages){
                console.log('update to chat messages', chatSessionUpdate);

                let updateChatSessionMessages = {
                    Key:{
                        "id": chatSessionUpdate.id,
                    },
                    UpdateExpression: "set messages = :messages",
                    ExpressionAttributeValues:{
                        ":messages":chatSessionUpdate.messages
                    },
                    TableName: "ChatSessions"
                };
                dynamo.updateItem(updateChatSessionMessages, done);



            } else {
                let updateChatSession = {
                    Key:{
                        "id": chatSessionUpdate.id,
                    },
                    UpdateExpression: "set chatResponderName = :responder, chatSessionActive=:active",
                    ExpressionAttributeValues:{
                        ":responder":chatSessionUpdate.chatResponderName,
                        ":active":true
                    },
                    TableName: "ChatSessions"
                };
                dynamo.updateItem(updateChatSession, done);

            }
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
