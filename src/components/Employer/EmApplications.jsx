import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import makeRequest from "../../axios";

const EmpApplications = () => {
  const [applications, setApplications] = useState([]);
  const [candidateData, setCandidateData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const title = "All Jobs"; // You can dynamically set this if needed
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await makeRequest.get("/employer/get-emp-applications");
        setApplications(response.data);

        // Group candidate data by UID (mocked or fetched elsewhere)
        const grouped = {};
        response.data.forEach((app) => {
          // Placeholder: fetch or structure candidate data here
          grouped[app.candidate_uid] = {
            user: { email: "demo@example.com" }, // Replace with real data
            resume: "", // Replace with real data
          };
        });

        setCandidateData(grouped);
      } catch (err) {
        setError("Failed to load applications.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-4 px-4 pt-20">
  <div className="max-w-6xl mx-auto">

    {/* Heading */}
    <h2 className="text-3xl font-bold text-center text-indigo-700 mb-2">
      Applications for {title}
    </h2>

    {/* Back Button aligned left */}
    <div className="mb-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
      >
        <FiArrowLeft className="mr-2 text-lg" />
        Back
      </button>
    </div>

    {/* Error */}
    {error && (
      <p className="text-red-600 text-center font-medium mb-4">{error}</p>
    )}

    {/* Main content */}
    {loading ? (
      <p className="text-center text-lg text-gray-600">Loading applications...</p>
    ) : applications.length === 0 ? (
      <p className="text-center text-gray-500">No applications found.</p>
    ) : (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {applications.map((app, index) => {
          const candidate = candidateData[app.candidate_uid];

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
            >
              <div className="space-y-2">
                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>Role:</strong> {app.role}</p>
                  <p><strong>Company:</strong> {app.company_name}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        app.status === "Shortlisted"
                          ? "bg-green-100 text-green-700"
                          : app.status === "Selected"
                          ? "bg-blue-100 text-blue-700"
                          : app.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </p>
                  <p><strong>Applied On:</strong> {new Date(app.applied_on).toLocaleDateString()}</p>
                </div>

                <p className="text-sm text-gray-500">
                  Email: {candidate?.user?.email || "No email provided"}
                </p>
              </div>

              <div className="mt-4 text-right">
                <Link
                  to={`/employer/update-status/${app.status}/${app.app_id}`}
                  className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Update Status
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
</div>


  );
};

export default EmpApplications;
