import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import makeRequest from "../../axios";
import { setProfileData } from "../../../redux/features/profileSlice";
import { Link } from "react-router-dom";

const EmployerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [dashboardRes, profileRes] = await Promise.all([
          makeRequest.get("candidate/dashboard/"),
          makeRequest.get("candidate/profiledetails/"),
        ]);

        // Set dashboard data
        setDashboardData(dashboardRes?.data);

        // Dispatch profile data
        const { name, email, work_status, profile_pic } = profileRes.data;
        dispatch(setProfileData({ name, email, work_status, profile_pic }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [dispatch]);


  return (
    <div className="max-w-4xl mx-auto p-6 rounded shadow bg-white  mt-32">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border text-blue-600" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link to={'/candidate/applied_jobs'}><div className="p-4 bg-green-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-700">Applied</h3>
            <p className="text-2xl text-green-600">{dashboardData.appliedcount}</p>
          </div>
          </Link>
          <Link to={'/candidate/applied_jobs/shortlisted'}> <div className="p-4 bg-yellow-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-700">Shortlisted</h3>
            <p className="text-2xl text-yellow-600">{dashboardData.shortlisted}</p>
          </div></Link>
          <Link to={'/candidate/applied_jobs/selected'}> <div className="p-4 bg-blue-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-700">Selected</h3>
            <p className="text-2xl text-blue-600">{dashboardData.selected}</p>
          </div></Link>
          <Link to={'/candidate/applied_jobs/rejected'}> <div className="p-4 bg-red-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-red-700">Rejected</h3>
            <p className="text-2xl text-red-600">{dashboardData.rejected}</p>
          </div></Link>
        </div>
      )}
    </div>

  );
};

export default EmployerDashboard;
