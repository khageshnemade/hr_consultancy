import React, { useEffect, useState } from "react";
import makeRequest from "../../axios";
import { useParams } from "react-router-dom";
import { FaUserAlt, FaEnvelope, FaPhoneAlt, FaCalendarAlt } from "react-icons/fa";

const JobApplications = () => {
  const { job_id } = useParams(); // Get the job_id from URL parameters
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await makeRequest.get(`admin/getapplications/${job_id}/`);
        setApplications(response.data);
        console.log("Data",response.data);
        
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [job_id]);

  if (loading) {
    return <div className="text-center p-6 text-gray-500">Loading applications...</div>;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gradient mb-6">Applications for Job ID: {job_id}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {applications.length === 0 ? (
          <p className="text-md text-gray-600">No applications received yet.</p>
        ) : (
          applications.map((app, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md border border-gray-200 p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-gray-50">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">{app.name}</h3>
              <p className="text-sm text-gray-700 mb-3">{app.cover_letter}</p>

              <div className="flex items-center text-sm text-gray-600 mb-2">
                <FaUserAlt className="mr-2 text-blue-600" />
                <span>{app.name}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <FaEnvelope className="mr-2 text-green-500" />
                <span>{app.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <FaPhoneAlt className="mr-2 text-orange-500" />
                <span>{app.mobile}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <FaCalendarAlt className="mr-2 text-purple-500" />
                <span>Applied on: {new Date(app.date_applied).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobApplications;
