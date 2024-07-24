const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const tableName = 'bookings';

exports.handler = async (event) => {
    const params = {
        TableName: tableName
    };

    try {
        const data = await dynamoDb.scan(params).promise();
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
