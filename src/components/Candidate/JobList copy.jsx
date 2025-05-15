import React, { useEffect, useState } from "react";
import makeRequest from "../../axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";
import SearchBar from "../SearchBar";
import { useLocation } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  
  const fetchJobs = async (filters = {}) => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (filters.title) params.append("title", filters.title);
      if (filters.location) params.append("location", filters.location);

      const url = `candidate/search-jobs/?${params.toString()}`;
      const response = await makeRequest.get(url);
      setJobs(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    try {
      await makeRequest.post("candidate/job-apply/", {
        status: "Pending",
        job: jobId,
      });
      toast.success("Successfully applied to job!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const defaultTitle = params.get("title") || "";
  const defaultLocation = params.get("location") || "";
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filters = {
      title: params.get("title") || "",
      location: params.get("location") || "",
    };
  
    fetchJobs(filters);
  }, [location.search]);
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pt-20">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">
          🔥 Latest Job Openings
        </h2>
        <SearchBar
  onSearch={fetchJobs}
  defaultTitle={defaultTitle}
  defaultLocation={defaultLocation}
/>
      </div>

      {loading && <div className="text-blue-500">Loading jobs...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && jobs.length === 0 && (
  <div className="text-gray-500 mt-8 text-center">No jobs found matching your criteria.</div>
)}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {jobs?.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all p-5"
          >
            <div className="mb-2">
              <h3 className="text-xl font-semibold text-blue-700">
                {job.title}
              </h3>
              <p className="text-sm text-gray-500">{job.company_name}</p>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <FaBriefcase className="text-green-500" />
                <span>{job.job_type}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-orange-500" />
                <span>{job.location}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaMoneyBillWave className="text-green-600" />
                <span>{job.salary || "Not specified"}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-red-500" />
                <span>
                  Apply by:{" "}
                  {new Date(job.last_date_of_apply).toLocaleDateString()}
                </span>
              </p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <Link
                to={`/candidate/job-details/${job.job_id}`}
                className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
              >
                View Details
              </Link>
              <button
                onClick={() => handleApply(job.id)}
                className="text-sm text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
