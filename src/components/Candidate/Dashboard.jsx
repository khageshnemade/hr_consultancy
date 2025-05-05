import React, { useEffect, useState } from "react";
import makeRequest from "../../axios";
import {
  FaClipboardList,
  FaCheckCircle,
  FaUserCheck,
  FaTimesCircle,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setProfileData } from "../../../redux/features/profileSlice";

const Dashboard = () => {
  const [data, setData] = useState({
    appliedcount: 0,
    shortlisted: 0,
    selected: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardRes, profileRes] = await Promise.all([
          makeRequest.get("candidate/dashboard/"),
          makeRequest.get("candidate/profiledetails/"),
        ]);
  
        setData(dashboardRes.data);
  
        // ✅ Extract only needed fields
        const { name, email, work_status, profile_pic } = profileRes.data;
  
        dispatch(setProfileData({ name, email, work_status, profile_pic }));
      } catch (err) {
        console.error("Error fetching candidate data:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [dispatch]);
  

  if (loading) {
    return (
      <div className="text-center mt-10 text-blue-500 text-lg animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        📊 Candidate Dashboard
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <DashboardCard
          label="Applied"
          count={data.appliedcount}
          icon={<FaClipboardList className="text-blue-500 text-2xl" />}
          bg="bg-blue-50"
          border="border-blue-200"
          textColor="text-blue-700"
        />
        <DashboardCard
          label="Shortlisted"
          count={data.shortlisted}
          icon={<FaCheckCircle className="text-purple-500 text-2xl" />}
          bg="bg-purple-50"
          border="border-purple-200"
          textColor="text-purple-700"
        />
        <DashboardCard
          label="Selected"
          count={data.selected}
          icon={<FaUserCheck className="text-green-500 text-2xl" />}
          bg="bg-green-50"
          border="border-green-200"
          textColor="text-green-700"
        />
        <DashboardCard
          label="Rejected"
          count={data.rejected}
          icon={<FaTimesCircle className="text-red-500 text-2xl" />}
          bg="bg-red-50"
          border="border-red-200"
          textColor="text-red-700"
        />
      </div>
    </div>
  );
};

const DashboardCard = ({ label, count, icon, bg, textColor, border }) => (
  <div
    className={`rounded-xl ${bg} ${border} border p-6 shadow hover:shadow-lg transition-all duration-300 text-center`}
  >
    <div className="flex justify-center items-center mb-3">{icon}</div>
    <h4 className={`text-sm font-medium ${textColor}`}>{label}</h4>
    <p className={`text-3xl font-bold mt-2 ${textColor}`}>{count}</p>
  </div>
);

export default Dashboard;
