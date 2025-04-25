import { CalendarIcon, MapPinIcon } from 'lucide-react'
import type { JSX } from 'react';

interface TripHeaderProps {
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  coverImage: string;
}

const TripHeader = ({
  title,
  destination,
  startDate,
  endDate,
  coverImage
}: TripHeaderProps): JSX.Element => {
  return (
    <div className="mb-8">
      <div className="relative h-64 rounded-xl overflow-hidden mb-6">
        <img
          src={coverImage}
          alt= "trip_cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <MapPinIcon className="w-4 h-4 mr-1" />
                <span>{destination}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span>
                  {startDate} - {endDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
)}

export default TripHeader;