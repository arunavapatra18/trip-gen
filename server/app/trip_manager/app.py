# app.py
from flask import Flask
from flask_cors import CORS
from routes import trip_bp  # Import the trip blueprint

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5173", "http://localhost:5173"])

# Register the blueprint with a URL prefix (optional)
app.register_blueprint(
    trip_bp, url_prefix="/api"
)  # This makes the route /api/generate_trip

# Run the Flask application
if __name__ == "__main__":
    app.run(debug=True)
