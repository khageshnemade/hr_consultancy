import React, { useState, useEffect } from "react";
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
      district: "",
      taluka: "", // Taluka for city
      city: "", // City input field for free text
    },
  });

  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);

  // Fetching the districts initially
  useEffect(() => {
    fetchDistricts();
  }, []);

  // Fetch districts from API
  const fetchDistricts = async () => {
    try {
      const response = await makeRequest.get(
        "https://consultancy.scholarnet.in/api/core/district_list"
      );
      setDistricts(response.data);
    } catch (error) {
      console.error("Failed to fetch districts:", error.response?.data || error.message);
      alert("Unable to load district data. Please try again later.");
    }
  };

  // Fetch talukas based on the selected district
  const fetchTalukas = async (districtId) => {
    try {
      const response = await makeRequest.get(
        `https://consultancy.scholarnet.in/api/core/taluka_list/${districtId}`
      );
      setTalukas(response.data);
    } catch (error) {
      console.error("Failed to fetch talukas:", error.response?.data || error.message);
      alert("Unable to load taluka data. Please try again later.");
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "district") {
      setFormData((prev) => ({
        ...prev,
        candidate: {
          ...prev.candidate,
          [name]: value,
          taluka: "", // Reset taluka when district changes
        },
      }));
      fetchTalukas(value); // Fetch talukas when district changes
    } else if (["work_status", "dob", "gender", "taluka", "city"].includes(name)) {
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

  // Handle form submission
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
          district: "",
          taluka: "",
          city: "", // Reset city after form submission
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
    <div className="min-h-screen flex items-center justify-center p-6 pt-20">
      <div className="bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl items-stretch h-full md:h-[90vh]">
        {/* Left Side Image */}
        <div className="md:w-1/2 hidden md:block h-full">
          <img
        src="/images/employe_login.jpg"
        alt="Job search"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="md:w-1/2 w-full p-8 overflow-y-auto h-full">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
            Candidate Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Basic Info */}
            {[
              { label: "Full Name", name: "name", type: "text", value: formData.name },
              { label: "Mobile Number", name: "mobile", type: "text", value: formData.mobile },
              { label: "Email Address", name: "email", type: "email", value: formData.email },
              { label: "Password", name: "password", type: "password", value: formData.password },
            ].map(({ label, name, type, value }) => (
              <div key={name}>
                <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={value}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            ))}

            {/* Work Status */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Work Status</label>
              <select
                name="work_status"
                value={formData.candidate.work_status}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="">Select Work Status</option>
                <option value="Experienced">Experienced</option>
                <option value="Fresher">Fresher</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.candidate.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.candidate.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* District Dropdown */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">District</label>
              <select
                name="district"
                value={formData.candidate.district}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.district}
                  </option>
                ))}
              </select>
            </div>

            {/* Taluka (City) Dropdown */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Taluka (City)</label>
              <select
                name="taluka"
                value={formData.candidate.taluka} // Updated to taluka
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="">Select Taluka</option>
                {talukas.map((taluka) => (
                  <option key={taluka.id} value={taluka.taluka}>
                    {taluka.taluka}
                  </option>
                ))}
              </select>
            </div>

            {/* City Input Field */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.candidate.city}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 mt-4 rounded-lg hover:bg-red-700 transition font-semibold"
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
