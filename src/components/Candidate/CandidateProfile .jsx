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
  FaPen
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setProfileData } from "../../../redux/features/profileSlice"; // Adjust path as needed

const CandidateProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ type: "", url: "" });
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    role: "",
    work_status: "",
    gender: "",
    dob: "",
    district: "",
    taluka: "",
    city: "",
    resume: null,
    profile_pic: null,
    cover_letter: null,
  });
  const [message, setMessage] = useState("");
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);

  useEffect(() => {
    const init = async () => {
      // Fetch the districts only once
      await fetchDistricts();
      await fetchProfile();
    };
  
    init();
  }, []); // Empty dependency array ensures this runs only once, after the initial render
  useEffect(() => {
    const loadTalukas = async () => {
      const district = formData.district;
      if (district) {
        // Find the selected district object
        const selectedDistrict = districts.find(d => d.district === district);
        if (selectedDistrict?.id) {
          await fetchTalukas(selectedDistrict.id); // Fetch talukas for the selected district
        }
      }
    };
  
    loadTalukas();
  }, [formData.district, districts]); // This only triggers when district changes
    
  const fetchProfile = async () => {
    try {
      const res = await makeRequest.get("candidate/profiledetails/");
      setProfile(res.data);
      dispatch(setProfileData(res.data)); // ✅ Sync with Redux
  
      const updatedForm = {
        name: res.data.name || "",
        mobile: res.data.mobile || "",
        email: res.data.email || "",
        role: res.data.role || "",
        work_status: res.data.work_status || "",
        gender: res.data.gender || "",
        dob: res.data.dob || "",
        district: res.data.district || "",
        taluka: res.data.taluka || "",
        city: res.data.city || "",
        resume: null,
        profile_pic: null,
        cover_letter: null,
      };
  
      setFormData(updatedForm);
  
      const district = updatedForm.district;
      if (district) {
        const selectedDistrict = districts.find(d => d.district === district);
        if (selectedDistrict?.id) {
          await fetchTalukas(selectedDistrict.id);
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setMessage("Failed to load profile");
    }
  };
  
  

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

  const handleChange = async (e) => {
    const { name, value, files, type } = e.target;
  
    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
  
      if (name === "profile_pic" && file) {
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
  
      if (name === "district") {
        const selectedDistrict = districts.find(
          (district) => district.district === value
        );
        if (selectedDistrict?.id) {
          await fetchTalukas(selectedDistrict.id);
          setFormData((prev) => ({ ...prev, taluka: "" }));
        }
      }
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        data.append(key, value);
      }
    }
  );

    try {
      await makeRequest.put("candidate/profiledetails/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      setMessage("✅ Profile updated successfully!");
      setEditMode(false);
      
      const response = await makeRequest.get("candidate/profiledetails/");
      setProfile(response.data);
      dispatch(setProfileData(response.data)); // ✅ Sync with Redux
      
      setPreviewImage(null);
      
      setPreviewImage(null); 
    } catch (error) {
      setMessage("❌ Failed to update profile");
      console.error("Update error:", error);
    }
  };

  const handleFileView = (type, url) => {
    setModalContent({ type, url: `https://consultancy.scholarnet.in/${url}` });
    setModalOpen(true);
  };

  const FileButton = ({ label, url, type }) =>
    url ? (
      <button
        onClick={() => handleFileView(type, url)}
        className="text-blue-600 underline text-sm hover:text-blue-800 transition"
      >
        View {label}
      </button>
    ) : null;

  if (!profile) {
    return <div className="text-center mt-10 pt-20">Loading profile...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-30 p-8 bg-gray-50 rounded-xl shadow-sm pt-20">
      <div className="flex justify-center -mt-16 mb-6 relative">
        <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white bg-gray-200">
        <img
  src={
    previewImage
      ? previewImage
      : profile.profile_pic
        ? `https://consultancy.scholarnet.in/${profile.profile_pic}`
        : "/default-profile.png"
  }
  alt="Profile"
  className="object-cover w-full h-full"
/>

          {editMode && (
            <>
              <label
                htmlFor="profilePicInput"
                className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center transition cursor-pointer"
              >
                <FaPen className="text-white text-xl" />
              </label>
              <input
                id="profilePicInput"
                name="profile_pic"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handleChange}
                className="hidden"
              />
            </>
          )}
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Candidate Profile
      </h2>

      {message && (
        <p className="text-center mb-4 text-sm text-green-600 font-medium">
          {message}
        </p>
      )}

      {editMode ? (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
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
            <div key={name} className="col-span-2 sm:col-span-1">
              <label className="block text-gray-600 mb-1 font-medium">{label}</label>
              <input
                name={name}
                type="text"
                value={formData[name] || ""}
                onChange={handleChange}
                className="block w-full px-4 py-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-red-400 focus:outline-none"
                placeholder={`Enter ${label}`}
                required
              />
            </div>
          ))}

          <div className="col-span-2 sm:col-span-1">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              District
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="block w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.district}>
                  {district.district}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Taluka (City)
            </label>
            <select
              name="taluka"
              value={formData.taluka}
              onChange={handleChange}
              className="block w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
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

          {[
            { name: "resume", label: "Resume" },
            { name: "cover_letter", label: "Cover Letter" },
          ].map(({ name, label }) => (
            <div key={name} className="col-span-2 sm:col-span-1">
              <label className="block text-gray-600 mb-1 font-medium">{label}</label>
              <input
                name={name}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="block w-full px-4 py-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-red-400 focus:outline-none"
              />
            </div>
          ))}

          <div className="col-span-2 flex flex-col sm:flex-row justify-end gap-4 mt-4">
            <button
              type="submit"
              className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {setEditMode(false);setPreviewImage(null); }}
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
            <ProfileItem icon={<FaBriefcase />} label="Work Status" value={profile.work_status} />
            <ProfileItem icon={<FaTransgender />} label="Gender" value={profile.gender} />
            <ProfileItem icon={<FaBirthdayCake />} label="Date of Birth" value={profile.dob} />
            <ProfileItem
              icon={<FaCity />}
              label="Location"
              value={`${profile.district || ""}, ${profile.taluka || ""}, ${profile.city || ""}`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm">
            <FileButton label="Resume" url={profile.resume} type="document" />
            <FileButton label="Cover Letter" url={profile.cover_letter} type="document" />
            {/* Profile picture view removed here */}
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

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md max-w-5xl w-full relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-lg"
            >
              ✕
            </button>
            {modalContent.type === "image" ? (
              <img
                src={modalContent.url}
                alt="Preview"
                className="max-w-full h-auto mx-auto rounded-md"
              />
            ) : (
              <iframe
                src={modalContent.url}
                title="File Preview"
                className="w-full h-[500px] border rounded"
              />
            )}
          </div>
        </div>
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
