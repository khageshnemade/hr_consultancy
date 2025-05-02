import React, { useState } from "react";
import makeRequest from "../../axios";

const CandidateRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    role: "Candidate",
    email: "",
    password: "",
    candidate: {
      work_status: "",
      dob: "",
      gender: "",
      city: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["work_status", "dob", "gender", "city"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        candidate: {
          ...prev.candidate,
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
      const response = await makeRequest.post(
        "candidate/registration/",
        formData
      );
      alert("Candidate registered successfully!");

      // Reset form
      setFormData({
        name: "",
        mobile: "",
        role: "Candidate",
        email: "",
        password: "",
        candidate: {
          work_status: "",
          dob: "",
          gender: "",
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
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
        {/* Left Side Image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="https://picsum.photos/id/3/700/480"
            alt="Job search"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="md:w-1/2 w-full p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
            Candidate Registration
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
              <label className="block mb-1 text-gray-700">Work Status</label>
              <select
                name="work_status"
                value={formData.candidate.work_status}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded"
                required
              >
                <option value="">Select Work Status</option>
                <option value="Experienced">Experienced</option>
                <option value="Fresher">Fresher</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.candidate.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.candidate.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.candidate.city}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-100 rounded"
                required
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

export default CandidateRegister;
