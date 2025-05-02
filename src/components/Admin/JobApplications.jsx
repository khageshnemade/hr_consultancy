import React, { useEffect, useState } from "react";
import makeRequest from "../../axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaUserAlt,
  FaBriefcase,
  FaCalendarAlt,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

const JobApplications = () => {
  const { job_id } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await makeRequest.get(
          `admin/getapplications/${job_id}/`
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [job_id]);

  if (loading) {
    return (
      <div className="text-center p-6 text-gray-500">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto mt-4">
      {/* Back Button */}
      <Link
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-blue-600 hover:text-blue-800 mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </Link>

      <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-6">
        Applications for Job ID: {job_id}
      </h2>

      {applications.length === 0 ? (
        <p className="text-md text-gray-600">No applications received yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-transform hover:-translate-y-1 p-5"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FaUserAlt className="text-red-500" />
                  {app.candidate_name}
                </h3>
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                  <FaBriefcase className="text-blue-500" />
                  Role: {app.role}
                </p>
              </div>

              <div className="text-sm text-gray-700 space-y-2">
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-purple-500" />
                  Applied on: {new Date(app.applied_on).toLocaleDateString()}
                </p>
                <p className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" />
                  Status: <span className="font-medium">{app.status}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobApplications;
