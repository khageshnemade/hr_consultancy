import React, { useEffect, useState } from "react";
import makeRequest from "../../axios";

const CandidateProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    makeRequest
      .get("candidate/profiledetails/")
      .then((res) => {
        setProfile(res.data);
        setFormData({
          name: res.data.name,
          mobile: res.data.mobile,
          email: res.data.email,
          role: res.data.role,
          work_status: res.data.candidate.work_status,
          gender: res.data.candidate.gender,
          dob: res.data.candidate.dob,
          city: res.data.candidate.city,
        });
      })
      .catch((err) => {
        console.error("Failed to fetch profile", err);
        setMessage("Failed to load profile");
      });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    makeRequest
      .put("candidate/profiledetails/", formData)
      .then(() => {
        setMessage("Profile updated successfully!");
        setEditMode(false);
        setProfile((prev) => ({
          ...prev,
          ...formData,
          candidate: {
            ...prev.candidate,
            work_status: formData.work_status,
            gender: formData.gender,
            dob: formData.dob,
            city: formData.city,
          },
        }));
      })
      .catch((err) => {
        console.error("Error updating profile", err);
        setMessage("Failed to update profile");
      });
  };

  if (!profile)
    return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Candidate Profile
      </h2>
      {message && (
        <p className="text-sm mb-4 text-center text-red-500">{message}</p>
      )}

      {editMode ? (
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 grid-cols-1 sm:grid-cols-2 text-sm text-gray-700"
        >
          {[
            "name",
            "mobile",
            "email",
            "role",
            "work_status",
            "gender",
            "dob",
            "city",
          ].map((field) => (
            <input
              key={field}
              name={field}
              type="text"
              value={formData[field] || ""}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-100 rounded"
              placeholder={field.replace(/_/g, " ").toUpperCase()}
              required
            />
          ))}

          <div className="col-span-2 flex gap-4 mt-2">
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Name:</span> {profile.name}
            </p>
            <p>
              <span className="font-semibold">Mobile:</span> {profile.mobile}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {profile.email}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {profile.role}
            </p>
            <p>
              <span className="font-semibold">Work Status:</span>{" "}
              {profile.candidate.work_status}
            </p>
            <p>
              <span className="font-semibold">Gender:</span>{" "}
              {profile.candidate.gender}
            </p>
            <p>
              <span className="font-semibold">Date of Birth:</span>{" "}
              {profile.candidate.dob}
            </p>
            <p>
              <span className="font-semibold">City:</span>{" "}
              {profile.candidate.city}
            </p>
          </div>

          <button
            onClick={() => setEditMode(true)}
            className="mt-6 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Update Profile
          </button>
        </>
      )}
    </div>
  );
};

export default CandidateProfile;
