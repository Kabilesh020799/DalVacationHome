import json
import boto3
from botocore.exceptions import ClientError

# Initialize a DynamoDB client
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    # Set the DynamoDB table name
    table_name = 'feedback-bookingref'
    table = dynamodb.Table(table_name)
    
    # Extract data from the event (assuming it's passed in the event body as JSON)
    try:
        #body = json.loads(event['body'])
        bookingref = event['bookingref']
        feedback = event['feedback']
        room_id = event['room_id']
        sentiment_category = event['sentiment_category']
        
        # Insert data into the DynamoDB table
        response = table.put_item(
            Item={
                'bookingref': bookingref,  # Partition key
                'feedback': feedback,
                'room_id': room_id,
                'sentiment_category': sentiment_category
            }
        )
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',  # Enable CORS
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',  # Allowed methods
                'Access-Control-Allow-Headers': 'Content-Type'  # Allowed headers
            },
            'body': json.dumps('Data inserted successfully')
        }
    
    except KeyError as e:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps(f'Missing parameter: {str(e)}')
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps(f'Error inserting data: {str(e)}')
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps(f'Unexpected error: {str(e)}')
        }
