import json
from google.cloud import firestore

def close_ticket(request):
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
    ticket_id = request_json.get('ticketId')

    if not ticket_id:
        return (json.dumps({'error': 'ticketId not provided'}), 400, headers)

    # Initialize Firestore client
    db = firestore.Client()

    # Reference to the specific ticket document
    ticket_ref = db.collection('tickets').document(ticket_id)

    try:
        # Update the status of the ticket to 'closed'
        ticket_ref.update({'status': 'closed'})

        # Prepare the response
        response = {
            'message': f'Ticket {ticket_id} status updated to closed'
        }
        return (json.dumps(response), 200, headers)
    except Exception as e:
        return (json.dumps({'error': f'Error updating ticket status: {str(e)}'}), 500, headers)
