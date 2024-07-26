import json
import boto3
import random

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Users')

def lambda_handler(event, context):
    # Extract data from the event
    email = event['email']
    username = event['username']
    password = event['password']
    
    # Check if the email already exists
    try:
        response = table.get_item(Key={'email': email})
        if 'Item' in response:
            return {
                'statusCode': 400,
                'body': json.dumps('Email already exists.')
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error checking user: {str(e)}")
        }
    
    # Generate a unique 6-digit user ID
    user_id = str(random.randint(100000, 999999))
    
    # Create item to be inserted into DynamoDB
    item = {
        'email': email,
        'username': username,
        'password': password,
        'user_id': user_id,
    }
    
    # Insert the item into DynamoDB
    try:
        table.put_item(Item=item)
        return {
            'statusCode': 200,
            'body': json.dumps('User registered successfully!'),
            'user_id': user_id
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error saving user: {str(e)}")
        }
