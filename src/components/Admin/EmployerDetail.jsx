import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import makeRequest from "../../axios";
import {
  FaIndustry,
  FaMapMarkerAlt,
  FaUserTie,
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const EmployerDetail = () => {
  const { org_id } = useParams();
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployer = async () => {
      try {
        const response = await makeRequest.get(`admin/getemployer/${org_id}/`);
        setEmployer(response.data);
      } catch (error) {
        console.error("Failed to fetch employer details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployer();
  }, [org_id]);

  if (loading) return <div className="text-center p-6 text-gray-500 pt-20">Loading...</div>;
  if (!employer) return <div className="text-center p-6 text-red-500 pt-20">Employer not found.</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white shadow rounded-lg text-sm pt-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
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
          <h2 className="text-xl font-semibold text-gray-800">{employer.company_name}</h2>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <FaIndustry className="text-blue-500" />
            {employer.industry_type || "N/A"}
          </p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-gray-700 mb-4">
        <p className="flex gap-2 items-start">
          <FaUserTie className="mt-0.5 text-green-500" />
          <span><strong>Representative:</strong> {employer.reprsentative_name || "N/A"}</span>
        </p>
        <p className="flex gap-2 items-start">
          <FaBuilding className="mt-0.5 text-purple-500" />
          <span><strong>Company Type:</strong> {employer.company_id_type || "N/A"}</span>
        </p>
        <p className="flex gap-2 items-start">
          <FaMapMarkerAlt className="mt-0.5 text-orange-500" />
          <span><strong>Location:</strong> {employer.city}, {employer.district}, {employer.taluka}</span>
        </p>
        <p><strong>Company ID:</strong> {employer.company_unique_id || "N/A"}</p>
      </div>

      {/* User Info */}
      {employer.user && (
        <div className="bg-gray-50 p-3 rounded-md">
          <div className="flex items-center gap-2 mb-2 text-gray-800 font-medium">
            <FaUser className="text-blue-500" />
            Account Owner
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-gray-700">
            <p><strong>Name:</strong> {employer.user.name}</p>
            <p><strong>Role:</strong> {employer.user.role}</p>
            <p className="flex gap-2 items-center">
              <FaEnvelope className="text-indigo-500" />
              {employer.user.email}
            </p>
            <p className="flex gap-2 items-center">
              <FaPhoneAlt className="text-orange-500" />
              {employer.user.mobile}
            </p>
            <p><strong>Joined:</strong> {new Date(employer.user.date_joined).toLocaleDateString()}</p>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-5 text-right">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-1.5 text-sm rounded transition"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default EmployerDetail;
