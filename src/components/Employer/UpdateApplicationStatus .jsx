import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import makeRequest from "../../axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateApplicationStatus = () => {
  const { app_id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Shortlisted");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await makeRequest.put(`/employer/update-applicationstatus/${app_id}/`, {
        app_id,
        status,
      });
      toast.success(`Successfully ${status}`);
      navigate(-1); // go back to the previous page
    } catch (error) {
      toast.error("Failed to update status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center text-red-600">
          Update Application Status
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium text-gray-700">
            Select Status:
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-4"
          >
            <option value="Shortlisted">Shortlisted</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            {loading ? "Updating..." : "Update Status"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateApplicationStatus;
