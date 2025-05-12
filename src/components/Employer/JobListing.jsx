import React, { useState, useEffect } from "react";
import makeRequest from "../../axios";
import { Link } from "react-router-dom";
import { FaEye, FaTrash, FaPen, FaPaperPlane, FaPlus } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { HiOutlinePlusCircle } from "react-icons/hi";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [jobToDelete, setJobToDelete] = useState(null); // Job ID to delete

  const fetchJobs = async () => {
    try {
      const response = await makeRequest.get("employer/getalljobs/");
      setJobs(response.data);
    } catch (error) {
      setError("Failed to fetch job listings.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    setJobToDelete(jobId); // Set the jobId for deletion
    setShowModal(true); // Show the modal for confirmation
  };

  const confirmDelete = async () => {
    try {
      await makeRequest.delete(`employer/jobdetails/${jobToDelete}/`);
      fetchJobs(); // Refresh job list after delete
      setShowModal(false); // Close the modal
      alert("Job deleted successfully");
    } catch (error) {
      alert("Failed to delete the job.");
      setShowModal(false); // Close the modal if error occurs
    }
  };

  const cancelDelete = () => {
    setShowModal(false); // Close the modal if the user cancels
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 pt-20">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow">
        {/* Heading and Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-red-600">Job Listings</h2>
          <Link
            to="/employer/post"
            data-tooltip-id="add-job"
            className="bg-green-600 hover:bg-green-700 p-2 rounded text-white"
          >
            <HiOutlinePlusCircle className="text-lg" />
            <Tooltip id="add-job" content="Add New Job" />
          </Link>
        </div>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {loading ? (
          <div className="text-center text-red-600">Loading jobs...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {jobs.map((job) => (
              <div
                key={job.job_id}
                className="bg-red-50 p-6 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-red-700 mb-2">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{job.role}</p>

                <div className="text-sm text-gray-800 space-y-1">
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Salary:</strong> ₹{job.salary}</p>
                  <p><strong>Deadline:</strong> {new Date(job.last_date_of_apply).toLocaleDateString()}</p>
                  <p><strong>Skills:</strong> {job.skills_required}</p>
                  <p><strong>Contact:</strong> {job.contact_email}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${job.is_active ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                      }`}
                  >
                    {job.is_active ? "Active" : "Inactive"}
                  </span>

                  <div className="flex gap-3 text-white text-sm">
                    <Link
                      to={`/employer/applications/${job.title}/${job.job_id}`}
                      data-tooltip-id={`app-${job.job_id}`}
                      className="bg-purple-500 hover:bg-purple-600 p-2 rounded"
                    >
                      <FaPaperPlane />
                      <Tooltip id={`app-${job.job_id}`} content="View Applications" />
                    </Link>

                    <Link
                      to={`/employer/jobs/${job.job_id}`}
                      data-tooltip-id={`view-${job.job_id}`}
                      className="bg-blue-500 hover:bg-blue-600 p-2 rounded"
                    >
                      <FaEye />
                      <Tooltip id={`view-${job.job_id}`} content="View Details" />
                    </Link>

                    <Link
                      to={`/employer/jobs/update/${job.job_id}`}
                      data-tooltip-id={`update-${job.job_id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded"
                    >
                      <FaPen />
                      <Tooltip id={`update-${job.job_id}`} content="Update Job" />
                    </Link>

                    <button
                      onClick={() => handleDelete(job.job_id)}
                      data-tooltip-id={`delete-${job.job_id}`}
                      className="bg-red-500 hover:bg-red-600 p-2 rounded"
                    >
                      <FaTrash />
                      <Tooltip id={`delete-${job.job_id}`} content="Delete Job" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Delete Confirmation */}
      {showModal && (
  <div className="fixed inset-0 z-40">
    {/* Modal Background */}
    <div className="bg-black opacity-50 absolute inset-0" />

    {/* Modal Content */}
    <div className="flex justify-center items-center absolute inset-0 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 text-center">
        <h2 className="text-lg font-semibold mb-4">Are you sure you want to Delete this job?</h2>
        <div className="flex justify-between">
          <button
            onClick={confirmDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Yes
          </button>
          <button
            onClick={cancelDelete}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default JobListings;
