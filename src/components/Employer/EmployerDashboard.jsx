import React, { useState, useEffect } from 'react';
import makeRequest from '../../axios';

const EmployerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeRequest.get('employer/dashboard/');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 rounded shadow bg-white">
      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border text-blue-600" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Job Count */}
          <div className="p-4 bg-green-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-700">Job Count</h3>
            <p className="text-2xl text-green-600">{dashboardData.job_count}</p>
          </div>

          {/* Application Count */}
          <div className="p-4 bg-blue-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-700">Application Count</h3>
            <p className="text-2xl text-blue-600">{dashboardData.application_count}</p>
          </div>
        </div>
      )}

   
    </div>
  );
};

export default EmployerDashboard;
