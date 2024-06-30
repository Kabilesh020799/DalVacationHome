const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event) => {
    try {
        const email = event.email;

        const topicArn = 'arn:aws:sns:us-east-1:288937723576:DalVacationHome.fifo';
        const messageGroupId = 'group1';
        const messageDeduplicationId = `${email}-${Date.now()}`;

        const params = {
            Message: `New email added: ${email}`,
            TopicArn: topicArn,
            MessageDeduplicationId: messageDeduplicationId,
            MessageGroupId: messageGroupId,
        };
        
        await sns.publish(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify('Message published successfully'),
        };
    } catch (err) {
        console.error('Error publishing message to SNS:', err);
        return {
            statusCode: 500,
            body: JSON.stringify('Error publishing message to SNS'),
        };
    }
};
