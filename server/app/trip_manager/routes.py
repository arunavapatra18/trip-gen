import json
from database import add_trip, get_all_trips, get_trip
from flask import Blueprint, Response, request, jsonify
from llm_model import generate_trip_from_llm

# Create a blueprint to organize the routes
trip_bp = Blueprint("trip", __name__)


@trip_bp.route("/generate_trip", methods=["POST"])
def generate_trip() -> Response:
    """
    Generate a new trip plan based on user-provided details.

    Receives a JSON payload containing trip details such as source, destinations,
    dates, duration, and number of travelers.  Generates a realistic daily
    itinerary with locations, meals, and activities, varying each day and
    including times and short descriptions.

    Returns:
        Response: A JSON response containing the status, message, and trip data
                  if the trip is generated successfully, or an error message
                  with a 400 status code if no data is provided.
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    message = f"Trip plan from {data['source']} to {data['destinations']}  \
                Dates: {data['dateFrom']} to {data['dateTo']} | Duration: {data['days']} days | Travelers: {data['travellers']}  \
                Generate a realistic daily itinerary with locations, meals, and activities. Vary each day, include times and short descriptions."

    ################# LLM API CALL + STORE IN DB ####################
    # llm_response = generate_trip_from_llm(message)

    # add_trip(llm_response)
    #################################################################

    with open("data.json", "r") as f:
        llm_response = json.load(f)

    return (
        jsonify(
            {
                "status": "success",
                "message": "Trip generated successfully",
                "trip_data": llm_response,
            }
        ),
        201,
    )


@trip_bp.route("/get_trips/<int:trip_id>", methods=["GET"])
def get_trip_by_id(trip_id: int):
    """
    Retrieve a specific trip by its ID.

    Args:
        trip_id (int): The ID of the trip to retrieve.

    Returns:
        Response: A JSON response containing the trip data if found,
                  or an error message with a 404 status code if not found.
    """
    with open("data.json", "r") as f:
        llm_response = json.load(f)
    trip = jsonify(llm_response)
    if trip:
        return trip
    return jsonify({"error": "Trip not found"}), 404


@trip_bp.route("/get_trips", methods=["GET"])
def get_trips():
    """
    Retrieve all trips.

    Returns:
        Response: A JSON response containing all trip data if found,
                  or an error message with a 404 status code if not found.
    """
    trip = get_all_trips()
    if trip:
        return trip
    return jsonify({"error": "Trip not found"}), 404
