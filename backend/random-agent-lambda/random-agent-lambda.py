import json
import boto3
import random

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Users')

def lambda_handler(event, context):
    # Scan the DynamoDB table
    response = table.scan()
    items = response.get('Items', [])
    
    # Filter records with userType 'Agent'
    agents = [item for item in items if item.get('userType') == 'Agent']
    
    if not agents:
        return {
            'statusCode': 404,
            'body': json.dumps('No agents found')
        }
    
    # Randomly select one agent
    selected_agent = random.choice(agents)
    
    return {
        'statusCode': 200,
        'body': json.dumps({'email': selected_agent.get('email')})
    }
