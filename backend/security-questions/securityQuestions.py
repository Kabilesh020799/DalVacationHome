import json
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Users')  

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        email = body.get('email', '')
        answer1 = body.get('answer1', '')
        answer2 = body.get('answer2', '')
        answer3 = body.get('answer3', '')

        response = table.query(
            KeyConditionExpression=Key('email').eq(email)
        )

        items = response['Items']

        if not items:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Email not found'})
            }

        user = items[0]

        if user.get('answer1', '') != answer1 or user.get('answer2', '') != answer2 or user.get('answer3', '') != answer3:
            return {
                'statusCode': 401,
                'body': json.dumps({'message': 'Incorrect answers'})
            }

        # Successful verification
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Answers verified successfully', 'success': True})
        }
    
    except KeyError as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Malformed request body', 'error': str(e)})
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Internal server error', 'error': str(e)})
        }
