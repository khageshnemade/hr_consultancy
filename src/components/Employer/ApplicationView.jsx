import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import makeRequest from "../../axios";

const ApplicationView = () => {
  const { job_id } = useParams(); // Get job_id from route
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await makeRequest.get(
          `/employer/get-applications/${job_id}/`
        );
        setApplications(response.data);
      } catch (err) {
        setError("Failed to fetch applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [job_id]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Applications for Job ID: {job_id}
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading ? (
          <p className="text-center text-red-600">Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="text-center text-gray-600">No applications found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {applications.map((app, index) => (
              <li key={index} className="py-4">
                <p>
                  <strong>Name:</strong> {app.name}
                </p>
                <p>
                  <strong>Email:</strong> {app.email}
                </p>
                <p>
                  <strong>Resume:</strong>{" "}
                  <a
                    href={app.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Resume
                  </a>
                </p>
                <div className="mt-2">
                  <Link
                    to={`/employer/update-status/${app.app_id}`}
                    className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                  >
                    Update Status
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ApplicationView;
