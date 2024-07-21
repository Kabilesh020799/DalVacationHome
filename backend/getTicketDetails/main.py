import json
from google.cloud import firestore

def get_ticket(request):
    # Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    # Parse the request JSON
    request_json = request.get_json(silent=True)
    userId = request_json.get('userId')
    userType = request_json.get('userType')

    if not userId or not userType:
        return (json.dumps({'error': 'userId or userType not provided'}), 400, headers)

    # Initialize Firestore client
    db = firestore.Client()

    # Reference to the 'tickets' collection
    tickets_ref = db.collection('tickets')

    if userType == 'AGENT':
        # Query the collection based on the 'agentId' field
        query = tickets_ref.where('agentId', '==', userId)  # Fixed variable name
        try:
            # Execute the query
            results = query.stream()

            # Collect the results
            tickets = [doc.to_dict() for doc in results]

            # Prepare the response
            response = {
                'tickets': tickets
            }
            return (json.dumps(response), 200, headers)
        except Exception as e:
            return (json.dumps({'error': 'Error querying Firestore: {}'.format(str(e))}), 500, headers)
    elif userType == 'CUSTOMER':
        # Query the collection based on the 'agentId' field
        query = tickets_ref.where('customerId', '==', userId)  # Fixed variable name
        try:
            # Execute the query
            results = query.stream()

            # Collect the results
            tickets = [doc.to_dict() for doc in results]

            # Prepare the response
            response = {
                'tickets': tickets
            }
            return (json.dumps(response), 200, headers)
        except Exception as e:
            return (json.dumps({'error': 'Error querying Firestore: {}'.format(str(e))}), 500, headers)
    else:
        return (json.dumps({'error': 'Invalid userType'}), 400, headers)
