import React, { useEffect, useState } from "react";
import axios from 'axios'; 
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBuilding,
} from "react-icons/fa";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingEmployers, setLoadingEmployers] = useState(true);
  const [jobError, setJobError] = useState("");
  const [employerError, setEmployerError] = useState("");
  const location = useLocation();

  const fetchJobs = async () => {
    setLoadingJobs(true);
    setJobError("");
  
    // Read query params
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get("title") || "";
    const loc = searchParams.get("location") || "";
  
    try {
      const response = await axios.get(
        `https://consultancy.scholarnet.in/api/candidate/search-jobs/?title=${encodeURIComponent(title)}&location=${encodeURIComponent(loc)}`
      );
      setJobs(response.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobError("Failed to fetch jobs.");
    } finally {
      setLoadingJobs(false);
    }
  };
  
  useEffect(() => {
    fetchJobs();
    fetchEmployers();
  }, [location.search]);
  const fetchEmployers = async () => {
    try {
      const response = await axios.get("https://consultancy.scholarnet.in/api/candidate/getallEmployers");
      setEmployers(response.data);
    } catch (err) {
      console.error("Error fetching employers:", err);
      setEmployerError("Failed to fetch employer data.");
    } finally {
      setLoadingEmployers(false);
    }
  };

  const handleApply = async () => {
    try {
      await axios.post("candidate/job-apply/", {
        status: "Pending",
        job: jobId,
      });
      toast.success("Successfully applied to job!");
    } catch (error) {
      console.error("Failed to apply:", error);
      toast.error("Failed to apply. Please try again.");
    }
  };

  const getCompanyName = (jobCompanyName) => {
    const match = employers.find(
      (emp) => emp.employer?.company_name === jobCompanyName
    );
    return match?.employer?.company_name || jobCompanyName;
  };

  useEffect(() => {
    fetchJobs();
    fetchEmployers();
  }, []);

  return (
<div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
<h1 className="text-4xl font-bold text-blue-800 mb-10 text-center">
        Welcome to Job Portal 🧑‍💼
      </h1>

      {/* Jobs Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          🔥 Latest Job Openings
        </h2>

        {loadingJobs ? (
          <p className="text-blue-500 text-center">Loading jobs...</p>
        ) : jobError ? (
          <p className="text-red-500 text-center">{jobError}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
          <div
          key={job.job_id}
          className="bg-white rounded-xl shadow hover:shadow-xl transition-all duration-300 p-6"
        >
          <div className="mb-2">
            <h3 className="text-xl font-semibold text-blue-700">{job.title}</h3>
            <p className="text-sm text-gray-500">
              {getCompanyName(job.company_name)}
            </p>
          </div>
        
          <div className="space-y-1 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <FaBriefcase className="text-green-500" />
              {job.job_type}
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-orange-500" />
              {job.location}
            </p>
            <p className="flex items-center gap-2">
              <FaMoneyBillWave className="text-green-600" />
              {job.salary || "Not specified"}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-red-500" />
              Apply by: {new Date(job.last_date_of_apply).toLocaleDateString()}
            </p>
          </div>
        
          <div className="mt-4 flex justify-between items-center">
            <Link
              to={`/candidate/job-details/${job.job_id}`}
              className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
            >
              View Details
            </Link>
            <button
              onClick={() => handleApply(job.job_id)}
              className="text-sm text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
            >
              Apply Now
            </button>
          </div>
        </div>
        
            ))}
          </div>
        )}
      </section>

      {/* Employers Section */}
      <section className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          🏢 Companies Hiring
        </h2>

        {loadingEmployers ? (
          <p className="text-blue-500 text-center">Loading employers...</p>
        ) : employerError ? (
          <p className="text-red-500 text-center">{employerError}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {employers.map((emp, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-2 mb-2 text-blue-800">
                  <FaBuilding />
                  <span className="font-medium">
                    {emp.employer?.company_name}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Industry: {emp.employer?.industry_type}
                </p>
                <p className="text-sm text-gray-500">
                  City: {emp.employer?.city}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
