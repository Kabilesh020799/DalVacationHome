const AWS = require('aws-sdk');
const sns = new AWS.SNS({ region: 'us-east-1' });

exports.handler = async (event) => {
    const email = event.email;
    const message = `Hello, you have successfully logged in to DalVacationHome.`;

    if (!email) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Email is required' })
        };
    }

    const params = {
        Message: message,
        TopicArn: 'arn:aws:sns:us-east-1:288937723576:DalVactionHome',
        MessageAttributes: {
            email: {
                DataType: 'String',
                StringValue: email
            }
        }
    };

    try {
        await sns.publish(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Message sent successfully to ' + email })
        };
    } catch (error) {
        console.error('Error sending message:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error sending message', error: error.message })
        };
    }
};
