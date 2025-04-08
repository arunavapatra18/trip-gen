import React, { useState, useEffect } from 'react';

/**
 * @returns {JSX.Element} A modal form for creating a new trip.
 */
export default function ModalForm() {
    const [source, setSource] = useState('');
    const [destinations, setDestinations] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [days, setDays] = useState('');
    const [travellers, setTravellers] = useState('');
    const [additionalQuery, setAdditionalQuery] = useState('');

    useEffect(() => {
        if (dateFrom && dateTo) {
            const startDate = new Date(dateFrom);
            const endDate = new Date(dateTo);
            const calculatedDays = endDate >= startDate ? Math.max(0, Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))) : 0;
            setDays(calculatedDays.toString());
        }
    }, [dateFrom, dateTo]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSource('');
                setDateFrom('');
                setDateTo('');
                setDestinations('');
                setDays('');
                setTravellers('');
                setAdditionalQuery('');
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    /**
     * Handles the form submission.
     * @param {React.FormEvent} e - The form event.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('https://example.com/api/trips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    source,
                    destinations: destinations.split(',').map((item: string) => item.trim()),
                    dateFrom,
                    dateTo,
                    days,
                    travellers,
                    additionalQuery,
                }),
            });

            if (response.ok) {
                // Handle success (e.g., display a message, close the modal)
                console.log('Trip generated successfully!');
                (document.getElementById('form_modal') as HTMLDialogElement)?.close();
            } else {
                // Handle error (e.g., display an error message)
                console.error('Failed to generate trip:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    /**
     * Clears all the input fields in the form.
     */
    const clearFields = () => {
        setSource('');
        setDateFrom('');
        setDateTo('');
        setDestinations('');
        setDays('');
        setTravellers('');
        setAdditionalQuery('');
    };

    return (
        <dialog id="form_modal" className="modal">
            <div className="modal-box">
                <form method="dialog" onSubmit={handleSubmit}>
                    <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => {
                            (document.getElementById('form_modal') as HTMLDialogElement)?.close();
                            clearFields();
                        }}
                    >
                        ✕
                    </button>

                    <h1 className="font-bold text-2xl">New Trip</h1>

                    <div className="mt-4">
                        <label className="block mb-1">Source</label>
                        <input
                            type="text"
                            name="source"
                            className="input input-bordered w-full"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1">Destinations</label>
                        <input
                            type="text"
                            name="destinations"
                            className="input input-bordered w-full"
                            value={destinations}
                            onChange={(e) => setDestinations(e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1">Start Date - End Date (Optional)</label>
                        <div className="flex">
                            <input
                                type="date"
                                name="dateFrom"
                                className="input input-bordered w-1/2 mr-2"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                            />
                            <input
                                type="date"
                                name="dateTo"
                                className="input input-bordered w-1/2"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1">Days</label>
                        <input
                            type="number"
                            name="days"
                            className="input input-bordered w-full"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                            min="1"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1">Number of Travellers</label>
                        <input
                            type="number"
                            name="travellers"
                            className="input input-bordered w-full"
                            value={travellers}
                            onChange={(e) => setTravellers(e.target.value)}
                            min="1"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1">Additional Query</label>
                        <textarea
                            name="additionalQuery"
                            className="textarea textarea-bordered w-full"
                            value={additionalQuery}
                            onChange={(e) => setAdditionalQuery(e.target.value)}
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
