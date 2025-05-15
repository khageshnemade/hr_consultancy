import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import makeRequest from "../../axios";

const EmpApplications = () => {
  const [applications, setApplications] = useState([]);
  const [candidateData, setCandidateData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState("All");
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await makeRequest.get("/employer/get-emp-applications");
        setApplications(response.data);

        // Extract unique roles for filter dropdown
        const uniqueRoles = Array.from(new Set(response.data.map(app => app.role)));
        setRoles(uniqueRoles);

        const grouped = {};
        for (let app of response.data) {
          try {
            const candidateResponse = await makeRequest.get(
              `https://consultancy.scholarnet.in/api/employer/get-candidate/${app.candidate_uid}/`
            );
            grouped[app.candidate_uid] = {
              skills: candidateResponse.data.skills || "No skills provided",
              name: candidateResponse.data.user.name,
              email: candidateResponse.data.user.email,
              mobile: candidateResponse.data.user.mobile,
              resume: candidateResponse.data.resume || "",
            };
          } catch (err) {
            console.error(`Failed to fetch candidate data for UID: ${app.candidate_uid}`, err);
            grouped[app.candidate_uid] = {
              name: "Unknown",
              email: "No email available",
              mobile: "No mobile available",
              skills: "No skills available",
              resume: "",
            };
          }
        }

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

  // Filter applications by selected role
  const filteredApplications =
    selectedRole === "All"
      ? applications
      : applications.filter(app => app.role === selectedRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-4 px-4 pt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Applications for All Jobs
        </h2>

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            <FiArrowLeft className="mr-2 text-lg" />
            Back
          </button>

          {/* Role Filter Dropdown */}
          <div>
            <label className="mr-2 text-sm font-medium text-gray-700">Filter by Post:</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border rounded-md px-3 py-1 text-sm"
            >
              <option value="All">All</option>
              {roles.map((role, idx) => (
                <option key={idx} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="text-red-600 text-center font-medium mb-4">{error}</p>}

        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading applications...</p>
        ) : filteredApplications.length === 0 ? (
          <p className="text-center text-gray-500">No applications found for selected post.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredApplications.map((app, index) => {
              const candidate = candidateData[app.candidate_uid];

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 border border-gray-200"
                >
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Post:</strong> {app.role}</p>
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

                    <hr className="my-2" />

                    <p><strong>Candidate:</strong> {candidate?.name || "No name available"}</p>
                    <p><strong>Email:</strong> {candidate?.email || "No email provided"}</p>
                    <p><strong>Mobile:</strong> {candidate?.mobile || "No mobile provided"}</p>
                    <p><strong>Skills:</strong> {candidate?.skills || "No skills provided"}</p>
                    <p>
                      <strong>Resume:</strong>{" "}
                      {candidate?.resume ? (
                        <a
                          href={`https://consultancy.scholarnet.in/${candidate.resume}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline"
                        >
                          View Resume
                        </a>
                      ) : (
                        <span className="text-gray-500">Resume not available</span>
                      )}
                    </p>
                  </div>

                  <div className="mt-4 text-right">
                    <Link
                      to={`/employer/update-status/${app.status}/${app.app_id}`}
                      className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
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
