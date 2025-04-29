import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import makeRequest from '../../axios';

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await makeRequest.get(`candidate/jobdetail/${jobId}/`);
        setJob(res.data);
      } catch (err) {
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (loading) return <div className="text-red-600 text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <Link
        onClick={() => navigate(-1)}
        className="text-sm mb-4 text-red-500 hover:text-red-700"
      >
        ← Back to Listings
      </Link>

      <h2 className="text-2xl font-bold text-red-600 mb-2">{job.title}</h2>
      <p className="text-sm text-gray-700 mb-1"><strong>Company:</strong> {job.company_name}</p>
      <p className="text-sm text-gray-700 mb-1"><strong>Location:</strong> {job.location}</p>
      <p className="text-sm text-gray-700 mb-1"><strong>Salary:</strong> {job.salary}</p>
      <p className="text-sm text-gray-700 mb-1"><strong>Description:</strong> {job.description}</p>
      <p className="text-sm text-gray-700 mb-1"><strong>Skills:</strong> {job.skills_required}</p>
      <p className="text-sm text-gray-700 mb-1"><strong>Contact Email:</strong> {job.contact_email}</p>
      <p className="text-sm text-gray-700 mb-1"><strong>Contact Mobile:</strong> {job.contact_mobile}</p>
      <p className="text-sm text-gray-700 mb-1"><strong>Deadline:</strong> {new Date(job.last_date_of_apply).toLocaleDateString()}</p>
      <p className="text-sm text-gray-700 mb-1"><strong>Perks:</strong> {job.perks}</p>
      <p className="text-sm text-gray-700 mb-1"><strong>Qualification:</strong> {job.qualification_in}</p>
      <p className="text-sm text-gray-700 mb-1"><strong>Specialization:</strong> {job.specialisation_in}</p>
      <p className="text-sm text-gray-700"><strong>Terms:</strong> {job.terms}</p>
    </div>
  );
};

export default JobDetail;
