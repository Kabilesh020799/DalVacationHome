import json
import boto3

def lambda_handler(event, context):
    # Initialize DynamoDB
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Users')
    
    # Log the incoming event
    print("Received event: ", event)
    
    # Get the data from the request
    email = event.get('email')
    provided_answers = [
        event.get('answer1', '').strip().lower(),  # Convert to lowercase
        event.get('answer2', '').strip().lower(),  # Convert to lowercase
        event.get('answer3', '').strip().lower(),  # Convert to lowercase
    ]
    caesar_code = event.get('caesarCode')
    provided_caesar_cipher_response = event.get('caesarCipherAnswer')
    
    # Check if all required inputs are present
    if not email or not all(provided_answers) or not provided_caesar_cipher_response or not caesar_code:
        print("Invalid input")
        return {
            'statusCode': 400,
            'body': json.dumps('Invalid input')
        }
    
    # Fetch the user's security answers and Caesar cipher key from DynamoDB
    response = table.get_item(
        Key={'email': email}
    )
    
    if 'Item' not in response:
        print("User not found")
        return {
            'statusCode': 404,
            'body': json.dumps('User not found')
        }
    
    # Check if 'caesar_key' exists in the response
    if 'caesar_key' not in response['Item']:
        print("Caesar key not found for the user")
        return {
            'statusCode': 404,
            'body': json.dumps('Caesar key not found for the user')
        }
    
    stored_answers = [
        response['Item']['answer1'].strip().lower(),  # Convert to lowercase
        response['Item']['answer2'].strip().lower(),  # Convert to lowercase
        response['Item']['answer3'].strip().lower(),  # Convert to lowercase
    ]
    
    # Retrieve and handle the caesarKey from DynamoDB response
    stored_caesar_key = response['Item']['caesar_key']
    
    print("Stored answers: ", stored_answers)
    print("Provided answers: ", provided_answers)
    
    # Verify the security answers
    if provided_answers != stored_answers:
        print("Security answers do not match")
        return {
            'statusCode': 401,
            'body': json.dumps('Security answers do not match')
        }
    
    # Decode Caesar cipher response
    decoded_caesar_cipher_response = decode_caesar_cipher(caesar_code, stored_caesar_key)
    print("Decoded Caesar cipher response: ", decoded_caesar_cipher_response)
    
    if decoded_caesar_cipher_response != provided_caesar_cipher_response:
        print("Caesar cipher response does not match")
        return {
            'statusCode': 401,
            'body': json.dumps('Caesar cipher response does not match')
        }
    
    return {
        'statusCode': 200,
        'body': json.dumps('Verification successful')
    }

def decode_caesar_cipher(ciphertext, key):
    decoded_text = ''
    for char in ciphertext:
        if char.isalpha():
            if char.isupper():
                decoded_text += chr((ord(char) - int(key) - 65) % 26 + 65)
            else:
                decoded_text += chr((ord(char) - int(key) - 97) % 26 + 97)
        else:
            decoded_text += char
    return decoded_text
