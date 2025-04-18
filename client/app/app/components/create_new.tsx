import ModalForm from "./model_form";

export default function CreateNewButton() {
    return (
        <div>
            <button 
                className="card card-border bg-base-100 size-50 hover:bg-gray-400 hover:shadow-md hover:border-gray-400 hover:text-black transition focus:ring-2 focus:ring-blue-500"
                onClick={() => (document.getElementById('form_modal') as HTMLDialogElement)?.showModal()}
            >
                <div className="card-body justify-center">
                    <div className="border-4 border-gray-500 rounded-full size-20 text-center mr-auto ml-auto">
                            <span className="text-7xl text-gray-500">+</span>
                    </div>
                    <h2 className="card-title justify-center">Create New Trip</h2>
                </div>
            </button>
            <ModalForm />
    </div>
    )  
}
