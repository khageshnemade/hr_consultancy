import React, { useState } from "react";
import makeRequest from "../../axios";

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
      const res = await makeRequest.post("employer/registration/", formData);
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
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      alert("Registration failed. Please check your input.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-0">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
        {/* Left Side Image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="https://picsum.photos/id/1/700/480"
            alt="Employer Registration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="md:w-1/2 w-full p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
            Employer Registration
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Fields with Labels */}
            <div>
              <label className="block mb-1 text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Mobile Number</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Company Name</label>
              <input
                type="text"
                name="company_name"
                value={formData.employer.company_name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Industry Type</label>
              <input
                type="text"
                name="industry_type"
                value={formData.employer.industry_type}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">
                Company ID Type (e.g., GST, PAN)
              </label>
              <input
                type="text"
                name="company_id_type"
                value={formData.employer.company_id_type}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">
                Company Unique ID
              </label>
              <input
                type="text"
                name="company_unique_id"
                value={formData.employer.company_unique_id}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">
                Representative Name
              </label>
              <input
                type="text"
                name="reprsentative_name"
                value={formData.employer.reprsentative_name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">District</label>
              <input
                type="text"
                name="district"
                value={formData.employer.district}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Taluka</label>
              <input
                type="text"
                name="taluka"
                value={formData.employer.taluka}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.employer.city}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 mt-4 rounded hover:bg-red-700 transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployerRegister;
