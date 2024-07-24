const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const tableName = 'bookings';

exports.handler = async (event) => {
    const bookingReference = event.bookingReference;

    if (!bookingReference) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Booking reference is required' }),
        };
    }

    const params = {
        TableName: tableName,
        KeyConditionExpression: 'bookingReference = :bookingReference',
        ExpressionAttributeValues: {
            ':bookingReference': bookingReference
        }
    };

    try {
        const data = await dynamoDb.query(params).promise();
        if (data.Items.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Booking not found' }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items[0]),
        };
    } catch (error) {
        console.error('Error retrieving booking:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving booking', error: error.message }),
        };
    }
};
