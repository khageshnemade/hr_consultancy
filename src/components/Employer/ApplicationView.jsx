import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi"; // Feather icon for back arrow
import makeRequest from "../../axios";

const ApplicationView = () => {
  const { title, job_id } = useParams();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [candidateData, setCandidateData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await makeRequest.get(`/employer/get-applications/${job_id}/`);
        const apps = response.data;
        setApplications(apps);

        const candidateDetails = {};
        await Promise.all(
          apps.map(async (app) => {
            try {
              const res = await makeRequest.get(`/employer/get-candidate/${app.candidate_uid}/`);
              candidateDetails[app.candidate_uid] = res.data;
            } catch (err) {
              console.error(`Error fetching candidate ${app.candidate_uid}`, err);
            }
          })
        );
        setCandidateData(candidateDetails);
      } catch (err) {
        setError("Failed to fetch applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [job_id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-6 px-4 pt-20">
      <div className="max-w-6xl mx-auto">
      

        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">
          Applications for {title}
        </h2>
  {/* Back Button */}
  <button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6"
        >
          <FiArrowLeft className="mr-2 text-lg" />
          Back
        </button>
        {error && (
          <p className="text-red-600 text-center font-medium mb-4">{error}</p>
        )}

        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="text-center text-gray-500">No applications found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-h-[70vh] overflow-y-auto pr-2">
            {applications.map((app, index) => {
              const candidate = candidateData[app.candidate_uid];

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
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

                    <p className="mt-2">
                      <strong className="text-gray-700">Resume:</strong>{" "}
                      {candidate?.resume ? (
                        <a
                          href={`https://consultancy.scholarnet.in/${candidate.resume}`}
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

                  <div className="mt-6 text-right">
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

export default ApplicationView;
