const AWS = require('aws-sdk');
const sns = new AWS.SNS({ region: 'us-east-1' });

exports.handler = async (event) => {
    const email = event.email;

    if (!email) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Email is required' })
        };
    }

    const params = {
        Protocol: 'email',
        TopicArn: 'arn:aws:sns:us-east-1:288937723576:DalVactionHome',
        Endpoint: email,
        Attributes: {
            FilterPolicy: JSON.stringify({ email: [email] })
        }
    };

    try {
        const data = await sns.subscribe(params).promise();
        console.log(`Subscription ARN is ${data.SubscriptionArn}`);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Subscription successful', email: email, subscriptionArn: data.SubscriptionArn })
        };
    } catch (error) {
        console.error('Error subscribing email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error subscribing email', error: error.message })
        };
    }
};
