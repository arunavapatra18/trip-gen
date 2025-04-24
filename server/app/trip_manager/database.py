from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import select

db = SQLAlchemy()
migrate = Migrate()


class Trip(db.Model):
    __tablename__ = "trips"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    trip = db.Column(db.Text, nullable=False)


def save_to_db(instance):
    """
    Saves an instance to the database.

    Args:
        instance: The instance to be saved.
    """
    db.session.add(instance)
    db.session.commit()


def add_trip(trip_data: str):
    """
    Adds a new trip to the database.

    Args:
        trip_data (str): The trip data to be added.

    Returns:
        str: A message indicating that the trip has been added.
    """
    trip = Trip(trip=trip_data)
    save_to_db(trip)
    return f"Added trip"


def get_trip(trip_id: int):
    """
    Retrieves a specific trip from the database by its ID.

    Args:
        trip_id (int): The ID of the trip to retrieve.

    Returns:
        JSON: A JSON response containing the trip data if found,
                 or None if the trip is not found.
    """
    trip = db.session.get(Trip, trip_id)
    if trip:
        return jsonify({"id": trip.id, "trip": trip.trip})
    return None


def get_all_trips():
    """
    Retrieves all trips from the database.

    Returns:
        JSON: A JSON response containing all trip data if found,
                 or None if no trips are found.
    """
    statement = select(Trip.trip)
    trips = db.session.scalars(statement).all()
    if trips:
        return jsonify({"trips": trips})
    return None
