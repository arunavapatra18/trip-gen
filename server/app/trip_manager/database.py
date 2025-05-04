from datetime import datetime, timezone
import json
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import select

db = SQLAlchemy()
migrate = Migrate()


class Trip(db.Model):
    __tablename__ = "trips"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.String, nullable=False)
    source = db.Column(db.String, nullable=False)
    destination = db.Column(db.String, nullable=False)
    start_date = db.Column(db.String, nullable=False)
    end_date = db.Column(db.String, nullable=False)
    days_count = db.Column(db.Integer, nullable=False)
    pax = db.Column(db.Integer, nullable=False)
    trip_json = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    def __repr__(self):
        return f"<Trip {self.id} - {self.source} TO {self.destination}>"


def save_to_db(instance):
    """
    Saves an instance to the database.

    Args:
        instance: The instance to be saved.
    """
    db.session.add(instance)
    db.session.commit()


def add_trip(trip_db_data: Trip):
    """
    Adds a new trip to the database.

    Args:
        trip_data (str): The trip data to be added.

    Returns:
        str: A message indicating that the trip has been added.
    """
    trip = trip_db_data
    save_to_db(trip)
    return f"Added trip"


def get_trip(user_id: str, trip_id: int):
    """
    Retrieves a specific trip from the database by its ID.

    Args:
        trip_id (int): The ID of the trip to retrieve.

    Returns:
        JSON: A JSON response containing the trip data if found,
                 or None if the trip is not found.
    """
    trip = db.session.execute(
        select(Trip).where(Trip.id == trip_id, Trip.user_id == user_id)
    ).scalar_one_or_none()
    if trip:
        return jsonify({"trip": json.loads(trip.trip_json)})
    return None


def get_all_trips(user_id: str):
    """
    Retrieves all trips from the database.

    Returns:
        JSON: A JSON response containing all trip data if found,
                 or None if no trips are found.
    """
    statement = select(Trip.id, Trip.source, Trip.destination, Trip.days_count).where(
        Trip.user_id == user_id
    )
    trips = db.session.execute(statement).all()
    print(trips, type(trips))
    if trips:
        trips_list = [
            {
                "id": trip.id,
                "source": trip.source,
                "destination": trip.destination,
                "days_count": trip.days_count,
            }
            for trip in trips
        ]
        return jsonify({"trips": trips_list})
    return None
