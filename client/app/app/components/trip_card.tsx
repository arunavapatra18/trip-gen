import { useNavigate } from "react-router";

interface TripCardProps {
  id: number;
  source: string;
  destination: string;
  days: number;
}

export default function TripCard({ id, source, destination, days }: TripCardProps) {
    const navigate = useNavigate()
  return (
    <div>
      <button
        className="card card-border bg-neutral size-50 hover:bg-secondary hover:shadow-md hover:border-gray-400 hover:text-black transition focus:ring-2 focus:ring-blue-500"
        onClick={() => {
            navigate("/trips/"+id)
        }}
      >
        <div className="card-body justify-center items-center cursor-pointer">
          <h2 className="card-title">
            {source} - {destination}
          </h2>
          <p>{days} days</p>
        </div>
      </button>
    </div>
  );
}
