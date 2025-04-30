import React, { useEffect, useState } from "react";
import makeRequest from "../../axios";

const Dashboard = () => {
  const [data, setData] = useState({
    appliedcount: 0,
    shortlisted: 0,
    selected: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    makeRequest
      .get("candidate/dashboard/")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-primary animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
        Candidate Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <DashboardCard
          label="Applied"
          count={data.appliedcount}
          border="border-blue-100"
          textColor="text-blue-600"
          bg="bg-blue-50"
        />
        <DashboardCard
          label="Shortlisted"
          count={data.shortlisted}
          border="border-purple-100"
          textColor="text-purple-600"
          bg="bg-purple-50"
        />
        <DashboardCard
          label="Selected"
          count={data.selected}
          border="border-green-100"
          textColor="text-green-600"
          bg="bg-green-50"
        />
        <DashboardCard
          label="Rejected"
          count={data.rejected}
          border="border-red-100"
          textColor="text-red-600"
          bg="bg-red-50"
        />
      </div>
    </div>
  );
};

const DashboardCard = ({ label, count, bg, textColor, border }) => (
  <div
    className={`rounded-xl shadow-sm ${bg} ${border} border p-5 text-center hover:shadow-md transition duration-300`}
  >
    <h3 className={`text-md font-medium ${textColor}`}>{label}</h3>
    <p className={`text-3xl font-bold mt-2 ${textColor}`}>{count}</p>
  </div>
);

export default Dashboard;
