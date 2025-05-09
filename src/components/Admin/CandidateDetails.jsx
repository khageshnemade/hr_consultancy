import React, { useEffect, useState } from "react";
import makeRequest from "../../axios";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaCity,
  FaVenusMars,
  FaBriefcase,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";

const CandidateDetails = () => {
  const { candidateId } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCandidateDetails = async () => {
      try {
        const response = await makeRequest.get(
          `admin/getcandidate/${candidateId}/`
        );
        setCandidate(response.data);
      } catch (err) {
        setError("Failed to fetch candidate details");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidateDetails();
  }, [candidateId]);

  if (loading)
    return (
      <div className="text-center py-10 text-blue-600 text-lg pt-20">Loading...</div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-600 text-lg pt-20">{error}</div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto pt-20">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/admin/candidates"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition"
        >
          <FaArrowLeft className="mr-2" /> Back to Candidates
        </Link>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaUser className="text-blue-500" />
        Candidate Details
      </h2>

      {/* Details Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-semibold text-blue-700">
            {candidate.user.name}
          </h3>
          <p className="text-sm text-gray-600">{candidate.user.email}</p>
        </div>

        <div className="text-sm text-gray-700 space-y-2">
          <p className="flex items-center gap-2">
            <FaPhone className="text-green-500" /> {candidate.user.mobile}
          </p>
          <p className="flex items-center gap-2">
            <FaVenusMars className="text-pink-500" /> Gender: {candidate.gender}
          </p>
          <p className="flex items-center gap-2">
            <FaCity className="text-orange-500" /> City: {candidate.city}
          </p>
          <p className="flex items-center gap-2">
            <FaBriefcase className="text-indigo-500" /> Work Status:{" "}
            {candidate.work_status}
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-500">
            <FaCalendarAlt className="text-purple-500" />
            Joined on:{" "}
            {new Date(candidate.user.date_joined).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;
