import React, { useEffect, useState } from 'react';
import makeRequest from '../../axios';
import { Link } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchJobs = async () => {
    try {
      const response = await makeRequest.get('candidate/search-jobs/');
      setJobs(response.data);
    } catch (err) {
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Job Listings</h2>

      {loading && <div className="text-red-600">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="space-y-4">
        {jobs?.map((job) => (
          <div
            key={job.job_id}
            className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-red-700">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company_name}</p>
            <p className="text-sm text-gray-500">{job.location}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-400">{job.job_type}</span>
              <Link
                to={`/candidate/job-details/${job.job_id}`}
                className="text-sm text-red-500 hover:text-red-600 underline"
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
