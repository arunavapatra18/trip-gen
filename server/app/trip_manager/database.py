from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()


class Trip(db.Model):
    __tablename__ = "trips"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    trip = db.Column(db.Text, nullable=False)


def save_to_db(instance):
    db.session.add(instance)
    db.session.commit()


def add_trip(trip_data):
    user = Trip(trip=trip_data)
    save_to_db(user)
    return f"Added trip"
