import json
import boto3
from botocore.exceptions import ClientError
import urllib.request
import urllib.error

# Initialize a DynamoDB client
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    # Set the DynamoDB table name
    table_name = 'feedback-bookingref'
    table = dynamodb.Table(table_name)
    
    room_id = event['room_id']
    print("room_id: ", room_id)
    
    # Query the table
    try:
        response = table.scan(
            FilterExpression=boto3.dynamodb.conditions.Attr('room_id').eq(room_id)
        )
        
        items = response.get('Items', [])
        feedback_and_sentiment = [{'feedback': item['feedback'], 'sentiment_category': item['sentiment_category'], 'bookingref': item['bookingref']} for item in items]
        
        
        # Call the external API
        api_url = 'https://us-central1-sample-311412.cloudfunctions.net/getSentiment'
        print("input before sentiment", feedback_and_sentiment)
        request_data = json.dumps({'body': feedback_and_sentiment}).encode('utf-8')
        req = urllib.request.Request(api_url, data=request_data, headers={'Content-Type': 'application/json'}, method='POST')
        
        try:
            with urllib.request.urlopen(req) as response:
                if response.status == 200:
                    updated_body = json.loads(response.read().decode('utf-8'))
                    updated_body = updated_body.get("body")
                    print("output after sentiment", updated_body)
                    # Iterate through each item in the update list
                    for item in updated_body:
                        print(type(item), item)
                        #item = json.loads(item)
                        bookingref = item.get('bookingref')
                        sentiment_category = item.get('sentiment_category')
            
                        # Update the DynamoDB item
                        response = table.update_item(
                            Key={'bookingref': bookingref},
                            UpdateExpression='SET sentiment_category = :sentiment_category',
                            ExpressionAttributeValues={
                                ':sentiment_category': sentiment_category
                            },
                            ReturnValues='UPDATED_NEW'
                        )
                    print(f'Updated in DB')
                    
                    return {
                            'statusCode': 200,
                            'headers': {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',  # Enable CORS
                                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',  # Allowed methods
                                'Access-Control-Allow-Headers': 'Content-Type'  # Allowed headers
                            },
                            'body': updated_body
                        }
                else:
                    return {
                        'statusCode': 500,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',  # Enable CORS
                            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',  # Allowed methods
                            'Access-Control-Allow-Headers': 'Content-Type'  # Allowed headers
                        },
                        'body': json.dumps(f'Error calling external API or updating DB: {response.read().decode("utf-8")}')
                    }
        
        except urllib.error.URLError as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                'body': json.dumps(f'Error calling external API: {str(e.reason)}')
            }
        
        '''return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',  # Enable CORS
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',  # Allowed methods
                'Access-Control-Allow-Headers': 'Content-Type'  # Allowed headers
            },
            'body': updated_body["body"]
        }'''
        
    except ClientError as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps(f'Error querying data: {str(e)}')
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
