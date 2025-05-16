import { ClockIcon } from "lucide-react";
import type { JSX } from "react";

interface TripItineryActivityProps {
    time: string,
    title: string,
    description: string,
    imageUrl: string,
    isLast: boolean
}

const TripItineryActivity = ({
    time,
    title,
    description,
    imageUrl,
    isLast
}: TripItineryActivityProps): JSX.Element => {
    return (
        <div className="flex">
            <div className="mr-4 flex flex-col items-center">
                <div className="rounded-full bg-secondary p-2 flex items-center justify-center">
                    <ClockIcon className="h-4 w-4 text-secondary-content" />
                </div>
                {!isLast && <div className="w-px h-full bg-blue-200 mt-2"></div>}
            </div>
            <div className="flex-1">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="text-sm font-medium text-gray-500">{time}</div>
                            <h3 className="text-lg font-semibold mt-1">{title}</h3>
                            <p className="text-gray-400 mt-1">{description}</p>
                        </div>
                    {imageUrl && (
                    <div className="sm:w-32 h-24 sm:h-32 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TripItineryActivity