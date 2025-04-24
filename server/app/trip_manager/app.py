# app.py
from flask import Flask
from flask_cors import CORS

from database import db, migrate, Trip
from routes import trip_bp


def create_app():
    """
    Creates and configures the Flask application.

    Returns:
        app: The configured Flask application.
    """
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///trips.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    CORS(app, origins=["http://127.0.0.1:5173", "http://localhost:5173"])

    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(trip_bp, url_prefix="/api")

    with app.app_context():
        db.create_all()

    return app


# Run the Flask application
if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)
