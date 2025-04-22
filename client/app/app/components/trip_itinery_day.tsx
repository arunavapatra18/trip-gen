import { CalendarDaysIcon } from "lucide-react";
import TripItineryActivity from "./trip_itinery_activity";
import type { JSX } from "react";

interface TripItineryDayProps {
    dayNumber: number,
    date: string,
    activities: string[]
}

const TripItineryDay = ({
    dayNumber,
    date,
    activities
}: TripItineryDayProps): JSX.Element => {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gray-700 text-white p-4">
                <div className="flex items-center">
                    <CalendarDaysIcon className="mr-2 h-5 w-5" />
                    <h2 className="text-xl font-bold">
                        Day {dayNumber} - {date}
                    </h2>
                </div>
                <div className="p-4">
                    <div className="space-y-6">
                            <TripItineryActivity title="Arrival at Narita International Airport" description="Flight NH203 arrives. Proceed through immigration and collect baggage." isLast={false} imageUrl="/bg_main.jpg" time="09:00 AM"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripItineryDay