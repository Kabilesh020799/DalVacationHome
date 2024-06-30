const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event) => {
    try {
        const email = event.email;
        const topicArn = 'arn:aws:sns:us-east-1:288937723576:DalVacationHome.fifo';

        const params = {
            Protocol: 'email',
            TopicArn: topicArn,
            Endpoint: email,
        };

        const subscribeResponse = await sns.subscribe(params).promise();

        const subscriptionArn = subscribeResponse.SubscriptionArn;
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Subscription request sent successfully',
                subscriptionArn: subscriptionArn
            }),
        };
    } catch (err) {
        console.error('Error subscribing email address to SNS:', err);
        return {
            statusCode: 500,
            body: JSON.stringify('Error subscribing email address to SNS'),
        };
    }
};
