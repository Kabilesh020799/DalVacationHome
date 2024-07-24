import json
import boto3
from botocore.exceptions import ClientError
import logging
import uuid
import requests
from datetime import datetime


logger = logging.getLogger()
logger.setLevel("INFO")

def generate_ticket_id():
    return str(uuid.uuid4())

# Function to create a ticket with random support agent.
def create_ticket(customerId):
    ticket_id = generate_ticket_id()
    url = 'https://us-central1-sample-311412.cloudfunctions.net/publishMessagesToPubSub'
    headers = {
        'Content-Type': 'application/json'
    }
    data = {
        'customerId': customerId,
        'ticketId': ticket_id,
        'query': 'Hi, I need some help!'
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    logger.info(response)
    return ticket_id

# Verify auth token.
def verify_token(token):
    url = 'https://k6k3r19jqf.execute-api.us-east-1.amazonaws.com/prod/verify-token'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
    
    response = requests.post(url, headers=headers, data=json.dumps(''))
    
    if response.status_code == 200:
        data = response.json()
        email = data.get('email')
        return email, True
    elif response.status_code == 401:
        data = response.json()
        message = data.get('message')
        return message, False
    else:
        logger.error(f"Unexpected status code {response.status_code}: {response.text}")
        return None, False


# Function to raise support ticket.
def raise_support_ticket(intent_request):
    session_attributes = get_session_attributes(intent_request)
    input_text = get_slot(intent_request, 'choice')
    logger.info(input_text)

    parts = input_text.split(':')
    text = ''
    response, token = parts[0].strip(), parts[1].strip()

    if response and response.lower() == 'yes':
        if token:
            data, success = verify_token(token)
            if success:
                # send the concern to support agent
                ticket_id = create_ticket(data)
                text = "Ticket created successfully with Ticket# " + ticket_id
            else:
                text = data
        else:
            text = "Please login and raise a support request for your concern."
    elif response and response.lower() == 'no':
        text = "Thank you. Have a nice day!"
    else:
        text = "Invalid response. Must be 'Yes' or 'No'."

    message =  {
        'contentType': 'PlainText',
        'content': text
    }
    fulfillment_state = "Fulfilled"
    return close(intent_request, session_attributes, fulfillment_state, message)

def format_date(date_str):
    dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
    return dt.strftime('%B %d, %Y')

# Function to actually fetch the data.
def fetch_booking_data(booking_ref_number):
    logger.info('booking ref' + booking_ref_number)
    url = 'https://e5yan0pq7h.execute-api.us-east-1.amazonaws.com/dev/get-bookings'
    headers = {
        'Content-Type': 'application/json'
    }
    data = {
        'bookingReference': booking_ref_number
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    try:
        response_data = response.json()
        body_data = json.loads(response_data['body'])
    except (json.JSONDecodeError, KeyError) as e:
        logger.error(f'Error parsing response: {e}')
        return None
    
    if response_data.get("statusCode") == 404:
        return body_data.get("message", "Booking not found")
    
    from_date = format_date(body_data['fromDate'])
    to_date = format_date(body_data['toDate'])
    booking_date = format_date(body_data['timestamp'])
    status = body_data['status']

    formatted_response = f"""From: {from_date}<br>
To: {to_date}<br>
Status: {status}<br>
Booking Date: {booking_date}"""

    logger.info(formatted_response)
    return formatted_response

def get_slots(intent_request):
    return intent_request['sessionState']['intent']['slots']

def get_slot(intent_request, slotName):
    slots = get_slots(intent_request)
    if slots is not None and slotName in slots and slots[slotName] is not None:
        return slots[slotName]['value']['interpretedValue']
    else:
        return None

def get_session_attributes(intent_request):
    sessionState = intent_request['sessionState']
    if 'sessionAttributes' in sessionState:
        return sessionState['sessionAttributes']

    return {}

def close(intent_request, session_attributes, fulfillment_state, message):
    intent_request['sessionState']['intent']['state'] = fulfillment_state
    return {
        'sessionState': {
            'sessionAttributes': session_attributes,
            'dialogAction': {
                'type': 'Close'
            },
            'intent': intent_request['sessionState']['intent']
        },
        'messages': [message],
        'sessionId': intent_request['sessionId'],
        'requestAttributes': intent_request['requestAttributes'] if 'requestAttributes' in intent_request else None
    }

def fetch_booking_info(intent_request):
    session_attributes = get_session_attributes(intent_request)
    booking_ref_number = get_slot(intent_request, 'booking-reference-number')

    #Fetch booking data from DynamoDB
    text = fetch_booking_data(booking_ref_number)
    message =  {
            'contentType': 'PlainText',
            'content': text
        }
    fulfillment_state = "Fulfilled"
    return close(intent_request, session_attributes, fulfillment_state, message)

def dispatch(intent_request):
    intent_name = intent_request['sessionState']['intent']['name']

    # Handle various intents
    if intent_name == 'BookingInformation':
        return fetch_booking_info(intent_request)
    elif intent_name == 'SupportIntent':
        return raise_support_ticket(intent_request)

    raise Exception('Intent with name ' + intent_name + ' not supported')

def lambda_handler(event, context):
    response = dispatch(event)
    return response