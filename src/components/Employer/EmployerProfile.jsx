import React, { useEffect, useState } from "react";
import makeRequest from "../../axios";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaCity,
  FaUserTie,
  FaBriefcase,
  FaPen,
} from "react-icons/fa";

const iconMap = {
  name: <FaUser />,
  mobile: <FaPhoneAlt />,
  email: <FaEnvelope />,
  role: <FaUserTie />,
  company_name: <FaBriefcase />,
  industry_type: <FaBriefcase />,
  company_id_type: <FaUserTie />,
  company_unique_id: <FaUserTie />,
  reprsentative_name: <FaUser />,
  district: <FaCity />,
  taluka: <FaCity />,
  city: <FaCity />,
};
import { useDispatch } from "react-redux";
import { setProfileData } from "../../../redux/features/profileSlice"




const EmployerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [logoPreview, setLogoPreview] = useState(null);
  const dispatch = useDispatch();
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
  const fetchProfile = async () => {
    try {
      const res = await makeRequest.get("employer/profiledetails/");
      setProfile(res.data);
      setFormData({
        name: res.data.name || "",
        mobile: res.data.mobile || "",
        email: res.data.email || "",
        role: res.data.role || "",
        company_name: res.data.company_name || "",
        industry_type: res.data.industry_type || "",
        company_id_type: res.data.company_id_type || "",
        company_unique_id: res.data.company_unique_id || "",
        reprsentative_name: res.data.reprsentative_name || "",
        district: res.data.district || "",
        taluka: res.data.taluka || "",
        city: res.data.city || "",
        organization_logo: null,
      });
    } catch (err) {
      setMessage("❌ Failed to load employer profile");
    }
  };
  useEffect(() => {
    fetchProfile();
    fetchDistricts();
  }, []);
  
  useEffect(() => {
    if (formData.district) {
      fetchTalukas(formData.district);
    }
  }, [formData.district, districts.length]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
  
    if (name === "district") {
      setFormData((prev) => ({
        ...prev,
        district: value,
        taluka: "", // reset taluka when district changes
      }));
      await fetchTalukas(value); // pass the district ID directly
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, organization_logo: file }));
      setLogoPreview(URL.createObjectURL(file));
    }
  };
  
    

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      }

      await makeRequest.put("employer/profiledetails/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Profile updated successfully");
      setEditMode(false);

      const updated = await makeRequest.get("employer/profiledetails/");
      setProfile(updated.data);
      setLogoPreview(null);
      dispatch(setProfileData(updated.data)); // 🔁 Update Redux store
      
    } catch (err) {
      setMessage("❌ Failed to update profile");
    }
  };

  if (!profile) {
    return <div className="text-center mt-10 pt-20">Loading employer profile...</div>;
  }

  const fields = [
    { name: "name", label: "Full Name" },
    { name: "mobile", label: "Mobile" },
    { name: "email", label: "Email" },
    { name: "role", label: "Role" },
    { name: "company_name", label: "Company Name" },
    { name: "industry_type", label: "Industry Type" },
    { name: "company_id_type", label: "Company ID Type" },
    { name: "company_unique_id", label: "Company Unique ID" },
    { name: "reprsentative_name", label: "Representative Name" },
    { name: "district", label: "District" },
    { name: "taluka", label: "Taluka" },
    { name: "city", label: "City" },
  ];

  return (
    <div className="max-w-3xl mx-auto pt-10 p-8 bg-gray-50 rounded-xl shadow-sm mt-30">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Employer Profile
      </h2>
      {(profile.organization_logo || formData.organization_logo) && (
  <div className="flex justify-center mb-6 relative group">
    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md relative">
    <img
  src={
    logoPreview
      ? logoPreview
      : profile.organization_logo
      ? `https://consultancy.scholarnet.in/${profile.organization_logo}`
      : "/default-profile.png"
  }
  alt="Organization Logo"
  className="w-full h-full object-cover"
/>


      {editMode && (
        <>
          <div
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => document.getElementById("logoUpload").click()}
          >
            <FaPen className="text-white text-lg" />
          </div>
          <input
  id="logoUpload"
  type="file"
  accept="image/*"
  className="hidden"
  onChange={handleLogoChange}
/>

        </>
      )}
    </div>
  </div>
)}

      {message && (
        <p className="text-center mb-4 text-sm text-red-600 font-medium">
          {message}
        </p>
      )}

      {editMode ? (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm"
        >
          {fields.map(({ name, label }) => (
            <div key={name}>
              <label className="block text-gray-600 mb-1 font-medium">
                {label}
              </label>

              {["district", "taluka"].includes(name) ? (
               <select
               name={name}
               value={formData[name]}
               onChange={handleChange}
               className="block w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
               required
             >
               <option value="">{`Select ${label}`}</option>
               {(name === "district" ? districts : talukas).map((item) => (
                 <option
                   key={item.id}
                   value={name === "district" ? item.id : item.taluka}
                 >
                   {name === "district" ? item.district : item.taluka}
                 </option>
               ))}
             </select>
              ) : name === "company_id_type" ? (
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                >
                  <option value="">Select ID Type</option>
                  <option value="GST">GST</option>
                  <option value="PAN">PAN</option>
                  <option value="AADHAR">AADHAR</option>
                </select>
              ) : (
                <input
                  name={name}
                  type="text"
                  value={formData[name] || ""}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg bg-white shadow-sm focus:ring-2 ${name === "role"
                      ? "cursor-not-allowed bg-gray-100"
                      : "focus:ring-red-400"
                    } focus:outline-none`}
                  placeholder={`Enter ${label}`}
                  readOnly={name === "role"}
                  disabled={name === "role"}
                  required
                />
              )}
            </div>
          ))}

          <div className="col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="submit"
              className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setLogoPreview(null);
              }}
              className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-gray-800">
            {fields.map(({ name, label }) => (
              <div
                key={name}
                className="flex items-start gap-3 bg-white p-4 rounded-md shadow-sm"
              >
                <span className="text-red-500 text-lg mt-1">
                  {iconMap[name]}
                </span>
                <div>
                  <p className="text-gray-500 font-medium">{label}</p>
                  <p className="text-gray-800">{profile[name]}</p>
                </div>
              </div>
            ))}
          </div>

      

          <div className="flex justify-end mt-6">
            <button
              onClick={() => setEditMode(true)}
              className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Update Profile
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployerProfile;
