import json
import jwt
import datetime

# JWT secret key
SECRET_KEY = 'E47C87FF-48EC-4FB2-ABDA-514CB4B1B365'

def lambda_handler(event, context):
    if event['httpMethod'] == 'POST' and event['resource'] == '/get-token':
        return handle_generate_token(event)
    elif event['httpMethod'] == 'POST' and event['resource'] == '/verify-token':
        return handle_verify_token(event)
    else:
        return {
            'statusCode': 404,
            'body': json.dumps({'message': 'Not Found'})
        }

# Method to generate JWT token
def handle_generate_token(event):
    body = json.loads(event['body'])
    email = body['email']
    userType = body['userType']

    payload = {
        'email': email,
        'userType': userType,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return {
        'statusCode': 200,
        'body': json.dumps({'token': token})
    }

# Verify token
def handle_verify_token(event):
    token = event['headers'].get('Authorization')
    
    if not token:
        return {
            'statusCode': 401,
            'body': json.dumps({'message': 'Token is missing'})
        }

    try:
        token = token.split()[1]  # Remove 'Bearer' prefix
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return {
            'statusCode': 200,
            'body': json.dumps({'email': payload['email'], 'userType': payload['userType']})
        }
    except jwt.ExpiredSignatureError:
        return {
            'statusCode': 401,
            'body': json.dumps({'message': 'Token has expired'})
        }
    except jwt.InvalidTokenError:
        return {
            'statusCode': 401,
            'body': json.dumps({'message': 'Invalid token'})
        }
