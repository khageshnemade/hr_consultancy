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
      console.log("Registration successful:", response.data);
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
    <div className="max-w-xl mx-auto mt-20 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-red-600 text-center">
        Candidate Registration
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
          placeholder="Email Address"
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
        <select
          name="work_status"
          value={formData.candidate.work_status}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
          required
        >
          <option value="">Select Work Status</option>
          <option value="Experienced">Experienced</option>
          <option value="Fresher">Fresher</option>
        </select>
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600" htmlFor="dob">
            Date of Birth (DOB)
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.candidate.dob}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
            required
          />
        </div>

        <select
          name="gender"
          value={formData.candidate.gender}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="city"
          value={formData.candidate.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full px-4 py-2 rounded bg-gray-100 focus:outline-none"
          required
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

export default CandidateRegister;
