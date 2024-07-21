import json
import boto3

def lambda_handler(event, context):
    response = event['analyzed_feedback']
    
    # Initialize the DynamoDB client
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('feedback-bookingref')
    
    # Iterate over the response and update DynamoDB
    for entry in response:
        bookingref = entry.get('bookingref')
        sentiment_category = entry.get('sentiment_category')

        if bookingref and sentiment_category:
            try:
                # Update the sentiment_category in DynamoDB
                table.update_item(
                    Key={'bookingref': bookingref},
                    UpdateExpression='SET sentiment_category = :sentiment_category',
                    ExpressionAttributeValues={
                        ':sentiment_category': sentiment_category
                    }
                )
            except Exception as e:
                return {
                    'statusCode': 500,
                    'body': json.dumps({'error': 'Error updating DynamoDB: {}'.format(str(e))})
                }
                
    # Return success message
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Sentiment categories updated successfully'})
    }

    
