import React, { useState, useEffect } from "react";
import makeRequest from "../../axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const CandidateRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
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
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

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

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!formData.name) errors.name = "Full name is required.";
    if (!formData.mobile) errors.mobile = "Mobile number is required.";
    else if (!mobileRegex.test(formData.mobile)) errors.mobile = "Enter a valid 10-digit mobile number.";

    if (!formData.email) errors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) errors.email = "Enter a valid email address.";

    if (!formData.password) errors.password = "Password is required.";
    else if (!passwordRegex.test(formData.password)) {
      errors.password = "Password must be 8+ characters, include 1 uppercase, 1 lowercase & 1 special character.";
    }

    if (!formData.candidate.work_status) errors.work_status = "Work status is required.";
    if (!formData.candidate.dob) errors.dob = "Date of birth is required.";
    if (!formData.candidate.gender) errors.gender = "Gender is required.";
    if (!formData.candidate.district) errors.district = "District is required.";
    if (!formData.candidate.taluka) errors.taluka = "Taluka is required.";
    if (!formData.candidate.city) errors.city = "City is required.";

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      errors.all = "* fields are mandatory"
      setFormErrors(errors);
      return;
    }

    try {
      await makeRequest.post("candidate/registration/", formData);
      alert("Candidate registered successfully!");

      // Reset form and errors
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
          city: "",
        },
      });
      setFormErrors({});
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
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
            ].map(({ label, name, type, value }) => (
              <div key={name}>
                <label className="block mb-1 text-sm font-medium text-gray-700">{label}
                  <span className="text-red-500">*</span>

                </label>
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
            {/* Password Field with Eye Toggle */}
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-700">Password<span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 pr-10 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center top-6 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="text-gray-600 w-5 h-5" />
                ) : (
                  <AiFillEye className="text-gray-600 w-5 h-5" />
                )}
              </div>
            </div>

            {/* Work Status */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Work Status<span className="text-red-500">*</span>
              </label>
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
              <label className="block mb-1 text-sm font-medium text-gray-700">Date of Birth<span className="text-red-500">*</span>
              </label>
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
              <label className="block mb-1 text-sm font-medium text-gray-700">Gender<span className="text-red-500">*</span>
              </label>
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
              <label className="block mb-1 text-sm font-medium text-gray-700">District<span className="text-red-500">*</span>
              </label>
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
              <label className="block mb-1 text-sm font-medium text-gray-700">Taluka (City)<span className="text-red-500">*</span>
              </label>
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
              <label className="block mb-1 text-sm font-medium text-gray-700">City<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.candidate.city}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
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
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 mt-4 rounded-lg hover:bg-blue-700 transition font-semibold"
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
