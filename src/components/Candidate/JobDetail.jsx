import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import makeRequest from "../../axios";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaGift,
} from "react-icons/fa";

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await makeRequest.get(`candidate/jobdetail/${jobId}/`);
        setJob(res.data);
      } catch (err) {
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();

    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      setUserRole(user.role);
    }
  }, [jobId]);

  const handleApply = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    // Redirect if not logged in
    if (!user || !user.role) {
      toast.warn("Please log in to apply for this job.");
      navigate("/login");
      return;
    }
  
    // Restrict to Candidate only
    if (user.role !== "Candidate") {
      toast.error("Only candidates can apply for jobs.");
      return;
    }
  
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
  


  if (loading)
    return (
      <div className="text-blue-600 text-center mt-10 text-lg">
        Loading job details...
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center mt-10 text-lg">
        {error}
      </div>
    );

  return (
    <div className="flex justify-center px-4 py-10 bg-gray-50 min-h-screen">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <Link
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline mb-6 inline-block"
        >
          ← Back to Listings
        </Link>

        <h2 className="text-3xl font-bold text-center text-red-600 mb-1">
          {job.title}
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          {job.company_name}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
          <DetailRow icon={<FaMapMarkerAlt />} label="Location" value={job.location} />
          <DetailRow icon={<FaMoneyBillWave />} label="Salary" value={job.salary} />
          <DetailRow icon={<FaEnvelope />} label="Email" value={job.contact_email} />
          <DetailRow icon={<FaPhoneAlt />} label="Phone" value={job.contact_mobile} />
          <DetailRow icon={<FaClock />} label="Apply By" value={new Date(job.last_date_of_apply).toLocaleDateString()} />
          <DetailRow icon={<FaGift />} label="Perks" value={job.perks || "None"} />
        </div>

        <div className="space-y-4 text-sm text-gray-800 mb-6">
          <p>
            <span className="font-semibold">Description:</span> {job.description}
          </p>
          <p>
            <span className="font-semibold">Skills Required:</span> {job.skills_required}
          </p>
          <p>
            <span className="font-semibold">Qualification:</span> {job.qualification_in}
            {" / "}
            <span className="font-semibold">Specialization:</span> {job.specialisation_in}
          </p>
          <p>
            <span className="font-semibold">Terms:</span> {job.terms}
          </p>
        </div>

        {(!userRole || userRole === "Candidate") && (
          <div className="text-center mt-8">
            <button
              onClick={handleApply}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md transition duration-200"
            >
              Apply Now
            </button>
          </div>
        )}



      </div>
    </div>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    <span className="text-blue-500">{icon}</span>
    <span className="text-gray-700">
      <strong>{label}:</strong> {value}
    </span>
  </div>
);

export default JobDetail;
