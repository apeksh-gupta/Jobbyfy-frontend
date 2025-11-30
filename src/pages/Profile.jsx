import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  saveEducation,
  deleteEducation,
  saveExperience,
  deleteExperience
} from "../api/profileApi";
import Input from "../components/Input";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  const load = async () => {
    const res = await getProfile();
    if (res.profile) setProfile(res.profile);
    setLoading(false);
  };

  const handleChange = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  // BASIC PROFILE UPDATE
  const saveBasic = async () => {
    const res = await updateProfile(profile);
    if (res.profile) {
      setProfile(res.profile);
      alert("Profile Updated!");
    }
  };

  // EDUCATION CRUD
  const addEdu = () => {
    setProfile(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          schoolName: "",
          degree: "",
          major: "",
          startDate: "",
          endDate: "",
          percentageOrCGPA: "",
          _id: null
        }
      ]
    }));
  };

  const updateEduField = (index, key, value) => {
    const updated = [...profile.education];
    updated[index][key] = value;
    setProfile(prev => ({ ...prev, education: updated }));
  };

  const saveEdu = async (edu) => {
    const payload = {
      ...edu,
      mode: edu._id ? "update" : "add",
      eduId: edu._id
    };

    const res = await saveEducation(payload);
    if (res.profile) setProfile(res.profile);
  };

  const removeEdu = async (id) => {
    const res = await deleteEducation(id);
    if (res.profile) setProfile(res.profile);
  };

  // EXPERIENCE CRUD
  const addExp = () => {
    setProfile(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          companyName: "",
          role: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
          skillsUsed: [],
          _id: null
        }
      ]
    }));
  };

  const updateExpField = (index, key, value) => {
    const updated = [...profile.experience];
    updated[index][key] = value;
    setProfile(prev => ({ ...prev, experience: updated }));
  };

  const saveExp = async (exp) => {
    const payload = {
      ...exp,
      mode: exp._id ? "update" : "add",
      expId: exp._id
    };

    const res = await saveExperience(payload);
    if (res.profile) setProfile(res.profile);
  };

  const removeExp = async (id) => {
    const res = await deleteExperience(id);
    if (res.profile) setProfile(res.profile);
  };

  if (loading || !profile) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      {/* BASIC */}
      <Input label="Full Name" value={profile.name} onChange={e => handleChange("name", e.target.value)} />
      <Input label="Email" value={profile.email} onChange={e => handleChange("email", e.target.value)} />
      <Input label="Mobile" value={profile.mobile} onChange={e => handleChange("mobile", e.target.value)} />
      <Input label="Full Address" value={profile.fullAddress} onChange={e => handleChange("fullAddress", e.target.value)} />

      <button className="w-full py-3 bg-blue-600 text-white rounded" onClick={saveBasic}>
        Save Profile
      </button>

      {/* EDUCATION */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Education</h2>

        <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded" onClick={addEdu}>
          + Add
        </button>

        {profile.education.map((edu, idx) => (
          <div key={idx} className="border p-4 mt-4">

            <Input
              label="School Name"
              value={edu.schoolName}
              onChange={e => updateEduField(idx, "schoolName", e.target.value)}
            />

            <Input
              label="Degree"
              value={edu.degree}
              onChange={e => updateEduField(idx, "degree", e.target.value)}
            />

            <Input
              label="Major"
              value={edu.major}
              onChange={e => updateEduField(idx, "major", e.target.value)}
            />

            <Input
              label="Start Date"
              type="date"
              value={edu.startDate ? edu.startDate.substring(0, 10) : ""}
              onChange={e => updateEduField(idx, "startDate", e.target.value)}
            />

            <Input
              label="End Date"
              type="date"
              value={edu.endDate ? edu.endDate.substring(0, 10) : ""}
              onChange={e => updateEduField(idx, "endDate", e.target.value)}
            />

            <Input
              label="Percentage / CGPA"
              value={edu.percentageOrCGPA}
              onChange={e => updateEduField(idx, "percentageOrCGPA", e.target.value)}
            />

            <div className="flex gap-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => saveEdu(edu)}>
                Save
              </button>
              {edu._id && (
                <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={() => removeEdu(edu._id)}>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* EXPERIENCE */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Experience</h2>

        <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded" onClick={addExp}>
          + Add
        </button>

        {profile.experience.map((exp, idx) => (
          <div key={idx} className="border p-4 mt-4">

            <Input
              label="Company Name"
              value={exp.companyName}
              onChange={e => updateExpField(idx, "companyName", e.target.value)}
            />

            <Input
              label="Role"
              value={exp.role}
              onChange={e => updateExpField(idx, "role", e.target.value)}
            />

            <Input
              label="Location"
              value={exp.location}
              onChange={e => updateExpField(idx, "location", e.target.value)}
            />

            <Input
              label="Start Date"
              type="date"
              value={exp.startDate ? exp.startDate.substring(0, 10) : ""}
              onChange={e => updateExpField(idx, "startDate", e.target.value)}
            />

            <Input
              label="End Date"
              type="date"
              value={exp.endDate ? exp.endDate.substring(0, 10) : ""}
              onChange={e => updateExpField(idx, "endDate", e.target.value)}
            />

            <textarea
              className="w-full border p-2"
              value={exp.description}
              onChange={e => updateExpField(idx, "description", e.target.value)}
            />

            <div className="flex gap-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => saveExp(exp)}>
                Save
              </button>
              {exp._id && (
                <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={() => removeExp(exp._id)}>
                  Delete
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
