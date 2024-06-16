import base64
import json
import firebase_admin
from firebase_admin import credentials, db

# Initialize Firebase Admin SDK with default credentials and specific database URL
if not firebase_admin._apps:
    cred = credentials.ApplicationDefault()
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://sample-311412-default-rtdb.firebaseio.com/'
    })

def process_message(event, context):
    try:
        # Decode the Pub/Sub message
        pubsub_message = base64.b64decode(event['data']).decode('utf-8')
        message_data = json.loads(pubsub_message)
        
        # Log the received message
        print(f"Received message: {message_data}")
        
        # Extract fields from the message data
        customer_id = message_data.get('customerId')
        ticket_id = message_data.get('ticketId')
        query = message_data.get('query')
        
        if not all([customer_id, ticket_id, query]):
            raise ValueError("Missing fields in the message data")
        
        # Create a document in Realtime Database
        ref = db.reference(f'tickets/{ticket_id}')
        ref.set({
            'customerId': customer_id,
            'ticketId': ticket_id,
            'query': query
        })
        
        print(f"Stored message in Realtime Database: {message_data}")
        
    except Exception as e:
        print(f"Error processing message: {e}")
