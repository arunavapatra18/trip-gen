import { CirclePlus} from "lucide-react";
import { useNavigate } from "react-router";


export default function CreateNewButton() {
    const navigate = useNavigate();
    return (
        <div>
            <button 
                className="card card-border bg-neutral size-50 hover:bg-secondary hover:shadow-md hover:border-gray-400 hover:text-black transition focus:ring-2 focus:ring-blue-500"
                onClick={() => {
                    navigate("/trips/new_trip")
                }}
            >
                <div className="card-body justify-center items-center cursor-pointer">
                    <CirclePlus size={100}/>
                    <h2 className="card-title justify-center">Create New Trip</h2>
                </div>
            </button>
    </div>
    )  
}
