import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBuilding,
  FaIndustry,
  FaMapMarkerAlt,
  FaUserTie,
} from "react-icons/fa";

const EmployerList = () => {
  const [employers, setEmployers] = useState([]);
  const [loadingEmployers, setLoadingEmployers] = useState(true);
  const [employerError, setEmployerError] = useState(null);

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await axios.get(
          "https://consultancy.scholarnet.in/api/admin/getall-employers/"
        );
        setEmployers(response.data);
      } catch (err) {
        console.error("Error fetching employers:", err);
        setEmployerError("Failed to fetch employer data.");
      } finally {
        setLoadingEmployers(false);
      }
    };

    fetchEmployers();
  }, []);

  return (
    <section className="mt-16 px-4">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-10 text-center">
        🏢 Top Companies Hiring Now
      </h2>

      {loadingEmployers ? (
        <p className="text-blue-500 text-center text-lg">Loading employers...</p>
      ) : employerError ? (
        <p className="text-red-500 text-center text-lg">{employerError}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {employers.map((emp, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] p-6 flex flex-col border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={`https://consultancy.scholarnet.in${emp.organization_logo}`}
                  alt={emp.company_name}
                  className="h-16 w-16 object-contain rounded-lg border border-gray-200 bg-gray-50"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <FaBuilding className="text-blue-500" />
                    {emp.company_name}
                  </h3>
                  {emp.industry_type && (
                    <span className="inline-block mt-1 text-xs text-white bg-blue-600 px-2 py-0.5 rounded-full">
                      {emp.industry_type}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-2 mb-4">
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-orange-500" />
                  {emp.city || "City not specified"}
                </p>
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  {emp.district || "District not specified"}
                </p>
              </div>

              {emp.reprsentative_name && (
                <p className="text-sm text-gray-500 mt-auto pt-3 border-t border-gray-100 flex items-center gap-2">
                  <FaUserTie className="text-green-600" />
                  Contact: {emp.reprsentative_name}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default EmployerList;
