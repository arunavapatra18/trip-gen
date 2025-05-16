import CreateNewButton from "./create_new"
import TripCard from "./trip_card"

export default function DashboardComponent() {
    return (
        <main className="flex items-center justify-center pt-16 pb-4 md:px-40 px-20">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                <div
                    className="flex min-h-[480px] flex-col gap-6 md:gap-8 bg-cover bg-center bg-no-repeat items-start justify-end px-4 pb-10 md:px-10 rounded-xl"
                    style={{
                        backgroundImage: `linear-gradient(rgba(25, 54, 45, 0.2), rgba(25, 54, 45, 0.6)), url("/bg_dash.svg")`
                    }}
                    >
                    <h1 className="text-4xl text-white drop-shadow-lg font-poetsen">Let's Plan Your Unforgettable Journey</h1>
                </div>
                <div className="flex justify-end">
                    <a href="https://www.freepik.com/" className="max-w-fit text-xs justify-end">Beach Vectors by <span className="text-blue-500">Freepik</span></a>
                </div>
                <div className="flex flex-wrap gap-7 pt-10 w-full max-sm:justify-center">
                    <CreateNewButton />
                    
                </div>
            </div>
        </main>
    )
}