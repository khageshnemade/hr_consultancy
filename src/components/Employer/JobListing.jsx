import React, { useState, useEffect } from "react";
import makeRequest from "../../axios";
import { Link } from "react-router-dom";
import { FaEye, FaTrash, FaPen, FaPaperPlane } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job posting?"
    );
    if (!confirmDelete) return;

    try {
      await makeRequest.delete(`employer/jobdetails/${jobId}/`);
      fetchJobs();
      alert("Job deleted successfully");
    } catch (error) {
      alert("Failed to delete the job.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold mb-6 text-red-600 text-center">
          Job Listings
        </h2>

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
                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p>
                    <strong>Salary:</strong> ₹{job.salary}
                  </p>
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {new Date(job.last_date_of_apply).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Skills:</strong> {job.skills_required}
                  </p>
                  <p>
                    <strong>Contact:</strong> {job.contact_email}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      job.is_active
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {job.is_active ? "Active" : "Inactive"}
                  </span>

                  <div className="flex gap-3 text-white text-sm">
                    <Link
                      to={`/employer/applications/${job.job_id}`}
                      data-tooltip-id={`app-${job.job_id}`}
                      className="bg-purple-500 hover:bg-purple-600 p-2 rounded"
                    >
                      <FaPaperPlane />
                      <Tooltip
                        id={`app-${job.job_id}`}
                        content="View Applications"
                      />
                    </Link>

                    <Link
                      to={`/employer/jobs/${job.job_id}`}
                      data-tooltip-id={`view-${job.job_id}`}
                      className="bg-blue-500 hover:bg-blue-600 p-2 rounded"
                    >
                      <FaEye />
                      <Tooltip
                        id={`view-${job.job_id}`}
                        content="View Details"
                      />
                    </Link>

                    <Link
                      to={`/employer/jobs/update/${job.job_id}`}
                      data-tooltip-id={`update-${job.job_id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded"
                    >
                      <FaPen />
                      <Tooltip
                        id={`update-${job.job_id}`}
                        content="Update Job"
                      />
                    </Link>

                    <Link
                      onClick={() => handleDelete(job.job_id)}
                      data-tooltip-id={`delete-${job.job_id}`}
                      className="bg-red-500 hover:bg-red-600 p-2 rounded"
                    >
                      <FaTrash />
                      <Tooltip
                        id={`delete-${job.job_id}`}
                        content="Delete Job"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;
