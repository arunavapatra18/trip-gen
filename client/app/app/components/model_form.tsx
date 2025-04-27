import React, { useState, useEffect } from "react";
import { getApiClient } from "~/services/apiClient";

/**
 * @returns {JSX.Element} A modal form for creating a new trip.
 */
export default function ModalForm() {
  const [source, setSource] = useState("");
  const [destinations, setDestinations] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [days, setDays] = useState("");
  const [travellers, setTravellers] = useState("");
  const [additionalQuery, setAdditionalQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (dateFrom && dateTo) {
      const startDate = new Date(dateFrom);
      const endDate = new Date(dateTo);
      const calculatedDays =
        endDate >= startDate
          ? Math.max(
              0,
              Math.floor(
                (endDate.getTime() - startDate.getTime()) /
                  (1000 * 60 * 60 * 24)
              )
            )
          : 0;
      setDays(calculatedDays.toString());
    }
  }, [dateFrom, dateTo]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clearFields();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /**
   * Handles the form submission.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiClient = getApiClient();

      const payload = {
        source,
        destinations: destinations
          .split(",")
          .map((item: string) => item.trim()),
        dateFrom,
        dateTo,
        days,
        travellers,
        additionalQuery,
      };

      const response = await apiClient.post("/generate_trip", payload);

      console.log("Trip generated successfully!", response.data);
      clearFields();

      // TODO : Handle successful resquest
    } catch (error) {
      console.error("Error generating trip:", error);
      // TODO: User facing error
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Clears all the input fields in the form.
   */
  const clearFields = () => {
    setSource("");
    setDateFrom("");
    setDateTo("");
    setDestinations("");
    setDays("");
    setTravellers("");
    setAdditionalQuery("");
  };

  return (
    <div className="sm:w-100 my-10 mx-auto max-sm:mx-5">
      <form onSubmit={handleSubmit}>
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
              min={new Date().toISOString().split("T")[0]}
            />
            <input
              type="date"
              name="dateTo"
              className="input input-bordered w-1/2"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
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

        <div className="flex justify-end mt-4 items-center">
          <button
            type="button"
            className="btn btn-sm btn-ghost mr-5"
            onClick={() => {
              clearFields();
            }}
          >
            Clear Form
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Generating..." : "Generate!"}
          </button>
        </div>
      </form>
    </div>
  );
}
