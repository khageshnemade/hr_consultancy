import React, { useEffect, useState } from "react";
import makeRequest from "../../axios";
import dayjs from "dayjs";

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    makeRequest
      .get("candidate/applied-jobs/")
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching applied jobs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-blue-600">Loading jobs...</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
        My Applied Jobs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
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
    <div className="border border-gray-200 rounded-lg shadow-sm p-5 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-800">{job.job.title}</h3>
        <span className={`text-sm px-3 py-1 rounded-full ${statusClass}`}>
          {job.status}
        </span>
      </div>

      <p className="text-gray-600 mt-2">{job.job.description}</p>

      <div className="mt-4 flex flex-col gap-1 text-sm text-gray-500">
        <span>
          <strong>Location:</strong> {job.job.location}
        </span>
        <span>
          <strong>Company:</strong> {job.job.company.company_name}
        </span>
        <span>
          <strong>Applied On:</strong>{" "}
          {dayjs(job.applied_on).format("DD MMM YYYY, hh:mm A")}
        </span>
      </div>
    </div>
  );
};

export default AppliedJobs;
