import React, { useState } from 'react';
import axios from 'axios';
import makeRequest from '../../axios';

const JobPostForm = () => {
    const [formData, setFormData] = useState({
        job_type: 'Part Time',
        title: '',
        description: '',
        role: '',
        no_of_openings: '',
        salary: '',
        location: '',
        skills_required: '',
        contact_email: '',
        contact_mobile: '',
        last_date_of_apply: '2025-04-29',
        perks: '',
        qualification_in: '',
        specialisation_in: '',
        terms: '',
        is_active: true,
        company: 0,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
            const response = await makeRequest.post(
                'employer/addjob/',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setSuccess('Job posted successfully!');
        } catch (err) {
            setError('Failed to post job. Please check your data.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 rounded shadow bg-white">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Post a Job</h2>
            {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}
            {success && <p className="text-green-500 mb-3 text-sm">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <select
                    name="job_type"
                    value={formData.job_type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
                    required
                >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                </select>
                {[
                    { name: 'title', placeholder: 'Job Title' },
                    { name: 'description', placeholder: 'Job Description' },
                    { name: 'role', placeholder: 'Job Role' },
                    { name: 'no_of_openings', placeholder: 'No. of Openings', type: 'text' },
                    { name: 'salary', placeholder: 'Salary' },
                    { name: 'location', placeholder: 'Location' },
                    { name: 'skills_required', placeholder: 'Skills Required' },
                    { name: 'contact_email', placeholder: 'Contact Email', type: 'email' },
                    { name: 'contact_mobile', placeholder: 'Contact Mobile' },
                    { name: 'perks', placeholder: 'Perks' },
                    { name: 'qualification_in', placeholder: 'Qualification In' },
                    { name: 'specialisation_in', placeholder: 'Specialisation In' },
                    { name: 'terms', placeholder: 'Terms & Conditions' },
                    { name: 'company', placeholder: 'Company ID', type: 'text' },
                ].map(({ name, placeholder, type = 'text' }) => (
                    <input
                        key={name}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={formData[name]}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
                        required
                    />
                ))}

                <div className="flex items-center">
                    <label className="mr-2 text-sm">Active:</label>
                    <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleChange}
                        className="w-4 h-4"
                    />
                </div>


                <input
                    type="date"
                    name="last_date_of_apply"
                    value={formData.last_date_of_apply}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Post Job
                </button>
            </form>
        </div>
    );
};

export default JobPostForm;
