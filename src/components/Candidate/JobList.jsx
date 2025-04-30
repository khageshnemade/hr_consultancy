import React, { useEffect, useState } from 'react';
import makeRequest from '../../axios';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaCalendarAlt,
} from 'react-icons/fa';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchJobs = async () => {
    try {
      const response = await makeRequest.get('candidate/search-jobs/');
      setJobs(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🔥 Latest Job Openings</h2>

      {loading && <div className="text-blue-500">Loading jobs...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="grid sm:grid-cols-2 gap-6">
        {jobs?.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all p-5"
          >
            <div className="mb-2">
              <h3 className="text-xl font-semibold text-blue-700">{job.title}</h3>
              <p className="text-sm text-gray-500">{job.company_name}</p>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <FaBriefcase className="text-green-500" />
                <span>{job.job_type}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-orange-500" />
                <span>{job.location}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaMoneyBillWave className="text-green-600" />
                <span>{job.salary || 'Not specified'}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-red-500" />
                <span>Apply by: {new Date(job.last_date_of_apply).toLocaleDateString()}</span>
              </p>
            </div>

            <div className="mt-4 text-right">
              <Link
                to={`/candidate/job-details/${job.id}`}
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

export default JobList;
