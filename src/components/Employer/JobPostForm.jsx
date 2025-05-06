import React, { useState } from "react";
import makeRequest from "../../axios";

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    job_type: "Part Time",
    title: "",
    description: "",
    role: "",
    no_of_openings: "",
    salary: "",
    location: "",
    skills_required: "",
    contact_email: "",
    contact_mobile: "",
    last_date_of_apply: "2025-04-29",
    perks: "",
    qualification_in: "",
    specialisation_in: "",
    terms: "",
    is_active: true,
    company: 0,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await makeRequest.post("employer/addjob/", formData);
      setSuccess("Job posted successfully!");
    } catch (err) {
      setError("Failed to post job. Please check your data.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
  <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-6xl h-full md:h-[90vh]">
    {/* Left Side Image */}
    <div className="md:w-1/2 h-64 md:h-full hidden md:block">
      <img
        src="/images/post_job.png"
        alt="Job Posting"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Right Side Form */}
    <div className="md:w-1/2 w-full p-8 overflow-y-auto h-full">
      <h2 className="text-3xl font-extrabold text-red-600 mb-6 text-center">
        Post a Job
      </h2>

      {error && (
        <p className="text-red-500 mb-4 text-sm text-center">{error}</p>
      )}
      {success && (
        <p className="text-green-500 mb-4 text-sm text-center">{success}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
          {/* Job Type */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Job Type
            </label>
            <select
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
            </select>
          </div>
  
          {/* Input Fields */}
          {[
            { name: "title", label: "Job Title" },
            { name: "description", label: "Job Description" },
            { name: "role", label: "Job Role" },
            { name: "no_of_openings", label: "No. of Openings" },
            { name: "salary", label: "Salary" },
            { name: "location", label: "Location" },
            { name: "skills_required", label: "Skills Required" },
            { name: "contact_email", label: "Contact Email", type: "email" },
            { name: "contact_mobile", label: "Contact Mobile" },
            { name: "perks", label: "Perks" },
            { name: "qualification_in", label: "Qualification In" },
            { name: "specialisation_in", label: "Specialisation In" },
            { name: "terms", label: "Terms & Conditions" },
            { name: "company", label: "Company ID" },
          ].map(({ name, label, type = "text" }) => (
            <div key={name}>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          ))}
  
          {/* Last Date of Apply */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Last Date to Apply
            </label>
            <input
              type="date"
              name="last_date_of_apply"
              value={formData.last_date_of_apply}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
  
          {/* Active Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-4 h-4 border-gray-300 rounded focus:ring-red-500"
            />
            <label className="text-gray-700 text-sm">Job is Active</label>
          </div>
  
          {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Post Job
        </button>
      </form>
    </div>
  </div>
</div>
  
  );
};

export default JobPostForm;
