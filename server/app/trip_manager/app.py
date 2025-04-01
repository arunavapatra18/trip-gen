# app.py
from flask import Flask
from routes import trip_bp  # Import the trip blueprint

app = Flask(__name__)

# Register the blueprint with a URL prefix (optional)
app.register_blueprint(trip_bp, url_prefix='/api')  # This makes the route /api/generate_trip

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
