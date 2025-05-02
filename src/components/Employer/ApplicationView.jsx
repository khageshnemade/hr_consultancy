import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import makeRequest from "../../axios";

const ApplicationView = () => {
  const { title, job_id } = useParams();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">
          Applications for "{title}"
        </h2>

        {error && (
          <p className="text-red-600 text-center font-medium mb-4">{error}</p>
        )}

        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="text-center text-gray-500">No applications found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((app, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">{app.name || "N/A"}</h3>
                  <p className="text-sm text-gray-500">{app.email || "No email provided"}</p>

                  <div className="text-sm text-gray-700">
                    <p><strong>Candidate ID:</strong> {app.candidate}</p>
                    <p><strong>Job ID:</strong> {app.job}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          app.status === "Shortlisted"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </p>
                    <p><strong>Applied On:</strong> {new Date(app.applied_on).toLocaleDateString()}</p>
                  </div>

                  <div>
                    <p className="mt-2">
                      <strong className="text-gray-700">Resume:</strong>{" "}
                      {app.resume ? (
                        <a
                          href={app.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          View Resume
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-right">
                  <Link
                    to={`/employer/update-status/${app.status}/${app.app_id}`}
                    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Update Status
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationView;
