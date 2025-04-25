import TripHeader from "~/components/trip_header";
import TripItineryList from "~/components/trip_itinery_list";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

export default function Trip() {
    const { trip: tripId } = useParams();
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        async function fetchTrip() {
            const response = await fetch(`http://127.0.0.1:5000/api/get_trips/${tripId}`);
            const data = await response.json();
            setTrip(data);
        }

        fetchTrip();
    }, [tripId]);

    if (!trip) {
        return <div>Loading...</div>;
    }

    return(
        <div className="min-h-screen w-full">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <TripHeader title={trip.title} destination={trip.destinations} startDate={trip.startDate} endDate={trip.endDate} coverImage="/bg_dash.svg"/>
                <TripItineryList days={trip.days}/>
            </div>
        </div>
    )
}