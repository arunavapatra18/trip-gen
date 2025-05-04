import TripHeader from "~/components/trip_header";
import TripItineryList from "~/components/trip_itinery_list";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getApiClient } from "~/services/apiClient";

export default function Trip() {
  const { trip: tripId } = useParams();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchTripData = async () => {
      try {
        const apiClient = getApiClient();
        
        const response = await apiClient.get(`/get_trips/${tripId}`);
        
        setTrip(response.data.trip);
      } catch (err) {
        setError("Failed to fetch trip data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (tripId) {
      fetchTripData();
    }
  }, [tripId]);

  if (loading) {
    return <div>Loading trip...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!trip) {
    return <div>Trip not found.</div>;
  }
  
  return (
    <div className="min-h-screen w-full">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <TripHeader
          title={trip.title}
          destination={trip.destinations}
          startDate={trip.startDate}
          endDate={trip.endDate}
          coverImage="/bg_dash.svg"
        />
        <TripItineryList days={trip.days} />
      </div>
    </div>
  );
}
