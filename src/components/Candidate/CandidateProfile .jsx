import React, { useEffect, useState } from "react";
import makeRequest from "../../axios";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaTransgender,
  FaCity,
  FaBirthdayCake,
  FaUserTie,
  FaBriefcase,
} from "react-icons/fa";

const CandidateProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    role: "",
    work_status: "",
    gender: "",
    dob: "",
    city: "",
    resume: null,
    profile_pic: null,
    cover_letter: null,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    makeRequest
      .get("candidate/profiledetails/")
      .then((res) => {
        setProfile(res.data);
        setFormData({
          name: res.data.name || "",
          mobile: res.data.mobile || "",
          email: res.data.email || "",
          role: res.data.role || "",
          work_status: res.data.candidate?.work_status || "",
          gender: res.data.candidate?.gender || "",
          dob: res.data.candidate?.dob || "",
          city: res.data.candidate?.city || "",
        });
      })
      .catch(() => {
        setMessage("Failed to load profile");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        data.append(key, value);
      }
    });

    makeRequest
      .put("candidate/profiledetails/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setMessage("✅ Profile updated successfully!");
        setEditMode(false);
      })
      .catch(() => {
        setMessage("❌ Failed to update profile");
      });
  };

  if (!profile) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-gray-50 rounded-xl shadow-sm">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Candidate Profile</h2>

      {message && (
        <p className="text-center mb-4 text-sm text-green-600 font-medium">
          {message}
        </p>
      )}

      {editMode ? (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm"
          encType="multipart/form-data"
        >
          {[
            { name: "name", label: "Full Name" },
            { name: "mobile", label: "Mobile" },
            { name: "email", label: "Email" },
            { name: "role", label: "Role" },
            { name: "work_status", label: "Work Status" },
            { name: "gender", label: "Gender" },
            { name: "dob", label: "Date of Birth" },
            { name: "city", label: "City" },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block text-gray-600 mb-1 font-medium">{label}</label>
              <input
                name={name}
                type="text"
                value={formData[name] || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-red-400 focus:outline-none"
                placeholder={`Enter ${label}`}
                required
              />
            </div>
          ))}

          {[
            { name: "resume", label: "Resume" },
            { name: "profile_pic", label: "Profile Picture" },
            { name: "cover_letter", label: "Cover Letter" },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block text-gray-600 mb-1 font-medium">{label}</label>
              <input
                name={name}
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-red-400 focus:outline-none"
              />
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
            <ProfileItem icon={<FaUser />} label="Full Name" value={profile.name} />
            <ProfileItem icon={<FaPhoneAlt />} label="Mobile" value={profile.mobile} />
            <ProfileItem icon={<FaEnvelope />} label="Email" value={profile.email} />
            <ProfileItem icon={<FaUserTie />} label="Role" value={profile.role} />
            <ProfileItem icon={<FaBriefcase />} label="Work Status" value={profile.candidate.work_status} />
            <ProfileItem icon={<FaTransgender />} label="Gender" value={profile.candidate.gender} />
            <ProfileItem icon={<FaBirthdayCake />} label="Date of Birth" value={profile.candidate.dob} />
            <ProfileItem icon={<FaCity />} label="City" value={profile.candidate.city} />
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

const ProfileItem = ({ label, value, icon }) => (
  <div className="flex items-center gap-3 bg-white p-3 rounded-md shadow-sm">
    <span className="text-red-500 text-lg">{icon}</span>
    <div>
      <p className="text-gray-500 font-medium">{label}</p>
      <p className="text-gray-800">{value}</p>
    </div>
  </div>
);

export default CandidateProfile;
