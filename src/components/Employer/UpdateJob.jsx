import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import makeRequest from '../../axios';
import { ArrowLeft } from 'lucide-react';
const UpdateJob = () => {
  const { job_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await makeRequest.get(`/employer/jobdetails/${job_id}/`);
        setFormData(response.data);
      } catch (err) {
        setError('Failed to fetch job data');
      }
    };
    fetchJob();
  }, [job_id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await makeRequest.put(`/employer/jobdetails/${job_id}/`, formData);
      setSuccess('Job updated successfully!');
      navigate('/employer/jobs/'); 
    } catch (err) {
      setError('Failed to update job');
    }
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Update Job</h2>

        {/* Back Button */}
  <Link
    onClick={() => navigate(-1)}
    className="mb-4 flex items-center text-red-600 hover:text-red-700 transition"
  >
    <ArrowLeft className="mr-2" size={18} />
    Back to Listings
  </Link>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          'title', 'description', 'role', 'no_of_openings', 'salary', 'location',
          'skills_required', 'contact_email', 'contact_mobile', 'last_date_of_apply',
          'perks', 'qualification_in', 'specialisation_in', 'terms', 'company'
        ].map((field) => (
          <input
            key={field}
            type={field === 'no_of_openings' || field === 'company' ? 'number' : 'text'}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-100 rounded"
            placeholder={field.replace(/_/g, ' ').toUpperCase()}
            required
          />
        ))}

        <div className="flex items-center space-x-2">
          <label className="text-sm">Active:</label>
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="w-4 h-4"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default UpdateJob;
