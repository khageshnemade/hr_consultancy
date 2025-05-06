import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import makeRequest from "../../axios";
import { FaLocationArrow, FaRegClock, FaRegMoneyBillAlt, FaRegHandshake, FaMailBulk, FaPhoneAlt, FaArrowLeft } from "react-icons/fa";

const JobDetails = () => {
  const { company_name, org_id } = useParams(); // Get the org_id from URL parameters
  const [jobs, setJobs] = useState([]); // State to hold the jobs data
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await makeRequest.get(`admin/getjobs/${org_id}/`);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs(); // Call the API when the component mounts
  }, [org_id]);

  if (loading) {
    return <div className="text-center p-6 text-gray-500">Loading jobs...</div>;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Back Button Positioned at the Top */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-semibold"
        >
          <FaArrowLeft className="mr-2 text-lg" /> Back to Employers
        </button>
      </div>

      <h2 className="text-3xl font-bold text-gradient mb-6">
        Jobs for {company_name}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.length === 0 ? (
          <p className="text-md text-gray-600">
            No jobs available for this employer.
          </p>
        ) : (
          jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-gray-50"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-3">
                {job.title}
              </h3>
              <p className="text-sm text-gray-700 mb-3">{job.description}</p>

              <div className="flex items-center text-sm text-gray-600 mb-2">
                <FaLocationArrow className="mr-2 text-blue-600" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <FaRegMoneyBillAlt className="mr-2 text-green-500" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <FaRegClock className="mr-2 text-yellow-500" />
                <span>
                  Last Date:{" "}
                  {new Date(job.last_date_of_apply).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-2">
                <FaRegHandshake className="mr-2 text-purple-500" />
                <span>Job Type: {job.job_type}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-2">
                <FaMailBulk className="mr-2 text-indigo-500" />
                <span>{job.contact_email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <FaPhoneAlt className="mr-2 text-orange-500" />
                <span>{job.contact_mobile}</span>
              </div>
              <div className="mt-2">
                <Link
                  to={`/admin/applications/${job.job_id}`}
                  className="inline-block mt-2 text-blue-600 hover:underline text-sm"
                >
                  View Applications
                </Link>
              </div>
          
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobDetails;
