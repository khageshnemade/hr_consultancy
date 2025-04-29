import React, { useEffect, useState } from 'react';
import makeRequest from '../../axios';

const EmployerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await makeRequest.get('employer/profiledetails/');
        setProfile(response.data);
        setFormData({
          ...response.data,
          ...response.data.employer
        });
      } catch (err) {
        setError('Failed to load profile details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await makeRequest.put('employer/profiledetails/', {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        role: formData.role,
        company_name: formData.company_name,
        industry_type: formData.industry_type,
        company_id_type: formData.company_id_type,
        company_unique_id: formData.company_unique_id,
        reprsentative_name: formData.reprsentative_name,
        district: formData.district,
        taluka: formData.taluka,
        city: formData.city
      });
      setMessage('Profile updated successfully.');
      setEditMode(false);
    } catch {
      setMessage('Failed to update profile.');
    }
  };

  if (loading) return <div className="text-center mt-10 text-red-600">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Employer Profile</h2>
      {message && <p className="text-sm mb-4 text-center text-red-500">{message}</p>}

      {editMode ? (
        <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 sm:grid-cols-2 text-sm text-gray-700">
          {[
            'name', 'mobile', 'email', 'role', 'company_name', 'industry_type',
            'company_id_type', 'company_unique_id', 'reprsentative_name',
            'district', 'taluka', 'city'
          ].map((field) => (
            <input
              key={field}
              name={field}
              type="text"
              value={formData[field] || ''}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-100 rounded"
              placeholder={field.replace(/_/g, ' ').toUpperCase()}
              required
            />
          ))}
          <div className="col-span-2 flex gap-4 mt-2">
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 text-sm text-gray-700">
            <p><span className="font-semibold">Name:</span> {profile.name}</p>
            <p><span className="font-semibold">Mobile:</span> {profile.mobile}</p>
            <p><span className="font-semibold">Email:</span> {profile.email}</p>
            <p><span className="font-semibold">Role:</span> {profile.role}</p>
            <p><span className="font-semibold">Company Name:</span> {profile.employer.company_name}</p>
            <p><span className="font-semibold">Industry Type:</span> {profile.employer.industry_type}</p>
            <p><span className="font-semibold">Company ID Type:</span> {profile.employer.company_id_type}</p>
            <p><span className="font-semibold">Company Unique ID:</span> {profile.employer.company_unique_id}</p>
            <p><span className="font-semibold">Representative:</span> {profile.employer.reprsentative_name}</p>
            <p><span className="font-semibold">District:</span> {profile.employer.district}</p>
            <p><span className="font-semibold">Taluka:</span> {profile.employer.taluka}</p>
            <p><span className="font-semibold">City:</span> {profile.employer.city}</p>
          </div>

          <button
            onClick={() => setEditMode(true)}
            className="mt-6 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Update Profile
          </button>
        </>
      )}
    </div>
  );
};

export default EmployerProfile;
