import React, { useState } from "react";
import makeRequest from "../axios";
const EmployerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    role: "Employer",
    email: "",
    password: "",
    employer: {
      company_name: "",
      industry_type: "",
      company_id_type: "",
      company_unique_id: "",
      reprsentative_name: "",
      district: "",
      taluka: "",
      city: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (Object.keys(formData.employer).includes(name)) {
      setFormData((prev) => ({
        ...prev,
        employer: {
          ...prev.employer,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await makeRequest.post(
        "employer/registration/",
        formData
      );
      console.log("Employer registered:", res.data);
      alert("Employer registered successfully!");
      // Reset form
      setFormData({
        name: "",
        mobile: "",
        role: "Employer",
        email: "",
        password: "",
        employer: {
          company_name: "",
          industry_type: "",
          company_id_type: "",
          company_unique_id: "",
          reprsentative_name: "",
          district: "",
          taluka: "",
          city: "",
        },
      });
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Registration failed. Please check your input.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-red-600 text-center">
        Employer Registration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
          required
        />
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
          required
        />
        <input
          type="text"
          name="company_name"
          value={formData.employer.company_name}
          onChange={handleChange}
          placeholder="Company Name"
          className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
          required
        />
        <input
          type="text"
          name="industry_type"
          value={formData.employer.industry_type}
          onChange={handleChange}
          placeholder="Industry Type"
          className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
        />
        <input
          type="text"
          name="company_id_type"
          value={formData.employer.company_id_type}
          onChange={handleChange}
          placeholder="Company ID Type (e.g., GST, PAN)"
          className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
        />
        <input
          type="text"
          name="company_unique_id"
          value={formData.employer.company_unique_id}
          onChange={handleChange}
          placeholder="Company Unique ID"
          className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
        />
        <input
          type="text"
          name="reprsentative_name"
          value={formData.employer.reprsentative_name}
          onChange={handleChange}
          placeholder="Representative Name"
          className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
        />
        <input
          type="text"
          name="district"
          value={formData.employer.district}
          onChange={handleChange}
          placeholder="District"
          className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
        />
        <input
          type="text"
          name="taluka"
          value={formData.employer.taluka}
          onChange={handleChange}
          placeholder="Taluka"
          className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
        />
        <input
          type="text"
          name="city"
          value={formData.employer.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
        />

        <button
          type="submit"
          className="bg-red-600 w-full text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default EmployerRegister;
