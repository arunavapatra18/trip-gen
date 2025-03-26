# routes.py
from flask import Blueprint, request, jsonify
from llm_model import send_data_to_llm
# Create a blueprint to organize the routes
trip_bp = Blueprint('trip', __name__)

# Define the /generate_trip route to handle POST requests
@trip_bp.route('/generate_trip', methods=['POST'])
def generate_trip():
    # Extract data from the incoming JSON request
    data = request.get_json()
    meta_data= send_data_to_llm(data)
    # Validate required fields
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    required_fields = ['Description', 'start_date', 'source', 'Destination','days']
    
    # #Check if all required fields are present
    # for field in required_fields:
    #     if field not in data:
    #         return jsonify({"error": f"Missing required field: {field}"}), 400

    # Validate the types of the fields
    # if not isinstance(data['Description'], str):
    #     return jsonify({"error": "Field 'days' must be a positive integer"}), 400
    
    # if not isinstance(data['start_date'], str) or not data['source']:
    #     return jsonify({"error": "Field 'source' must be a non-empty string"}), 400
    
    # if not isinstance(data['destination'], list) or not all(isinstance(d, str) for d in data['destination']):
    #     return jsonify({"error": "Field 'destination' must be a list of non-empty strings"}), 400
    
    # if not isinstance(data['passenger'], int) or data['passenger'] <= 0:
    #     return jsonify({"error": "Field 'passenger' must be a positive integer"}), 400

    # Optional field 'date'
    date = data.get('date', None)  # If 'date' is not provided, it defaults to None


    # Response to return
    return jsonify({
        "status": "success",
        "message": "Trip generated successfully",
        "trip_data": meta_data
    }), 201
