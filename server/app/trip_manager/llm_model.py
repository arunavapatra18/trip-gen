import requests
import json
from dotenv import load_dotenv
import os
from .config import api_key

# Load trip schema
with open("trip_schema.json", "r") as f:
    trip_schema = json.load(f)


def generate_trip_from_llm(trip_input: str) -> dict:
    """
    Generates a trip itinerary from a language model based on the given input.

    Args:
        trip_input (str): A string containing the user's desired trip details.

    Returns:
        dict: A dictionary containing the generated trip itinerary.
    """
    response = requests.post(
        url=os.getenv("URL"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json={
            "model": "google/gemini-2.0-flash-001",
            "messages": [{"role": "user", "content": str(trip_input)}],
            "response_format": {
                "type": "json_schema",
                "json_schema": {
                    "name": "trip_itinery",
                    "strict": True,
                    "schema": trip_schema,
                },
            },
        },
    )
    data = response.json()
    json_response = json.loads(data["choices"][0]["message"]["content"])
    return json_response
