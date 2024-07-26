const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const tableName = 'bookings';
const emailIndex = 'email-index';

exports.handler = async (event) => {
    const email = event.email;

    if (!email) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Email is required' }),
            headers: {
                "Content-Type": "application/json"
            }
        };
    }

    const params = {
        TableName: tableName,
        IndexName: emailIndex,
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
            ':email': email
        }
    };

    try {
        const data = await dynamoDb.query(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items),
            headers: {
                "Content-Type": "application/json"
            }
        };
    } catch (error) {
        console.error('Error retrieving bookings:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving bookings', error: error.message }),
            headers: {
                "Content-Type": "application/json"
            }
        };
    }
};
