import React, { useEffect, useState } from "react";
import makeRequest from "../../axios";
import { useNavigate, Link } from "react-router-dom";
import { FaIndustry, FaMapMarkerAlt } from "react-icons/fa";

const Employers = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchEmployers = async () => {
    try {
      const response = await makeRequest.get("admin/getall-employers/");
      setEmployers(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching employers:", error);
      setError("Failed to load employers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployers();
  }, []);

  const handleJobClick = (org_id, company_name) => {
    // Navigate to the job details page
    navigate(`/admin/employers/${company_name}/${org_id}`);
  };

  if (loading) {
    return <div className="text-center p-10 text-gray-500 pt-20">Loading employers...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500 pt-20">{error}</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto pt-20">
      <h2 className="text-3xl font-bold text-gradient mb-6">All Employers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {employers.map((employer) => (
          <div
            key={employer.id}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-gray-50"
          >
            <div className="flex items-center gap-4 mb-4">
              {/* Organization logo or fallback */}
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-teal-400">
                {employer.organization_logo ? (
                  <img
                    src={`https://consultancy.scholarnet.in/${employer.organization_logo}`}
                    alt={`${employer.company_name} logo`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-300 text-white text-lg font-semibold">
                    {employer.company_name?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">{employer.company_name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <FaIndustry className="text-blue-500" />
                  {employer.industry_type || "Unknown Industry"}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <FaMapMarkerAlt className="text-orange-500" />
              {`${employer.city}, ${employer.district}`}
            </p>

            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium text-slate-700">Representative:</span> {employer.reprsentative_name || "N/A"}
            </p>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => handleJobClick(employer.org_id, employer.company_name)}
                className="text-blue-600 text-sm hover:underline"
              >
                View Jobs
              </button>
              <Link
                to={`/admin/employer/${employer.org_id}`}
                className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employers;
