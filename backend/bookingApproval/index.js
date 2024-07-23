const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

const snsTopicArn = 'arn:aws:sns:us-east-1:288937723576:DalVactionHome';
const tableName = 'bookings';

exports.handler = async (event) => {
    for (const record of event.Records) {
        const messageBody = JSON.parse(record.body);
        const { email, roomId } = messageBody;

        const bookingReference = uuidv4();

        const bookingExists = await checkRoomBooking(roomId);

        if (!bookingExists) {
            await saveRoomBooking(email, roomId, bookingReference);

            const subject = 'Booking Confirmation';
            const message = `Dear user, your booking for room ${roomId} was confirmed. Your booking reference is ${bookingReference}.`;

            const params = {
                Message: message,
                Subject: subject,
                TopicArn: snsTopicArn,
                MessageAttributes: {
                    email: {
                        DataType: 'String',
                        StringValue: email
                    }
                }
            };

            try {
                await sns.publish(params).promise();
                console.log(`Booking confirmed for ${email} for room ${roomId}`);
            } catch (error) {
                console.error(`Error sending message to ${email}`, error);
            }
        } else {
            const subject = 'Booking Failure';
            const message = `Dear user, your booking for room ${roomId} failed as it was already booked.`;

            const params = {
                Message: message,
                Subject: subject,
                TopicArn: snsTopicArn,
                MessageAttributes: {
                    email: {
                        DataType: 'String',
                        StringValue: email
                    }
                }
            };

            try {
                await sns.publish(params).promise();
                console.log(`Booking failed for ${email} for room ${roomId}`);
            } catch (error) {
                console.error(`Error sending message to ${email}`, error);
            }
        }
    }
};

const checkRoomBooking = async (roomId) => {
    const params = {
        TableName: tableName,
        FilterExpression: '#id = :roomId',
        ExpressionAttributeNames: {
            '#id': 'id'
        },
        ExpressionAttributeValues: {
            ':roomId': roomId
        }
    };

    try {
        const result = await dynamoDb.scan(params).promise();
        return result.Items.length > 0;
    } catch (error) {
        console.error(`Error checking room booking: ${error}`);
        return false;
    }
};

const saveRoomBooking = async (email, roomId, bookingReference) => {
    const params = {
        TableName: tableName,
        Item: { bookingReference, id: roomId, email, timestamp: new Date().toISOString() }
    };

    try {
        await dynamoDb.put(params).promise();
        console.log(`Booking saved for room ${roomId}`);
    } catch (error) {
        console.error(`Error saving room booking: ${error}`);
    }
};
