import json
import boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    # Initialize a session using Amazon DynamoDB
    dynamodb = boto3.resource('dynamodb')

    # Specify the table
    table = dynamodb.Table('feedback-bookingref')

    # Scan the table
    try:
        response = table.scan()
        items = response.get('Items', [])
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Error scanning table: {}'.format(str(e)))
        }

    # Return the list of items
    return {
        'statusCode': 200,
        'body': items
    }
