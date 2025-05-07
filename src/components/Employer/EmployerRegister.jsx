import React, { useEffect, useState } from "react";
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
      organization_logo: null,
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
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "organization_logo") {
      setFormData((prev) => ({
        ...prev,
        employer: {
          ...prev.employer,
          organization_logo: files[0],
        },
      }));
    }else  if (name === "district") {
      setFormData((prev) => ({
        ...prev,
        candidate: {
          ...prev.candidate,
          [name]: value,
          taluka: "", // Reset taluka when district changes
        },
      }));
      fetchTalukas(value); // Fetch talukas when district changes
    }
     else if (Object.keys(formData.employer).includes(name)) {
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

    const data = new FormData();
    data.append("name", formData.name);
    data.append("mobile", formData.mobile);
    data.append("role", formData.role);
    data.append("email", formData.email);
    data.append("password", formData.password);

    // Append employer fields
    for (const key in formData.employer) {
      if (formData.employer[key] !== null) {
        data.append(`employer.${key}`, formData.employer[key]);
      }
    }

    try {
      const res = await makeRequest.post("employer/registration/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
          organization_logo: null,
        },
      });
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Registration failed. Please check your input.");
    }
  };


  return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
  <div className="bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row w-full max-w-6xl h-full md:h-[90vh]">
    
    {/* Left Side Image */}
    <div className="md:w-1/2 hidden md:block h-full">
      <img
        src="/images/register.jpeg"
        alt="Employer Registration"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Right Side Form */}
    <div className="md:w-1/2 w-full p-8 md:p-10 overflow-y-auto h-full">
      <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">
        Employer Registration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        {[
          { label: "Full Name", name: "name", type: "text", value: formData.name },
          { label: "Mobile Number", name: "mobile", type: "text", value: formData.mobile },
          { label: "Email Address", name: "email", type: "email", value: formData.email },
          { label: "Password", name: "password", type: "password", value: formData.password },
        ].map(({ label, name, type, value }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={value}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
        ))}

        {/* Employer Details */}
        {[
          { label: "Company Name", name: "company_name" },
          { label: "Industry Type", name: "industry_type" },
          { label: "Company ID Type (e.g., GST, PAN)", name: "company_id_type" },
          { label: "Company Unique ID", name: "company_unique_id" },
          { label: "Representative Name", name: "reprsentative_name" }
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type="text"
              name={name}
              value={formData.employer[name]}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              required={name === "company_name"} // Only company_name is required
            />
          </div>
        ))}

        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organization Logo
          </label>
          <input
            type="file"
            name="organization_logo"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
 {/* District Dropdown */}
 <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">District</label>
              <select
                name="district"
                value={formData.employer.district}
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
                value={formData.employer.taluka} // Updated to taluka
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
                value={formData.employer.city}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-200"
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
