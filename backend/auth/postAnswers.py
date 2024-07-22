import json
import boto3
import logging

# Initialize logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Users')

def lambda_handler(event, context):
    logger.info(f"Received event: {json.dumps(event)}")

    try:
        email = event['email']
        response = table.get_item(Key={'email': email})
        if 'Item' in response:
            table.update_item(
                Key={'email': email},
                UpdateExpression="set answer1=:a1, answer2=:a2, answer3=:a3, caesar_key=:ck",
                ExpressionAttributeValues={
                    ':a1': event['answer1'],
                    ':a2': event['answer2'],
                    ':a3': event['answer3'],
                    ':ck': event['caesarKey']
                }
            )
            logger.info(f"User {email} updated successfully.")
            return {
                'statusCode': 200,
                'body': json.dumps('Security answers and Caesar key updated successfully!')
            }
        else:
            logger.warning(f"User {email} does not exist.")
            return {
                'statusCode': 400,
                'body': json.dumps('User does not exist')
            }
    except Exception as e:
        logger.error(f"Error saving user: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error saving user: {str(e)}")
        }
