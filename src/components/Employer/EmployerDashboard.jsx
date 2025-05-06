import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import makeRequest from "../../axios";
import { setProfileData } from "../../../redux/features/profileSlice";

const EmployerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First: fetch dashboard data
        const dashboardRes = await makeRequest.get("employer/dashboard/");
        setDashboardData(dashboardRes.data);

        // Second: fetch profile details
        const profileRes = await makeRequest.get("employer/profiledetails/");
        const { name, email, organization_logo } = profileRes.data;
        console.log(profileRes.data);

        dispatch(setProfileData({ name, email, organization_logo }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 rounded shadow bg-white">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border text-blue-600" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-green-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-700">Job Count</h3>
            <p className="text-2xl text-green-600">{dashboardData.job_count}</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-700">
              Application Count
            </h3>
            <p className="text-2xl text-blue-600">
              {dashboardData.application_count}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
