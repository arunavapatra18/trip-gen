import type { JSX } from "react"
import TripItineryDay from "./trip_itinery_day"

interface TripItineryListProps {
    days: string[]
}
const TripItineryList = ({
    days
}: TripItineryListProps): JSX.Element => {
    return (
        <div className="space-y-8">
            {days.map((day, index) => (
                <TripItineryDay date={day} dayNumber={index+1} activities={[]}/>
            ))}
        </div>
    )
}

export default TripItineryList