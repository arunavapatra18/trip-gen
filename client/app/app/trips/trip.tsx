import TripHeader from "~/components/trip_header";
import TripItineryList from "~/components/trip_itinery_list";

export default function Trip() {
    return(
        <div className="min-h-screen w-full">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <TripHeader title="Exploring Japan" destination="Tokyo,Kyoto,Osaka" startDate="Oct 15, 2023" endDate="Oct 22, 2023" coverImage="/bg_dash.svg"/>
                <TripItineryList days={["ABC", "DEF", "GHI"]}/>
            </div>
        </div>
    )
}