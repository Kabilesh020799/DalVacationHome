const AWS = require('aws-sdk');
const sns = new AWS.SNS();

const existingTopicArn = 'arn:aws:sns:us-east-1:288937723576:DalVactionHome';

exports.handler = async (event) => {
    const email = event.email;
    
    try {
        await sns.subscribe({
            Protocol: 'email',
            TopicArn: existingTopicArn,
            Endpoint: email
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Subscription successful', topicArn: existingTopicArn })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error subscribing email', error })
        };
    }
};
