import json
import boto3
from botocore.exceptions import ClientError
import logging
import uuid
import requests


logger = logging.getLogger()
logger.setLevel("INFO")

def generate_ticket_id():
    return str(uuid.uuid4())

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

def raise_support_ticket(intent_request):
    session_attributes = get_session_attributes(intent_request)
    input_text = get_slot(intent_request, 'choice')
    logger.info(input_text)

    parts = input_text.split(':')
    text = ''
    response, number = parts[0].strip(), parts[1].strip()


    if response and response.lower() == 'yes':
        if number:
            # send the concern to support agent
            ticket_id = create_ticket(number)
            text = "Ticket created successfully with Ticket# " + ticket_id
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

# Function to actually fetch the data.
def fetch_data_dynamo(booking_ref_number):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('booking')

    try:
        response = table.get_item(
            Key={
                'booking-reference-number': booking_ref_number
            }
        )
        logger.info(response)

        # TODO format response as per booking data.
        if 'Item' in response:
            return response['Item']['bookingStatus']
        else:
            return 'No Booking with Reference#' + booking_ref_number

    except ClientError as e:
        # Handle error
        logger.info(ClientError)
        return 'Error fetching booking data. Try after some time.'

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
    text = 'Room is booked' #fetch_data_dynamo(booking_ref_number)
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