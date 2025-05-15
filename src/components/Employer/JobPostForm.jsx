import React, { useState } from "react";
import makeRequest from "../../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const validateForm = () => {
    const errors = {};

    // Required fields
    if (!formData.job_type) errors.job_type = "Job type is required.";
    if (!formData.title.trim()) errors.title = "Title is required.";
    if (!formData.description.trim()) errors.description = "Description is required.";
    if (!formData.role.trim()) errors.role = "Role is required.";
    if (!formData.no_of_openings) {
      errors.no_of_openings = "Number of openings is required.";
    } else if (isNaN(formData.no_of_openings) || formData.no_of_openings <= 0) {
      errors.no_of_openings = "Number of openings must be a positive number.";
    }

    if (!formData.salary) {
      errors.salary = "Salary is required.";
    } else if (isNaN(formData.salary) || formData.salary < 0) {
      errors.salary = "Salary must be a valid number.";
    }

    if (!formData.location.trim()) errors.location = "Location is required.";
    if (!formData.skills_required.trim()) errors.skills_required = "Skills required field is required.";

    // Email validation
    if (!formData.contact_email) {
      errors.contact_email = "Contact email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email)) {
      errors.contact_email = "Enter a valid email address.";
    }

    // Mobile validation
    if (!formData.contact_mobile) {
      errors.contact_mobile = "Contact mobile is required.";
    } else if (!/^\d{10}$/.test(formData.contact_mobile)) {
      errors.contact_mobile = "Enter a valid 10-digit mobile number.";
    }

    // Date validation
    if (!formData.last_date_of_apply) {
      errors.last_date_of_apply = "Last date to apply is required.";
    }

    if (!formData.perks.trim()) errors.perks = "Perks field is required.";
    if (!formData.qualification_in.trim()) errors.qualification_in = "Qualification is required.";
    if (!formData.specialisation_in.trim()) errors.specialisation_in = "Specialisation is required.";
    if (!formData.terms.trim()) errors.terms = "Terms must be accepted.";

    // Optional check for company id if relevant
    if (formData.company === 0) {
      errors.company = "A valid company must be selected.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      errors.all = "* fields are mandatory"
      setFormErrors(errors);
      return;
    }
    try {
      await makeRequest.post("employer/addjob/", formData);
      toast.success("Job posted successfully!");
      navigate("/employer/jobs");

    } catch (err) {
      toast.error("Failed to post job. Please check your data.");
      setError("Failed to post job. Please check your data.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-20">
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
         

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Job Type */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Job Type<span className="text-red-500">*</span>
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
              { name: "perks", label: "Perks", placeholder: "e.g., Health insurance, Remote work, Free snacks" },
              { name: "qualification_in", label: "Qualification In", placeholder: "e.g., B.Tech, MBA, B.Sc" },
              { name: "specialisation_in", label: "Specialisation In", placeholder: "e.g., Computer Science, Marketing" },
              { name: "terms", label: "Terms & Conditions", placeholder: "e.g., Must serve minimum 6 months, NDA required" },

              { name: "company", label: "Company ID" },
            ].map(({ name, label, type = "text", placeholder = "" }) => (
              <div key={name}>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  {label}<span className="text-red-500">*</span>
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            ))}

            {/* Last Date of Apply */}
            <input
              type="date"
              name="last_date_of_apply"
              value={formData.last_date_of_apply}
              onChange={handleChange}
              min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} // sets min to tomorrow
              className="w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />


            {/* Active Checkbox */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="w-4 h-4 border-gray-300 rounded focus:ring-red-500"
              />
              <label className="text-gray-700 text-sm">Job is Active<span className="text-red-500">*</span></label>
            </div>
            {Object.keys(formErrors).length > 0 && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <ul className="list-disc pl-5 text-sm">
                  {Object.values(formErrors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
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
