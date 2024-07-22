const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

const queueUrl = 'https://sqs.us-east-1.amazonaws.com/288937723576/dal-vacation-booking.fifo';

exports.handler = async (event) => {
    const { email, roomId } = event;

    const params = {
        MessageBody: JSON.stringify({ email, roomId }),
        QueueUrl: queueUrl,
        MessageGroupId: 'RoomBookingGroup',
        MessageDeduplicationId: `${email}-${roomId}-${Date.now()}`
    };

    try {
        const result = await sqs.sendMessage(params).promise();
        console.log(`Message sent to queue, MessageId: ${result.MessageId}`);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Booking request submitted successfully' })
        };
    } catch (error) {
        console.error('Error sending message to queue', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error submitting booking request' })
        };
    }
};
