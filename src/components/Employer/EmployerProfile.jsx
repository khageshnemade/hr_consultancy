import React, { useEffect, useState } from "react";
import makeRequest from "../../axios";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaCity,
  FaUserTie,
  FaBriefcase,
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

const EmployerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
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
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    } catch (err) {
      setMessage("❌ Failed to update profile");
    }
  };

  if (!profile) {
    return <div className="text-center mt-10">Loading employer profile...</div>;
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
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-gray-50 rounded-xl shadow-sm">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Employer Profile
      </h2>

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
              <input
                name={name}
                type="text"
                value={formData[name] || ""}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg bg-white shadow-sm focus:ring-2 ${
                  name === "role"
                    ? "cursor-not-allowed bg-gray-100"
                    : "focus:ring-red-400"
                } focus:outline-none`}
                placeholder={`Enter ${label}`}
                readOnly={name === "role"}
                disabled={name === "role"}
                required
              />
            </div>
          ))}

          {/* Logo Upload Field */}
          <div className="col-span-2">
            <label className="block text-gray-600 mb-1 font-medium">
              Organization Logo
            </label>
            <input
              type="file"
              name="organization_logo"
              accept="image/*"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  organization_logo: e.target.files[0],
                }))
              }
              className="w-full px-4 py-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
            {profile.organization_logo && (
              <div className="mt-3">
                <button
                  onClick={() =>
                    window.open(
                      `https://consultancy.scholarnet.in//${profile.organization_logo}`,
                      "_blank"
                    )
                  }
                  className="text-blue-600 underline text-sm hover:text-blue-800"
                >
                  View Logo
                </button>
              </div>
            )}
          </div>

          <div className="col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="submit"
              className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
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

          {/* Show logo in view mode */}
          {profile.organization_logo && (
            <div className="mt-6">
              <button
                onClick={() =>
                  window.open(
                    `https://consultancy.scholarnet.in//${profile.organization_logo}`,
                    "_blank"
                  )
                }
                className="text-blue-600 underline text-sm hover:text-blue-800"
              >
                Organization Logo
              </button>
            </div>
          )}

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
