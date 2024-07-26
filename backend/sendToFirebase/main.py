import base64
import json
import firebase_admin
from firebase_admin import credentials, db
from google.cloud import firestore
from datetime import datetime
import requests

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
        
        # Retrieve agents from the Realtime Database
        '''agents_ref = db.reference('agents')
        agents = agents_ref.get()
        
        if not agents:
            raise ValueError("No agents found in the database")

        # Randomly select an agent
        agent_id = random.choice(list(agents.keys()))
        agent_data = agents[agent_id]
        agent_name = agent_data.get('agent_name')

        if not agent_id or not agent_name:
            raise ValueError("Missing agent_id or agent_name in the selected agent data")'''
        
        #url = 
        agent_response = requests.get("https://e5yan0pq7h.execute-api.us-east-1.amazonaws.com/dev/random-agent")
        agent_id = "defaultagent@gmail.com"
        if agent_response.status_code == 200:
            agent_id = agent_response.json()
        else:
            raise Exception(f"Failed to get agent ID: {response.status_code}")

        # Create a document in Realtime Database
        #ref = db.reference(f'tickets/{ticket_id}')
        '''ref.set({
            'customerId': customer_id,
            'ticketId': ticket_id,
            'query': query,
            'agentId': agent_id,
            'status': 'created'
        })'''

        current_time = datetime.utcnow()
    
        # Format the timestamp as a string
        timestamp_str = current_time.strftime('%Y-%m-%dT%H:%M:%S.%fZ')  # ISO 8601 format

        # Initialize Firestore client
        firestore_db = firestore.Client()

        # Create entry dictionary
        create_entry = {
            'agentId': agent_id,
            'customerId': customer_id,
            'messages': [{
                'from': customer_id,
                'message': query,
                'read': False,
                'to': agent_id
            }],
            'status': 'created',
            'ticketId': ticket_id,
            'timestamp': timestamp_str
        }
    
        # Define Firestore collection and document
        collection_name = 'tickets'
        document_id = ticket_id  # Use ticket_id as the document ID
        tickets_ref = firestore_db.collection(collection_name).document(document_id)

        try:
            # Store the entry in Firestore
            tickets_ref.set(create_entry)
            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'Ticket stored successfully in Firestore db with agentId'})
            }
        except Exception as e:
            return {
                'statusCode': 500,
                'body': json.dumps({'error': 'Error storing ticket: {}'.format(str(e))})
            }
        
    except Exception as e:
        print(f"Error processing message: {e}")
