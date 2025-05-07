import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBuilding,
  FaUserTie,
  FaIndustry,
} from "react-icons/fa";
import makeRequest from "../axios";
import SearchBar from "../components/SearchBar"; // Import the SearchBar component

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingEmployers, setLoadingEmployers] = useState(true);
  const [jobError, setJobError] = useState("");
  const [employerError, setEmployerError] = useState("");
  const location = useLocation();



  const fetchEmployers = async () => {
    try {
      const response = await axios.get("https://consultancy.scholarnet.in/api/admin/getall-employers/");
      setEmployers(response.data);
    } catch (err) {
      console.error("Error fetching employers:", err);
      setEmployerError("Failed to fetch employer data.");
    } finally {
      setLoadingEmployers(false);
    }
  };

  const handleApply = async (jobId) => {
    try {
      await makeRequest.post("candidate/job-apply/", {
        status: "Pending",
        job: jobId,
      });
      toast.success("Successfully applied to job!");
    } catch (error) {
      console.error("Failed to apply:", error.response.data.detail);
      toast.error(error.response.data.detail);
    }
  };

  const getCompanyName = (jobCompanyName) => {
    const match = employers.find(
      (emp) => emp.employer?.company_name === jobCompanyName
    );
    return match?.employer?.company_name || jobCompanyName;
  };

  useEffect(() => {
    fetchEmployers();
  }, [location.search]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-10 text-center">
        Welcome to Job Portal 🧑‍💼
      </h1>-

    

      {/* Employers Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🏢 Top Companies Hiring Now
        </h2>

        {loadingEmployers ? (
          <p className="text-blue-500 text-center">Loading employers...</p>
        ) : employerError ? (
          <p className="text-red-500 text-center">{employerError}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {employers.map((emp, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={`https://consultancy.scholarnet.in${emp.organization_logo}`}
                    alt={emp.company_name}
                    className="h-14 w-14 object-contain rounded-md border border-gray-200 bg-gray-50"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <FaBuilding className="text-blue-600" />
                      {emp.company_name}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <FaIndustry className="text-gray-400" />
                      {emp.industry_type || "Industry not specified"}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-gray-600 space-y-1 mb-3">
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-orange-500" />
                    <span>{emp.city || "City not specified"}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-400" />
                    <span>{emp.district || "District not specified"}</span>
                  </p>
                </div>

                {emp.reprsentative_name && (
                  <p className="text-xs text-gray-500 mt-auto pt-2 flex items-center gap-2">
                    <FaUserTie className="text-green-500" />
                    Contact: {emp.reprsentative_name}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
