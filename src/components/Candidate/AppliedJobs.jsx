import React, { useEffect, useState } from "react";
import makeRequest from "../../axios";
import dayjs from "dayjs";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaClock,
  FaEnvelope,
  FaPhoneAlt,
  FaSpinner,
  FaTag,
  FaSuitcase,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobDetail, setSelectedJobDetail] = useState(null);
  const { status } = useParams();

  useEffect(() => {
    makeRequest
      .get("candidate/applied-jobs/")
      .then((res) => {
        let allJobs = res.data;
        if (status) {
          const normalizedStatus =
            status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
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

  const handleViewDetails = (jobId) => {
    makeRequest
      .get(`candidate/jobdetail/${jobId}/`)
      .then((res) => {
        setSelectedJobDetail(res.data);
      })
      .catch((err) => {
        console.error("Error fetching job detail:", err);
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 pt-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        📄 <span>My Applied Jobs</span>
      </h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="text-gray-500 text-center">
          You haven’t applied for any jobs yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onViewDetails={handleViewDetails} />
          ))}
        </div>
      )}

      {selectedJobDetail && (
        <div className="mt-10 p-6 border rounded-xl shadow bg-blue-50">
          <h3 className="text-xl font-bold text-blue-800 flex items-center gap-2 mb-3">
            ☎️ Contact Details
          </h3>
          <p className="text-sm text-gray-700 mb-1">
            <FaEnvelope className="inline-block mr-2 text-blue-600" />
            <strong>Email:</strong> {selectedJobDetail.contact_email}
          </p>
          <p className="text-sm text-gray-700">
            <FaPhoneAlt className="inline-block mr-2 text-blue-600" />
            <strong>Mobile:</strong> {selectedJobDetail.contact_mobile}
          </p>
        </div>
      )}
    </div>
  );
};

const JobCard = ({ job }) => {
  const [jobDetail, setJobDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(true);

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Shortlisted: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Selected: "bg-blue-100 text-blue-700",
  };

  const statusClass = statusStyles[job.status] || "bg-gray-100 text-gray-700";

  useEffect(() => {
    makeRequest
      .get(`candidate/jobdetail/${job.job.job_id}/`)
      .then((res) => {
        setJobDetail(res.data);
        setLoadingDetail(false);
      })
      .catch((err) => {
        console.error("Error fetching job detail:", err);
        setLoadingDetail(false);
      });
  }, [job.job.job_id]);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2">
          <FaSuitcase /> {job.job.title}
        </h3>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 ${statusClass}`}>
          <FaTag /> {job.status}
        </span>
      </div>

      <p className="text-gray-600 text-sm line-clamp-3">{job.job.description}</p>

      <div className="text-sm text-gray-700 space-y-2">
        
        <div className="flex items-center gap-2">
          <FaBuilding className="text-indigo-500" />
          <span><strong>Company:</strong> {job.job.company.company_name}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-orange-500" />
          <span><strong>Location:</strong> {job.job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="text-purple-500" />
          <span><strong>Applied On:</strong> {dayjs(job.applied_on).format("DD MMM YYYY, hh:mm A")}</span>
        </div>
      </div>

      {loadingDetail ? (
        <p className="text-gray-400 italic flex items-center gap-2 mt-3">
          <FaSpinner className="animate-spin" /> Loading contact details...
        </p>
      ) : jobDetail ? (
        <div className="pt-3 border-t text-sm text-gray-700 space-y-1">
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-blue-500" />
            <span><strong>Email:</strong> {jobDetail.contact_email}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-green-500" />
            <span><strong>Mobile:</strong> {jobDetail.contact_mobile}</span>
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-sm mt-3">⚠️ Failed to load contact info.</p>
      )}
    </div>
  );
};

export default AppliedJobs;
