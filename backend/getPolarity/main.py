import json
from google.cloud import language_v1
import requests


def analyze_sentiment(request):
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

    # Define the API Gateway endpoint to get all feedback and corresponding booking ref number
    api_endpoint = 'https://sgegq6ro6b.execute-api.us-east-1.amazonaws.com/prod/'

    # Make a POST request to the API Gateway endpoint
    try:
        api_response = requests.post(api_endpoint, json={})
        api_response.raise_for_status()
    except requests.RequestException as e:
        return (json.dumps({'error': 'Error calling API Gateway: {}'.format(str(e))}), 500, headers)

    # Parse the response from the API Gateway
    api_response_json = api_response.json()
    print('feedback from api: ', api_response_json)

    # Check if the response is valid and contains 'body'
    if 'body' not in api_response_json:
        return (json.dumps({'error': 'Invalid response from API Gateway'}), 500, headers)

    feedback_entries = api_response_json['body']

    # Initialize the Google Cloud Natural Language API client
    client = language_v1.LanguageServiceClient()

    analyzed_items = []

    # Analyze sentiment for each feedback entry
    for entry in feedback_entries:
        feedback = entry.get('feedback')
        bookingref = entry.get('bookingref')

        if feedback:
            # Prepare the document to be analyzed
            document = language_v1.Document(content=feedback, type_=language_v1.Document.Type.PLAIN_TEXT)

            # Use the client to analyze the sentiment of the feedback
            sentiment = client.analyze_sentiment(request={'document': document}).document_sentiment

            # Determine sentiment category based on score
            if sentiment.score >= 0.25:
                sentiment_category = 'positive'
            elif sentiment.score <= -0.25:
                sentiment_category = 'negative'
            else:
                sentiment_category = 'neutral'

            # Append analyzed data to the list
            analyzed_items.append({
                'feedback': feedback,
                'bookingref': bookingref,
                'sentiment_category': sentiment_category
            })

    # Prepare the final response
    response = {
        'analyzed_feedback': analyzed_items
    }

    # Define the endpoint to send the analyzed data
    update_endpoint = 'https://sgegq6ro6b.execute-api.us-east-1.amazonaws.com/prod/updatesentiment'

    # Make a POST request to the update API endpoint
    try:
        update_response = requests.post(update_endpoint, json=response)
        update_response.raise_for_status()
    except requests.RequestException as e:
        return (json.dumps({'error': 'Error calling update API: {}'.format(str(e))}), 500, headers)

    # Return the final response
    return (json.dumps(response), 200, headers)

    #return (json.dumps(response), 200, headers)