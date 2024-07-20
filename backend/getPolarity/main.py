import json
from google.cloud import language_v1

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

    # Parse the request JSON
    request_json = request.get_json(silent=True)
    feedback = request_json.get('feedback')

    if not feedback:
        return (json.dumps({'error': 'Feedback not provided'}), 400, headers)

    # Initialize the Google Cloud Natural Language API client
    client = language_v1.LanguageServiceClient()

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

    # Prepare the response
    response = {
        'feedback': feedback,
        'sentiment_category': sentiment_category
    }

    return (json.dumps(response), 200, headers)
