import { useEffect, useState } from "react";
import { getApiClient } from "~/services/apiClient";
import TripCard from "../components/trip_card";

export default function Trips() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const apiClient = getApiClient();
        const response = await apiClient.get("/get_trips");
        setTrips(response.data.trips);
      } catch (err) {
        setError("Failed to fetch trips.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) {
    return <div>Loading trips...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="flex items-center justify-center pt-16 pb-4 md:px-40 px-20">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div>
          <h1>Your Trips</h1>
        </div>
        <div className="flex flex-wrap gap-7 pt-10 w-full max-sm:justify-center">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              id={trip.id}
              source={trip.source}
              destination={trip.destination}
              days={trip.days_count}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
