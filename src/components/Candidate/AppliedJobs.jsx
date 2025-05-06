import React, { useEffect, useState } from "react";
import makeRequest from "../../axios";
import dayjs from "dayjs";
import { FaBuilding, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useParams } from "react-router-dom";

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { status } = useParams();
  useEffect(() => {
    makeRequest
      .get("candidate/applied-jobs/")
      .then((res) => {
        let allJobs = res.data;
        if (status) {
          // Normalize for consistent casing
          console.log(status);
          
          const normalizedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
          console.log(normalizedStatus);
          allJobs = allJobs.filter((job) => job.status === normalizedStatus);
        }
        setJobs(allJobs);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching applied jobs:", err);
        setLoading(false);
      });
  }, [status]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-blue-600 text-lg">
        Loading applied jobs...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        📄 My Applied Jobs
      </h2>

      {jobs.length === 0 ? (
        <div className="text-gray-500 text-center">
          You haven’t applied for any jobs yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

const JobCard = ({ job }) => {
  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Shortlisted: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Selected: "bg-blue-100 text-blue-700",
  };

  const statusClass = statusStyles[job.status] || "bg-gray-100 text-gray-700";

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-blue-700">{job.job.title}</h3>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${statusClass}`}
        >
          {job.status}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {job.job.description}
      </p>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-orange-500" />
          Location: {job.job.location}
        </div>
        <div className="flex items-center gap-2">
          <FaBuilding className="text-indigo-500" />
          Company: {job.job.company.company_name}
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="text-purple-500" />
          Applied On: {dayjs(job.applied_on).format("DD MMM YYYY, hh:mm A")}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
