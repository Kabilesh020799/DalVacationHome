import json
import firebase_admin
from firebase_admin import credentials, db
from functions_framework import http

# Initialize Firebase Admin SDK with default credentials and specific database URL
if not firebase_admin._apps:
    cred = credentials.ApplicationDefault()
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://sample-311412-default-rtdb.firebaseio.com/'
    })

@http
def get_ticket(request):
    try:
        # Parse the request body
        request_json = request.get_json()
        agent_id = request_json.get('agentId')

        if not agent_id:
            return {
                'statusCode': 400,
                'body': json.dumps({"error": "agentId is required in the request body"}),
                'headers': {'Content-Type': 'application/json'}
            }

        # Fetch all tickets from the Realtime Database
        tickets_ref = db.reference('tickets')
        tickets_snapshot = tickets_ref.get()

        tickets_list = []
        if tickets_snapshot:
            for ticket_id, ticket_data in tickets_snapshot.items():
                if ticket_data.get('agentId') == agent_id:
                    # Fetch agent details from the Realtime Database
                    agent_ref = db.reference(f'agents/{agent_id}')
                    agent_data = agent_ref.get()

                    ticket_info = {
                        'customerId': ticket_data.get('customerId'),
                        'agentId': agent_id,
                        'agentName': agent_data.get('agent_name') if agent_data else None,
                        'query': ticket_data.get('query'),
                        'ticketId': ticket_id
                    }
                    tickets_list.append(ticket_info)

        if not tickets_list:
            return {
                'statusCode': 200,
                'body': json.dumps({"error": f"No tickets found for agent ID {agent_id}"}),
                'headers': {'Content-Type': 'application/json'}
            }

        return {
            'statusCode': 200,
            'body': json.dumps(tickets_list),
            'headers': {'Content-Type': 'application/json'}
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({"error": str(e)}),
            'headers': {'Content-Type': 'application/json'}
        }