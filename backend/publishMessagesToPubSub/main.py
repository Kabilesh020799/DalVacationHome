import os
import json
from google.cloud import pubsub_v1
from flask import escape, jsonify, request

# Initialize a Pub/Sub client
publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path("sample-311412", "pubsub-messages")

def publish_message(data):
    try:
        # Convert the data to JSON string and encode it
        message_data = json.dumps(data).encode('utf-8')
        
        # Publish the message to the specified Pub/Sub topic
        future = publisher.publish(topic_path, data=message_data)
        return future.result()
    except Exception as e:
        print(f"An error occurred: {e}")
        raise

def handle_request(request):
    try:
        # Parse the JSON from the request
        request_json = request.get_json()
        if not request_json:
            raise ValueError("No JSON payload provided")
        
        # Publish the message
        publish_message(request_json)
        
        return "Message published successfully", 200
    except Exception as e:
        return str(e), 400
