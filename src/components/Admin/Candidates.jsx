import React, { useEffect, useState } from "react";
import makeRequest from "../../axios";
import { Link } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCity,
  FaVenusMars,
  FaBriefcase,
  FaCalendarAlt,
} from "react-icons/fa";

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
    return (
      <div className="text-center py-10 text-blue-500 text-lg">
        Loading candidates...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        👥 All Candidates
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-6"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2 flex items-center gap-2">
              <FaUser className="text-blue-500" />
              {candidate.user.name}
            </h3>

            <div className="text-sm text-gray-700 space-y-2">
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-gray-500" />
                {candidate.user.email}
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-green-500" />
                {candidate.user.mobile}
              </p>
              <p className="flex items-center gap-2">
                <FaVenusMars className="text-pink-500" />
                Gender: {candidate.gender}
              </p>
              <p className="flex items-center gap-2">
                <FaCity className="text-orange-500" />
                City: {candidate.city}
              </p>
              <p className="flex items-center gap-2">
                <FaBriefcase className="text-indigo-500" />
                Work Status: {candidate.work_status}
              </p>
              <p className="flex items-center gap-2 text-xs text-gray-400">
                <FaCalendarAlt className="text-purple-400" />
                Joined:{" "}
                {new Date(candidate.user.date_joined).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4">
              <Link
                to={`/admin/candidate-details/${candidate.candidate_id}`}
                className="inline-block text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Candidates;
