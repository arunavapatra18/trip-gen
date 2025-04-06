# routes.py
from flask import Blueprint, request, jsonify
from llm_model import send_data_to_llm
# Create a blueprint to organize the routes
trip_bp = Blueprint('trip', __name__)

# Define the /generate_trip route to handle POST requests
@trip_bp.route('/trips', methods=['POST'])
def generate_trip():
    # Extract data from the incoming JSON request
    data = request.get_json()
    Description = f"Please Plan a trip from {data['source']} {data['destinations']}"
    trip_data = {"Description": Description}

    # Assuming send_data_to_llm(data) returns a dictionary
    trip_data.update(data)
    meta_data = send_data_to_llm(trip_data)
    # Validate required fields
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    required_fields = [ 'source', 'destinations', 'dateForm','dateto', 'days', 'travellers', 'additionalQuery']
    
    date = data.get('date', None)  # If 'date' is not provided, it defaults to None

    # Response to return
    return jsonify({
        "status": "success",
        "message": "Trip generated successfully",
        "trip_data": meta_data
    }), 201
