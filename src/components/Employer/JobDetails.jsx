import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaEnvelope,
  FaTools,
  FaClock,
} from "react-icons/fa";
import makeRequest from "../../axios";

const JobDetails = () => {
  const { job_id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await makeRequest.get(
          `employer/jobdetails/${job_id}/`
        );
        setJob(response.data);
      } catch (err) {
        setError("Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [job_id]);

  if (loading)
    return (
      <div className="text-center text-red-600 mt-10">
        Loading job details...
      </div>
    );
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-red-600">{job.title}</h2>
          <Link
            onClick={() => navigate(-1)}
            className="flex items-center text-red-600 hover:text-red-800 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </Link>
        </div>

        <div className="text-sm text-gray-600 mb-4">{job.role}</div>

        <div className="grid md:grid-cols-2 gap-4 text-gray-800">
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-red-400 mr-2" />
            <span>
              <strong>Location:</strong> {job.location}
            </span>
          </div>
          <div className="flex items-center">
            <FaMoneyBillWave className="text-green-400 mr-2" />
            <span>
              <strong>Salary:</strong> ₹{job.salary}
            </span>
          </div>
          <div className="flex items-center">
            <FaClock className="text-blue-400 mr-2" />
            <span>
              <strong>Deadline:</strong>{" "}
              {new Date(job.last_date_of_apply).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-yellow-500 mr-2" />
            <span>
              <strong>Contact:</strong> {job.contact_email}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-1 text-gray-700">
            Skills Required:
          </h4>
          <p className="text-gray-600 flex items-start">
            <FaTools className="text-gray-400 mt-1 mr-2" />
            {job.skills_required}
          </p>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-1 text-gray-700">
            Description:
          </h4>
          <p className="text-gray-600 leading-relaxed">{job.description}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
