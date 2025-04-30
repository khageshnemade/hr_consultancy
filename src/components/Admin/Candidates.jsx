import React, { useEffect, useState } from "react";
import makeRequest from "../../axios";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCandidates = async () => {
    try {
      const response = await makeRequest.get("admin/getall-candidates/");
      setCandidates(response.data);
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  if (loading) {
    return <div className="text-center p-10 text-red-500">Loading candidates...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
    <h2 className="text-2xl font-semibold text-slate-800 mb-6">All Candidates</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {candidates.map((candidate) => (
        <div
          key={candidate.id}
          className="bg-white border border-gray-100 rounded-xl shadow-md p-5 hover:shadow-lg transition-all duration-300"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-1">{candidate.user.name}</h3>
          <p className="text-sm text-gray-600">{candidate.user.email}</p>
          <p className="text-sm text-gray-600 mt-2">Mobile: {candidate.user.mobile}</p>
          <p className="text-sm text-gray-600">Gender: {candidate.gender}</p>
          <p className="text-sm text-gray-600">City: {candidate.city}</p>
          <p className="text-sm text-gray-600">Work Status: {candidate.work_status}</p>
          <p className="text-xs text-gray-400 mt-3">
            Joined on: {new Date(candidate.user.date_joined).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default Candidates;
