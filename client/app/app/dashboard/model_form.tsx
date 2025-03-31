export default function ModalForm() {
    return (
        <dialog id="form_modal" className="modal">
            <div className="modal-box">
                <form method="dialog"> 
                    {/* Close button with type="button" */}
                    <button 
                        type="button" 
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => (document.getElementById('form_modal') as HTMLDialogElement)?.close()}
                    >
                        ✕
                    </button>
                    
                    <h1 className="font-bold text-2xl">New Trip</h1>

                    <div className="mt-4">
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1">Description</label>
                        <textarea
                            name="description"
                            className="textarea textarea-bordered w-full"
                            required
                        />
                    </div>

                    <div className="flex justify-end mt-4">
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                        >
                            Generate!
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
