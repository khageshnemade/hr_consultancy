import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import makeRequest from "../../axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateApplicationStatus = () => {
  const { istatus, app_id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (istatus) setStatus(istatus);
  }, [istatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await makeRequest.put(`/employer/update-applicationstatus/${app_id}/`, {
        app_id,
        status,
      });
      toast.success(`Application status updated to "${status}"`);
      navigate(-1); // Go back to the previous page
    } catch (error) {
      toast.error("❌ Failed to update status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-20">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 flex items-center text-red-600 hover:text-red-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
          Update Application Status
        </h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="status" className="block mb-2 font-medium text-gray-700">
            Select Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="Pending">Pending</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-medium ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 transition"
            }`}
          >
            {loading ? "Updating..." : "Update Status"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateApplicationStatus;
