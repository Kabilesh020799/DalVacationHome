import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Users')

def lambda_handler(event, context):
    try:
        email = event['email']
        name = event['name']
        userType = event['userType']
        password = event['password']
        
        print(f'Received data: email={email}, name={name}, userType={userType}, password={password}')
        
        # Add the user to the DynamoDB table
        table.put_item(
            Item={
                'email': email,
                'name': name,
                'userType': userType,
                'password': password
            }
        )
        
        # Log success message
        print('User added successfully to DynamoDB')
        
        return {
            'statusCode': 200,
            'body': json.dumps('User added successfully')
        }
        
    except KeyError as e:
        # Log missing key error and return bad request response
        error_message = f'KeyError: {str(e)}'
        print(error_message)
        return {
            'statusCode': 400,
            'body': json.dumps(error_message)
        }
    except ClientError as e:
        # Log client error and return error response
        error_message = f'ClientError: {e.response["Error"]["Message"]}'
        print(error_message)
        return {
            'statusCode': 400,
            'body': json.dumps(error_message)
        }
    except Exception as e:
        # Log unexpected exception and return internal server error response
        error_message = f'Exception: {str(e)}'
        print(error_message)
        return {
            'statusCode': 500,
            'body': json.dumps('Internal server error')
        }
