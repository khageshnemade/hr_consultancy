import React, { useEffect, useState } from "react";
import makeRequest from "../../axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 

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
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userRole = JSON.parse(localStorage.getItem("user"))?.role;


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
    const user = JSON.parse(localStorage.getItem("user"));
  
    // 🔐 Check if user is logged in
    if (!user || !user.role) {
      toast.warn("Please log in to apply for this job.");
      navigate("/login");
      return;
    }
  
    // 👤 Only Candidates can apply
    if (user.role !== "Candidate") {
      toast.error("Only candidates can apply for jobs.");
      return;
    }
  
    try {
      await makeRequest.post("candidate/job-apply/", {
        status: "Pending",
        job: jobId,
      });
  
      toast.success("Successfully applied to job!");
  
      // ✅ Update local job state to mark as applied
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, isApplied: true } : job
        )
      );
    } catch (error) {
      console.error("Failed to apply:", error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "Failed to apply for job.");
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

    const loadJobs = async () => {
      try {
        setLoading(true);

        let appliedJobsList = [];

        if (userRole === "Candidate") {
          const appliedRes = await makeRequest.get("candidate/applied-jobs/");
          appliedJobsList = appliedRes.data;
        }

        const queryParams = new URLSearchParams();
        if (filters.title) queryParams.append("title", filters.title);
        if (filters.location) queryParams.append("location", filters.location);

        const jobsRes = await makeRequest.get(`candidate/search-jobs/?${queryParams.toString()}`);
        const fetchedJobs = jobsRes.data;

        // Compare based on job_id
        const appliedJobIds = new Set(appliedJobsList.map((aj) => aj.job.job_id));

        const updatedJobs = fetchedJobs.map((job) => ({
          ...job,
          isApplied: appliedJobIds.has(job.job_id),
        }));

        setJobs(updatedJobs);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
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
            <h3 className="text-xl font-semibold text-blue-700 leading-snug line-clamp-2 h-[3.5rem] overflow-hidden">
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
                disabled={job.isApplied || new Date(job.last_date_of_apply) < new Date()}
                onClick={() => handleApply(job.id)}
                className={`text-sm text-white px-4 py-2 rounded-md transition ${job.isApplied
                    ? "bg-gray-400 cursor-not-allowed"
                    : new Date(job.last_date_of_apply) < new Date()
                      ? "bg-red-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
              >
                {job.isApplied
                  ? "Already Applied"
                  : new Date(job.last_date_of_apply) < new Date()
                    ? "Expired"
                    : "Apply Now"}
              </button>



            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
